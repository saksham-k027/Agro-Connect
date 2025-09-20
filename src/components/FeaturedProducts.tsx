import React from 'react';
import { useState } from 'react';
import { products } from '@/data/products';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Heart, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import ProductInfoModal from './ProductInfoModal';

// Define a type for our product
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  image?: string;
  image_url?: string;
  discount?: boolean;
  oldPrice?: number;
  badge?: string;
  organic?: boolean;
  description: string;
}
const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    toast
  } = useToast();
  const {
    addToCart
  } = useCart();
  const {
    addToFavorites,
    removeFromFavorites,
    isFavorite
  } = useFavorites();

  // Filter products based on active tab
  const filteredProducts = activeTab === "all" ? products.slice(0, 8) // Show only 8 products for better layout
  : products.filter(product => product.category.toLowerCase() === activeTab.toLowerCase()).slice(0, 8);
  const categories = ["all", ...new Set(products.map(product => product.category.toLowerCase()))];
  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };
  const handleToggleFavorite = (product: Product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };
  const handleProductInfo = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  return <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-farm-green rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-farm-accent-yellow rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-farm-green/10 mb-4 animate-pulse">
            <Star className="h-8 w-8 text-farm-green" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-farm-green-dark via-farm-green to-farm-green-dark bg-clip-text text-transparent">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our hand-picked selection of premium, organic produce delivered straight from local farms to your doorstep. 
            Each product is carefully selected for quality, freshness, and exceptional taste.
          </p>
        </div>
        
        {/* Enhanced Tabs */}
        <Tabs defaultValue="all" className="w-full max-w-4xl mx-auto mb-16">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-1 mb-12 bg-transparent border-b border-border/30 p-0 rounded-none">
            {categories.slice(0, 4).map((category: string) => <TabsTrigger key={category} value={category} onClick={() => setActiveTab(category)} className="capitalize px-4 py-2 rounded-lg font-normal text-sm transition-all duration-200 data-[state=active]:bg-primary/5 data-[state=active]:text-primary hover:bg-muted/50 text-muted-foreground bg-background border border-border/30">
                {category === "all" ? "All Products" : category}
              </TabsTrigger>)}
          </TabsList>
        </Tabs>
        
        {/* Enhanced Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product: Product, index) => <Card key={product.id} className="group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-farm-green/20 border-0 bg-white/80 backdrop-blur-sm hover:scale-[1.02] animate-fade-in" style={{
          animationDelay: `${index * 100}ms`
        }} onMouseEnter={() => setHoveredProduct(product.id)} onMouseLeave={() => setHoveredProduct(null)}>
              <div className="relative aspect-square overflow-hidden">
                <img src={product.image || product.image_url || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                
                {/* Overlay with quick actions */}
                <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button size="icon" variant="secondary" className={`w-10 h-10 rounded-full shadow-lg transition-all duration-300 ${isFavorite(product.id) ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-white/90 hover:bg-white text-gray-700'}`} onClick={e => {
                  e.stopPropagation();
                  handleToggleFavorite(product);
                }}>
                      <Heart className={`h-4 w-4 transition-all duration-300 ${isFavorite(product.id) ? 'fill-current scale-110' : ''}`} />
                    </Button>
                    <Button size="icon" variant="secondary" className="w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg" onClick={e => {
                  e.stopPropagation();
                  handleProductInfo(product);
                }}>
                      <Info className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.organic && <Badge className="bg-farm-green text-white font-semibold shadow-lg">
                      Organic
                    </Badge>}
                  {product.badge && <Badge className={`font-semibold shadow-lg ${product.badge === "Sale" ? "bg-red-500 text-white" : product.badge === "New" ? "bg-blue-500 text-white" : "bg-purple-500 text-white"}`}>
                      {product.badge}
                    </Badge>}
                </div>

                {/* Discount percentage */}
                {product.discount && product.oldPrice && <div className="absolute bottom-4 left-4">
                    <Badge className="bg-red-500 text-white font-bold">
                      -{Math.round((product.oldPrice - product.price) / product.oldPrice * 100)}%
                    </Badge>
                  </div>}
              </div>
              
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-farm-green uppercase tracking-wide">
                    {product.category}
                  </p>
                  <h3 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-farm-green-dark transition-colors">
                    {product.name}
                  </h3>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-farm-green-dark">
                        ₹{product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500">/ {product.unit}</span>
                    </div>
                    {product.discount && product.oldPrice && <span className="text-sm line-through text-gray-400">
                        ₹{product.oldPrice.toFixed(2)}
                      </span>}
                  </div>
                  
                  {/* Rating stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                    <span className="text-xs text-gray-500 ml-1">(4.8)</span>
                  </div>
                </div>
                
                <Button className="w-full bg-farm-green hover:bg-farm-green-dark text-white rounded-xl py-6 font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-farm-green/30 group" onClick={() => handleAddToCart(product)}>
                  <ShoppingCart className="h-5 w-5 mr-2 transition-transform group-hover:scale-110" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>)}
        </div>


        {/* Product Info Modal */}
        <ProductInfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} productName={selectedProduct?.name || ''} productImage={selectedProduct?.image || selectedProduct?.image_url} productDescription={selectedProduct?.description} category={selectedProduct?.category} />
      </div>
    </section>;
};
export default FeaturedProducts;