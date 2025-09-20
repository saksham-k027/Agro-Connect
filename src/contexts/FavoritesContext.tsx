import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useToast } from "@/hooks/use-toast";

type Product = {
  id: number;
  name: string;
  price: number;
  image_url?: string;
  unit: string;
};

type FavoriteItem = {
  id: string;
  product: Product;
};

type FavoritesContextType = {
  favoriteItems: FavoriteItem[];
  favoriteCount: number;
  addToFavorites: (product: Product) => Promise<void>;
  removeFromFavorites: (productId: number) => Promise<void>;
  isFavorite: (productId: number) => boolean;
  clearFavorites: () => Promise<void>;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();
  
  const favoriteCount = favoriteItems.length;

  // Load favorites from localStorage when component mounts or user changes
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      try {
        setFavoriteItems(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Error parsing saved favorites:", error);
        localStorage.removeItem("favorites");
        setFavoriteItems([]);
      }
    } else {
      // Clear favorites if no saved favorites
      setFavoriteItems([]);
    }
  }, [user]);

  // Save favorites to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoriteItems));
  }, [favoriteItems]);

  const addToFavorites = async (product: Product) => {
    const existingItem = favoriteItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      toast({
        title: "Already in favorites",
        description: "This item is already in your favorites.",
        variant: "destructive"
      });
      return;
    }

    const newItem = { 
      id: `${product.id}-${Date.now()}`,
      product
    };
    
    setFavoriteItems(prevItems => [...prevItems, newItem]);
    
    toast({
      title: "Added to favorites",
      description: `${product.name} has been added to your favorites.`,
    });
  };

  const removeFromFavorites = async (productId: number) => {
    const favoriteItem = favoriteItems.find(item => item.product.id === productId);
    
    if (!favoriteItem) return;

    setFavoriteItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    
    toast({
      title: "Removed from favorites",
      description: `${favoriteItem.product.name} has been removed from your favorites.`,
    });
  };

  const isFavorite = (productId: number) => {
    return favoriteItems.some(item => item.product.id === productId);
  };

  const clearFavorites = async () => {
    setFavoriteItems([]);
    
    toast({
      title: "Favorites cleared",
      description: "All favorites have been removed.",
    });
  };

  return (
    <FavoritesContext.Provider value={{ 
      favoriteItems, 
      favoriteCount, 
      addToFavorites, 
      removeFromFavorites, 
      isFavorite,
      clearFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}