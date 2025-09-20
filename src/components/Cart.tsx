import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { 
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CreditCard
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CheckoutForm from './CheckoutForm';

interface CartProps {
  children: React.ReactNode;
}

const Cart = ({ children }: CartProps) => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [showCheckout, setShowCheckout] = useState(false);

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to place an order.",
        variant: "destructive"
      });
      return;
    }

    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before checking out.",
        variant: "destructive"
      });
      return;
    }

    setShowCheckout(true);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="right" className="w-[90%] sm:w-[400px] flex flex-col">
        <SheetHeader className="space-y-4 pb-6 border-b border-border">
          <SheetTitle className="flex items-center gap-2 text-xl font-semibold">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart
            {cartItems.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {cartItems.length}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <ShoppingCart className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Your cart is empty</h3>
              <p className="text-muted-foreground text-sm">
                Add some products to get started
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-6 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                  <img 
                    src={item.product.image || "/placeholder.svg"} 
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 space-y-2">
                    <h4 className="font-medium text-sm leading-tight">
                      {item.product.name}
                    </h4>
                    <p className="text-primary font-semibold">
                      ₹{item.product.price.toFixed(2)} / {item.product.unit}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="font-medium text-sm w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-primary">₹{cartTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Checkout ₹{cartTotal.toFixed(2)}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
      
      {/* Checkout Form */}
      <CheckoutForm 
        isOpen={showCheckout} 
        onClose={() => setShowCheckout(false)} 
      />
    </Sheet>
  );
};

export default Cart;