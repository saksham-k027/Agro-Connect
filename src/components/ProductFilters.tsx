
import React, { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryList } from '@/data/categories';
import { ChevronDown, ChevronRight, Filter, Star, Leaf, Tag, MapPin, TrendingUp } from 'lucide-react';

interface ProductFiltersProps {
  activeCategory: string | null;
  activeFilters: Record<string, any>;
  onCategoryChange: (category: string | null) => void;
  onFilterChange: (filters: Record<string, any>) => void;
}

const ProductFilters = ({ 
  activeCategory, 
  activeFilters, 
  onCategoryChange, 
  onFilterChange 
}: ProductFiltersProps) => {
  
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [sortOpen, setSortOpen] = useState(true);
  const [badgeOpen, setBadgeOpen] = useState(false);

  const handleCheckboxChange = (key: string) => {
    const newFilters = { ...activeFilters };
    newFilters[key] = !newFilters[key];
    onFilterChange(newFilters);
  };

  const handlePriceRangeChange = (values: number[]) => {
    const newFilters = { ...activeFilters, priceRange: values };
    onFilterChange(newFilters);
  };

  const handleQuickPriceFilter = (min: number, max: number) => {
    const newFilters = { ...activeFilters, priceRange: [min, max] };
    onFilterChange(newFilters);
  };

  const handleSortChange = (sortValue: string) => {
    const newFilters = { ...activeFilters, sortBy: sortValue };
    onFilterChange(newFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (activeFilters.organic) count++;
    if (activeFilters.onSale) count++;
    if (activeFilters.premium) count++;
    if (activeFilters.local) count++;
    if (activeFilters.newProducts) count++;
    if (activeFilters.superfood) count++;
    if (activeFilters.heartHealthy) count++;
    if (activeFilters.proteinRich) count++;
    if (activeFilters.priceRange && (activeFilters.priceRange[0] > 0 || activeFilters.priceRange[1] < 700)) count++;
    return count;
  };

  return (
    <div className="space-y-4">
      {/* Categories Section */}
      <Collapsible open={categoriesOpen} onOpenChange={setCategoriesOpen}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full justify-between p-3 h-auto hover:bg-muted/50"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span className="font-medium">Categories</span>
            </div>
            {categoriesOpen ? (
              <ChevronDown className="w-4 h-4 transition-transform" />
            ) : (
              <ChevronRight className="w-4 h-4 transition-transform" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-2">
          <div className="ml-6 space-y-1">
            <button 
              onClick={() => onCategoryChange(null)}
              className={`text-left w-full px-3 py-2 rounded-lg hover:bg-primary/10 transition-all duration-200 ${
                !activeCategory 
                  ? 'font-medium text-primary bg-primary/10 shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              All Products
            </button>
            {categoryList.map((category) => (
              <button 
                key={category.id}
                onClick={() => onCategoryChange(category.name)}
                className={`text-left w-full px-3 py-2 rounded-lg hover:bg-primary/10 transition-all duration-200 ${
                  activeCategory === category.name 
                    ? 'font-medium text-primary bg-primary/10 shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <Separator />
      
      {/* Filters Section */}
      <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full justify-between p-3 h-auto hover:bg-muted/50"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span className="font-medium">Product Filters</span>
            </div>
            {filtersOpen ? (
              <ChevronDown className="w-4 h-4 transition-transform" />
            ) : (
              <ChevronRight className="w-4 h-4 transition-transform" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-2">
          <div className="ml-6 space-y-3">
            <div className="flex items-center space-x-2 p-3 hover:bg-primary/5 rounded-lg transition-all duration-200">
              <Checkbox 
                id="organic" 
                checked={!!activeFilters.organic}
                onCheckedChange={() => handleCheckboxChange('organic')}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label
                htmlFor="organic"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Organic Products
              </label>
            </div>
            <div className="flex items-center space-x-2 p-3 hover:bg-primary/5 rounded-lg transition-all duration-200">
              <Checkbox 
                id="sale" 
                checked={!!activeFilters.onSale}
                onCheckedChange={() => handleCheckboxChange('onSale')}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label
                htmlFor="sale"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                On Sale
              </label>
            </div>
            <div className="flex items-center space-x-2 p-3 hover:bg-primary/5 rounded-lg transition-all duration-200">
              <Checkbox 
                id="premium" 
                checked={!!activeFilters.premium}
                onCheckedChange={() => handleCheckboxChange('premium')}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label
                htmlFor="premium"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Premium Quality
              </label>
            </div>
            <div className="flex items-center space-x-2 p-3 hover:bg-primary/5 rounded-lg transition-all duration-200">
              <Checkbox 
                id="local" 
                checked={!!activeFilters.local}
                onCheckedChange={() => handleCheckboxChange('local')}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label
                htmlFor="local"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Local Farms
              </label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <Separator />
      
      {/* Sort By Section */}
      <Collapsible open={sortOpen} onOpenChange={setSortOpen}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full justify-between p-3 h-auto hover:bg-muted/50"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="font-medium">Sort By</span>
            </div>
            {sortOpen ? (
              <ChevronDown className="w-4 h-4 transition-transform" />
            ) : (
              <ChevronRight className="w-4 h-4 transition-transform" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <div className="ml-6 px-2">
            <Select value={activeFilters.sortBy || "name"} onValueChange={handleSortChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select sorting option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="price-low">Price (Low to High)</SelectItem>
                <SelectItem value="price-high">Price (High to Low)</SelectItem>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="organic">Organic First</SelectItem>
                <SelectItem value="discount">On Sale First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <Separator />

      {/* Special Badges Section */}
      <Collapsible open={badgeOpen} onOpenChange={setBadgeOpen}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full justify-between p-3 h-auto hover:bg-muted/50"
          >
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span className="font-medium">Special Features</span>
              {getActiveFilterCount() > 4 && (
                <Badge variant="secondary" className="ml-2 px-2 py-0.5 text-xs">
                  {getActiveFilterCount() - 4}
                </Badge>
              )}
            </div>
            {badgeOpen ? (
              <ChevronDown className="w-4 h-4 transition-transform" />
            ) : (
              <ChevronRight className="w-4 h-4 transition-transform" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-2">
          <div className="ml-6 space-y-3">
            <div className="flex items-center space-x-2 p-3 hover:bg-primary/5 rounded-lg transition-all duration-200">
              <Checkbox 
                id="newProducts" 
                checked={!!activeFilters.newProducts}
                onCheckedChange={() => handleCheckboxChange('newProducts')}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label
                htmlFor="newProducts"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-2"
              >
                <Tag className="w-3 h-3" />
                New Products
              </label>
            </div>
            <div className="flex items-center space-x-2 p-3 hover:bg-primary/5 rounded-lg transition-all duration-200">
              <Checkbox 
                id="superfood" 
                checked={!!activeFilters.superfood}
                onCheckedChange={() => handleCheckboxChange('superfood')}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label
                htmlFor="superfood"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-2"
              >
                <Leaf className="w-3 h-3" />
                Superfood
              </label>
            </div>
            <div className="flex items-center space-x-2 p-3 hover:bg-primary/5 rounded-lg transition-all duration-200">
              <Checkbox 
                id="heartHealthy" 
                checked={!!activeFilters.heartHealthy}
                onCheckedChange={() => handleCheckboxChange('heartHealthy')}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label
                htmlFor="heartHealthy"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Heart Healthy
              </label>
            </div>
            <div className="flex items-center space-x-2 p-3 hover:bg-primary/5 rounded-lg transition-all duration-200">
              <Checkbox 
                id="proteinRich" 
                checked={!!activeFilters.proteinRich}
                onCheckedChange={() => handleCheckboxChange('proteinRich')}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label
                htmlFor="proteinRich"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Protein-Rich
              </label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <Separator />
      
      {/* Price Range Section */}
      <Collapsible open={priceOpen} onOpenChange={setPriceOpen}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full justify-between p-3 h-auto hover:bg-muted/50"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span className="font-medium">Price Range</span>
            </div>
            {priceOpen ? (
              <ChevronDown className="w-4 h-4 transition-transform" />
            ) : (
              <ChevronRight className="w-4 h-4 transition-transform" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <div className="ml-6 px-2 space-y-4">
            <div className="space-y-3">
              <div className="px-2">
                <Slider
                  value={activeFilters.priceRange || [0, 700]}
                  onValueChange={handlePriceRangeChange}
                  max={700}
                  min={0}
                  step={20}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg">
                <span className="font-medium">₹{activeFilters.priceRange ? activeFilters.priceRange[0] : 0}</span>
                <span className="font-medium">₹{activeFilters.priceRange ? activeFilters.priceRange[1] : 700}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground mb-2">Quick Filters:</p>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant={activeFilters.priceRange && activeFilters.priceRange[0] === 0 && activeFilters.priceRange[1] === 100 ? "default" : "outline"}
                  size="sm" 
                  onClick={() => handleQuickPriceFilter(0, 100)}
                  className="text-xs h-8"
                >
                  Under ₹100
                </Button>
                <Button 
                  variant={activeFilters.priceRange && activeFilters.priceRange[0] === 100 && activeFilters.priceRange[1] === 300 ? "default" : "outline"}
                  size="sm" 
                  onClick={() => handleQuickPriceFilter(100, 300)}
                  className="text-xs h-8"
                >
                  ₹100-300
                </Button>
                <Button 
                  variant={activeFilters.priceRange && activeFilters.priceRange[0] === 300 && activeFilters.priceRange[1] === 500 ? "default" : "outline"}
                  size="sm" 
                  onClick={() => handleQuickPriceFilter(300, 500)}
                  className="text-xs h-8"
                >
                  ₹300-500
                </Button>
                <Button 
                  variant={activeFilters.priceRange && activeFilters.priceRange[0] === 500 && activeFilters.priceRange[1] === 700 ? "default" : "outline"}
                  size="sm" 
                  onClick={() => handleQuickPriceFilter(500, 700)}
                  className="text-xs h-8"
                >
                  ₹500+
                </Button>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleQuickPriceFilter(0, 700)}
                className="text-xs h-8 w-full mt-2"
              >
                Reset Price Filter
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ProductFilters;
