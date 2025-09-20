
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import ProductFilters from '@/components/ProductFilters';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { 
  FilterIcon, 
  Grid3X3, 
  List, 
  SlidersHorizontal,
  X,
  Sparkles,
  ShoppingCart,
  CreditCard
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CheckoutForm from '@/components/CheckoutForm';

const Shop = () => {
  const { cartItems, cartTotal, updateQuantity } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showCheckout, setShowCheckout] = useState(false);

  const handleCategoryChange = (category: string | null) => {
    setActiveCategory(category);
  };

  const handleFilterChange = (filters: Record<string, any>) => {
    setActiveFilters(filters);
  };

  const clearFilters = () => {
    setActiveCategory(null);
    setActiveFilters({});
  };

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
  const activeFilterCount = Object.keys(activeFilters).length + (activeCategory ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-primary/5 via-background to-primary/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.1)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--primary)/0.1)_0%,transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
              <Sparkles className="w-4 h-4" />
              Premium Organic Collection
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Fresh, Organic{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                Groceries
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover our premium collection of farm-fresh, organic produce and artisanal food products, 
              carefully sourced from local farmers and trusted suppliers.
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        {/* Filters Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-normal text-muted-foreground">All Products</h2>
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="gap-2">
                <SlidersHorizontal className="w-3 h-3" />
                {activeFilterCount} Filter{activeFilterCount > 1 ? 's' : ''} Active
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="px-3 py-1.5"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="px-3 py-1.5"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {/* Clear Filters */}
            {activeFilterCount > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearFilters} 
                className="gap-2 hidden md:flex"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </Button>
            )}
            
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 md:hidden">
                  <FilterIcon className="h-4 w-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge variant="destructive" className="ml-1 px-1.5 py-0.5 text-xs">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85%] sm:w-[400px] overflow-y-auto">
                <SheetHeader className="space-y-4 pb-6 border-b border-border">
                  <SheetTitle className="text-left text-xl font-semibold">
                    Filter Products
                  </SheetTitle>
                  {activeFilterCount > 0 && (
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="gap-2">
                        <SlidersHorizontal className="w-3 h-3" />
                        {activeFilterCount} Active
                      </Badge>
                      <Button variant="ghost" onClick={clearFilters} size="sm" className="gap-2">
                        <X className="w-4 h-4" />
                        Clear All
                      </Button>
                    </div>
                  )}
                </SheetHeader>
                <div className="py-6">
                  <ProductFilters 
                    activeCategory={activeCategory} 
                    onCategoryChange={handleCategoryChange}
                    activeFilters={activeFilters}
                    onFilterChange={handleFilterChange}
                  />
                  <SheetClose asChild>
                    <Button className="w-full mt-6">
                      Apply Filters
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Cart Summary - Fixed position */}
        {cartItems.length > 0 && (
          <div className="fixed bottom-6 right-6 z-40">
            <div className="bg-card border border-border rounded-2xl shadow-2xl p-6 min-w-[300px] animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Cart Summary</h3>
                <Badge variant="secondary" className="px-3 py-1">
                  {cartItems.length} item{cartItems.length > 1 ? 's' : ''}
                </Badge>
              </div>
              
              <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
                {cartItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center gap-3 text-sm">
                    <img 
                      src={item.product.image || "/placeholder.svg"} 
                      alt={item.product.name}
                      className="w-8 h-8 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-medium">{item.product.name}</p>
                      <p className="text-muted-foreground text-xs">
                        ₹{item.product.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 w-6 p-0 rounded-full"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="text-xs font-medium w-6 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 w-6 p-0 rounded-full"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                ))}
                {cartItems.length > 3 && (
                  <p className="text-xs text-muted-foreground text-center">
                    +{cartItems.length - 3} more item{cartItems.length - 3 > 1 ? 's' : ''}
                  </p>
                )}
              </div>
              
              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-lg text-primary">
                    ₹{cartTotal.toFixed(2)}
                  </span>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-80 space-y-6">
            <div className="sticky top-24 space-y-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Filters</h3>
                  {activeFilterCount > 0 && (
                    <Button variant="ghost" onClick={clearFilters} size="sm" className="gap-2 text-xs">
                      <X className="w-3 h-3" />
                      Clear All
                    </Button>
                  )}
                </div>
                <ProductFilters 
                  activeCategory={activeCategory} 
                  onCategoryChange={handleCategoryChange}
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                />
              </div>
            </div>
          </aside>
          
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            <ProductGrid 
              activeCategory={activeCategory} 
              activeFilters={activeFilters}
            />
          </div>
        </div>
      </main>
      
      {/* Checkout Form */}
      <CheckoutForm 
        isOpen={showCheckout} 
        onClose={() => setShowCheckout(false)} 
      />
      
      <Footer />
    </div>
  );
};

export default Shop;
