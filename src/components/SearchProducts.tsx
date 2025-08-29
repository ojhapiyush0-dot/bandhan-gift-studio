import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "./ProductCard";

const SearchProducts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { products, loading, searchTerm, setSearchTerm, categories, selectedCategory, setSelectedCategory } = useProducts();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search gifts..."
            className="pl-10 w-64 bg-muted/50 cursor-pointer"
            onClick={() => setIsOpen(true)}
            readOnly
          />
        </div>
      </SheetTrigger>
      
      <SheetContent side="top" className="h-full">
        <SheetHeader>
          <SheetTitle>Search Products</SheetTitle>
        </SheetHeader>
        
        <div className="py-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search for gifts, hampers, and more..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setSearchTerm('')}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="text-center py-8">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm ? `No products found for "${searchTerm}"` : 'No products available'}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.original_price}
                  image={product.image_url || '/placeholder.svg'}
                  rating={product.rating}
                  reviews={product.reviews_count}
                  badge={product.badge}
                  stockQuantity={product.stock_quantity}
                />
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SearchProducts;