import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader, Star, Heart, Eye, ShoppingCart, Info } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import ProductInfoModal from './ProductInfoModal';

interface WikipediaPage {
  title: string;
  extract: string;
  thumbnail?: {
    source: string;
  };
  pageurl: string;
}

const WikipediaFeaturedProducts = () => {
  const [fruits, setFruits] = useState<WikipediaPage[]>([]);
  const [grains, setGrains] = useState<WikipediaPage[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<WikipediaPage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const fruitsList = [
    'apple', 'banana', 'orange', 'strawberry', 'mango', 'grape', 'pineapple', 
    'watermelon', 'kiwi', 'peach', 'plum', 'cherry', 'blueberry', 'raspberry',
    'blackberry', 'pomegranate', 'papaya', 'avocado', 'lemon', 'lime',
    'grapefruit', 'cantaloupe', 'honeydew', 'passion fruit', 'dragon fruit'
  ];

  const grainsList = [
    'wheat', 'rice', 'oats', 'barley', 'quinoa', 'corn', 'rye', 'millet',
    'buckwheat', 'amaranth', 'sorghum', 'teff', 'wild rice', 'brown rice',
    'bulgur', 'couscous', 'farro', 'spelt', 'kamut', 'freekeh'
  ];

  const fetchWikipediaData = async (query: string): Promise<WikipediaPage | null> => {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
      );
      
      if (response.ok) {
        const data = await response.json();
        return {
          title: data.title,
          extract: data.extract,
          thumbnail: data.thumbnail,
          pageurl: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching Wikipedia data:', error);
      return null;
    }
  };

  const loadMoreItems = useCallback(async () => {
    if (loading) return;
    
    setLoading(true);
    
    const itemsPerPage = 6;
    const startIndex = (page - 1) * itemsPerPage;
    
    // Get items for current page
    const currentFruits = fruitsList.slice(startIndex, startIndex + itemsPerPage / 2);
    const currentGrains = grainsList.slice(startIndex, startIndex + itemsPerPage / 2);
    
    try {
      // Fetch fruits data
      const fruitPromises = currentFruits.map(fruit => fetchWikipediaData(fruit));
      const grainPromises = currentGrains.map(grain => fetchWikipediaData(grain));
      
      const [newFruits, newGrains] = await Promise.all([
        Promise.all(fruitPromises),
        Promise.all(grainPromises)
      ]);
      
      const validFruits = newFruits.filter(Boolean) as WikipediaPage[];
      const validGrains = newGrains.filter(Boolean) as WikipediaPage[];
      
      setFruits(prev => [...prev, ...validFruits]);
      setGrains(prev => [...prev, ...validGrains]);
      
      // Check if we have more items
      const totalItems = Math.max(fruitsList.length, grainsList.length);
      if (startIndex + itemsPerPage >= totalItems) {
        setHasMore(false);
      }
      
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error loading items:', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading]);

  // Initial load
  useEffect(() => {
    loadMoreItems();
  }, []);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000 && 
        hasMore && 
        !loading
      ) {
        loadMoreItems();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreItems, hasMore, loading]);

  const handleAddToCart = (item: WikipediaPage) => {
    const product = {
      id: Math.abs(item.title.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0)),
      name: item.title,
      price: parseFloat((Math.random() * 5 + 2).toFixed(2)),
      image_url: item.thumbnail?.source || "/placeholder.svg",
      unit: "lb"
    };
    addToCart(product);
  };

  const handleToggleFavorite = (item: WikipediaPage) => {
    const product = {
      id: Math.abs(item.title.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0)),
      name: item.title,
      price: parseFloat((Math.random() * 5 + 2).toFixed(2)),
      image_url: item.thumbnail?.source || "/placeholder.svg",
      unit: "lb"
    };
    
    const productId = product.id;
    if (isFavorite(productId)) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(product);
    }
  };

  const handleProductInfo = (item: WikipediaPage) => {
    setSelectedProduct(item);
    setIsModalOpen(true);
  };

  const allItems = [...fruits, ...grains].sort(() => Math.random() - 0.5); // Shuffle items

  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 animate-pulse">
            <Star className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our hand-picked selection of premium, organic produce delivered straight from local farms to your doorstep. 
            Each product is carefully selected for quality, freshness, and exceptional taste.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {allItems.map((item, index) => {
            const isFruit = fruits.includes(item);
            const category = isFruit ? 'Fruits' : 'Grains';
            const productId = Math.abs(item.title.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0));
            const price = parseFloat((Math.random() * 5 + 2).toFixed(2));
            
            return (
              <Card 
                key={`${item.title}-${index}`}
                className="group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 border-0 bg-white/80 backdrop-blur-sm hover:scale-[1.02] animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredProduct(item.title)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={item.thumbnail?.source || "/placeholder.svg"} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay with quick actions */}
                  <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
                    hoveredProduct === item.title ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <Button
                        size="icon"
                        variant="secondary"
                        className={`w-10 h-10 rounded-full shadow-lg transition-all duration-300 ${
                          isFavorite(productId) 
                            ? 'bg-red-500 hover:bg-red-600 text-white' 
                            : 'bg-white/90 hover:bg-white text-gray-700'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFavorite(item);
                        }}
                      >
                        <Heart className={`h-4 w-4 transition-all duration-300 ${
                          isFavorite(productId) ? 'fill-current scale-110' : ''
                        }`} />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProductInfo(item);
                        }}
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <Badge className="bg-primary text-white font-semibold shadow-lg">
                      Organic
                    </Badge>
                    {Math.random() > 0.7 && (
                      <Badge className="bg-red-500 text-white font-semibold shadow-lg">
                        Sale
                      </Badge>
                    )}
                  </div>
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-primary uppercase tracking-wide">
                      {category}
                    </p>
                    <h3 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {item.extract}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">
                          ₹{price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500">/ lb</span>
                      </div>
                    </div>
                    
                    {/* Rating stars */}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="h-4 w-4 fill-yellow-400 text-yellow-400" 
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">(4.8)</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-6 font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 group"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2 transition-transform group-hover:scale-110" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader className="h-8 w-8 animate-spin text-primary mr-2" />
            <span className="text-muted-foreground">Loading more fresh produce...</span>
          </div>
        )}

        {/* Enhanced CTA Section */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center space-y-4 p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-border/50 shadow-xl">
            <h3 className="text-2xl font-bold text-primary">
              Discover More Fresh Products
            </h3>
            <p className="text-gray-600 max-w-md">
              Explore our complete collection of farm-fresh produce and artisanal goods
            </p>
            <Button 
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground rounded-full px-8 py-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => window.location.href = '/shop'}
            >
              View All Products
              <Star className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Product Info Modal */}
        <ProductInfoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          productName={selectedProduct?.title || ''}
          productImage={selectedProduct?.thumbnail?.source}
          productDescription={selectedProduct?.extract}
          category={fruits.includes(selectedProduct!) ? 'Fruits' : 'Grains'}
        />
      </div>
    </section>
  );
};

export default WikipediaFeaturedProducts;