
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';

interface ProductGridProps {
  activeCategory: string | null;
  activeFilters: Record<string, any>;
}

const ProductGrid = ({ activeCategory, activeFilters }: ProductGridProps) => {
  const { toast } = useToast();
  const { addToCart } = useCart();

  // Filter and sort products based on selected category and filters
  let filteredProducts = products.filter(product => {
    // Filter by category if one is selected
    if (activeCategory && product.category.toLowerCase() !== activeCategory.toLowerCase()) {
      return false;
    }

    // Filter by other active filters
    if (activeFilters.organic && !product.organic) {
      return false;
    }

    if (activeFilters.onSale && !product.discount) {
      return false;
    }

    if (activeFilters.premium && product.badge !== "Premium") {
      return false;
    }

    if (activeFilters.local && product.badge !== "Local") {
      return false;
    }

    if (activeFilters.newProducts && product.badge !== "New") {
      return false;
    }

    if (activeFilters.superfood && product.badge !== "Superfood") {
      return false;
    }

    if (activeFilters.heartHealthy && product.badge !== "Heart Healthy") {
      return false;
    }

    if (activeFilters.proteinRich && product.badge !== "Protein-Rich") {
      return false;
    }

    // Price range filter
    if (activeFilters.priceRange) {
      const [min, max] = activeFilters.priceRange;
      if (product.price < min || product.price > max) {
        return false;
      }
    }

    return true;
  });

  // Apply sorting
  if (activeFilters.sortBy) {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      switch (activeFilters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'category':
          return a.category.localeCompare(b.category);
        case 'organic':
          return (b.organic ? 1 : 0) - (a.organic ? 1 : 0);
        case 'discount':
          return (b.discount ? 1 : 0) - (a.discount ? 1 : 0);
        default:
          return 0;
      }
    });
  }

  const handleAddToCart = async (product: any) => {
    try {
      await addToCart(product);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div>
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-500">No products match your filters</h3>
          <p className="mt-2 text-gray-400">Try adjusting your filters or browse all products</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">{filteredProducts.length} products</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="product-card card-hover">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-[200px] object-cover"
                  />
                  {product.badge && (
                    <Badge className={`absolute top-2 right-2 ${
                      product.badge === "Sale" 
                        ? "bg-farm-accent-red" 
                        : "bg-farm-accent-blue"
                    }`}>
                      {product.badge}
                    </Badge>
                  )}
                  {product.organic && (
                    <Badge className="absolute top-2 left-2 bg-farm-green">
                      Organic
                    </Badge>
                  )}
                </div>
                <CardContent className="pt-4 pb-2">
                  <p className="text-sm text-farm-green">{product.category}</p>
                  <h3 className="font-semibold text-lg mb-1 text-farm-green-dark">{product.name}</h3>
                  <div className="flex items-center">
                    <span className="text-xl font-bold">₹{product.price}</span>
                    <span className="text-sm text-gray-500 ml-1">/ {product.unit}</span>
                    {product.discount && (
                      <span className="ml-2 text-sm line-through text-gray-400">
                        ₹{product.oldPrice}
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    className="w-full bg-farm-green hover:bg-farm-green-dark"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductGrid;
