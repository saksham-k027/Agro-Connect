
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Product = {
  id: number;
  name: string;
  price: number;
  image?: string;
  unit: string;
};

type CartItem = {
  id: string;
  product: Product;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  checkout: () => Promise<string | null>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user, createOrder } = useAuth();
  const { toast } = useToast();
  
  // Calculate totals
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  // Fetch cart items from Supabase when user changes
  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user) {
        // If no user is logged in, try to load from localStorage
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          try {
            setCartItems(JSON.parse(savedCart));
          } catch (error) {
            console.error("Error parsing saved cart:", error);
            localStorage.removeItem("cart");
            setCartItems([]);
          }
        } else {
          // Clear cart if no saved cart and no user
          setCartItems([]);
        }
        return;
      }

      try {
        const { data, error } = await supabase
          .from('cart_items')
          .select(`
            id,
            quantity,
            product_id
          `)
          .eq('user_id', user.id);

        if (error) {
          console.error("Error fetching cart items:", error);
          return;
        }

        if (data) {
          // We need to transform database records into CartItem objects
          const cartItemPromises = data.map(async (item) => {
            // Fetch product details for each cart item
            const { data: productData } = await supabase
              .from('products')
              .select('*')
              .eq('id', item.product_id)
              .single();
            
            if (productData) {
              return {
                id: item.id,
                product: productData as Product,
                quantity: item.quantity
              };
            }
            return null;
          });

          const resolvedCartItems = (await Promise.all(cartItemPromises)).filter(Boolean) as CartItem[];
          setCartItems(resolvedCartItems);
        }
      } catch (error) {
        console.error("Error in cart fetch:", error);
      }
    };

    fetchCartItems();
  }, [user]);

  // Save cart to localStorage when it changes (for non-authenticated users)
  useEffect(() => {
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const addToCart = async (product: Product, quantity = 1) => {
    if (user) {
      // For authenticated users, save to Supabase
      try {
        // For now, use local storage approach for all users to avoid database complexity
        setCartItems(prevItems => {
          const existingItem = prevItems.find(item => item.product.id === product.id);
          
          if (existingItem) {
            return prevItems.map(item => 
              item.id === existingItem.id 
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            return [...prevItems, { 
              id: `${product.id}-${Date.now()}`,
              product, 
              quantity 
            }];
          }
        });
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast({
          title: "Error",
          description: "There was a problem adding the item to your cart.",
          variant: "destructive"
        });
      }
    } else {
      // For non-authenticated users, use localStorage
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.product.id === product.id);
        
        if (existingItem) {
          return prevItems.map(item => 
            item.id === existingItem.id 
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          return [...prevItems, { 
            id: `${product.id}-${Date.now()}`,
            product, 
            quantity 
          }];
        }
      });
    }
  };

  const removeFromCart = async (id: string) => {
    if (user) {
      // For authenticated users
      try {
        // Update local state
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
      } catch (error) {
        console.error("Error removing from cart:", error);
        toast({
          title: "Error",
          description: "There was a problem removing the item from your cart.",
          variant: "destructive"
        });
      }
    } else {
      // For non-authenticated users
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) {
      await removeFromCart(id);
      return;
    }
    
    if (user) {
      // For authenticated users
      try {
        // Update local state
        setCartItems(prevItems => 
          prevItems.map(item => 
            item.id === id ? { ...item, quantity } : item
          )
        );
      } catch (error) {
        console.error("Error updating cart:", error);
        toast({
          title: "Error",
          description: "There was a problem updating your cart.",
          variant: "destructive"
        });
      }
    } else {
      // For non-authenticated users
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = async () => {
    if (user) {
      // For authenticated users
      try {
        // Clear local state
        setCartItems([]);
      } catch (error) {
        console.error("Error clearing cart:", error);
        toast({
          title: "Error",
          description: "There was a problem clearing your cart.",
          variant: "destructive"
        });
      }
    } else {
      // For non-authenticated users
      setCartItems([]);
    }
  };

  // Process checkout and create order in Supabase
  const checkout = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to place an order.",
        variant: "destructive"
      });
      return null;
    }

    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before checking out.",
        variant: "destructive"
      });
      return null;
    }
    
    try {
      // Transform cart items to order items
      const orderItems = cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price
      }));
      
      const orderId = await createOrder(orderItems);
      
      if (orderId) {
        await clearCart();
        toast({
          title: "Order placed successfully!",
          description: `Order #${orderId.slice(0, 8)} has been created. You can view it in your order history.`,
        });
      } else {
        throw new Error("Failed to create order");
      }
      
      return orderId;
    } catch (error) {
      console.error("Checkout error:", error);
      return null;
    }
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      cartCount, 
      cartTotal, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      checkout
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
