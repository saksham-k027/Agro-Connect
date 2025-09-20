
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { categoryList } from '@/data/categories';
import { products } from '@/data/products';

interface CategoryDetailProps {
  categoryId: number;
}

const CategoryDetail = ({ categoryId }: CategoryDetailProps) => {
  const navigate = useNavigate();
  
  const category = categoryList.find(c => c.id === categoryId);
  if (!category) return null;
  
  const categoryProducts = products
    .filter(product => product.category === category.name)
    .slice(0, 4);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="sticky top-24">
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h2 className="text-3xl font-bold text-farm-green-dark mb-3">{category.name}</h2>
              <p className="text-gray-600 mb-6">{category.description}</p>
              <Button 
                onClick={() => navigate(`/shop?category=${category.name.toLowerCase()}`)} 
                className="w-full bg-farm-green hover:bg-farm-green-dark"
              >
                Browse All {category.name}
              </Button>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <h3 className="text-xl font-semibold mb-6">Popular Products in {category.name}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {categoryProducts.map(product => (
                <Card key={product.id} className="overflow-hidden card-hover">
                  <div className="aspect-square relative">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-1">{product.name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">₹{product.price} / {product.unit}</span>
                      <Button 
                        variant="link" 
                        className="text-farm-green p-0"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-6">Why Choose Our {category.name}?</h3>
              <div className="bg-muted rounded-lg p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-farm-green rounded-full w-5 h-5 mt-1 mr-3"></div>
                    <p>Freshly harvested from our own farms and trusted local partners</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-farm-green rounded-full w-5 h-5 mt-1 mr-3"></div>
                    <p>Sustainable growing practices that respect the environment</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-farm-green rounded-full w-5 h-5 mt-1 mr-3"></div>
                    <p>No harmful pesticides or chemical fertilizers</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-farm-green rounded-full w-5 h-5 mt-1 mr-3"></div>
                    <p>Selected for flavor and nutritional value, not just appearance</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryDetail;
