import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";

const FeaturedProducts = () => {
  const { products, loading, selectedCategory, setSelectedCategory } = useProducts();
  
  const featuredProducts = products.slice(0, 4);
  return (
    <section className="py-20 gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Featured Collections
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Handpicked favorites that have won hearts across the country
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Button 
              variant={selectedCategory === null ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            <Button 
              variant={selectedCategory === 'bestseller' ? "default" : "ghost"} 
              size="sm"
              onClick={() => setSelectedCategory('bestseller')}
            >
              Bestsellers
            </Button>
            <Button 
              variant={selectedCategory === 'new' ? "default" : "ghost"} 
              size="sm"
              onClick={() => setSelectedCategory('new')}
            >
              New Arrivals
            </Button>
            <Button 
              variant={selectedCategory === 'sale' ? "default" : "ghost"} 
              size="sm"
              onClick={() => setSelectedCategory('sale')}
            >
              On Sale
            </Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {loading ? (
            <div className="col-span-full text-center py-8">Loading products...</div>
          ) : (
            featuredProducts.map((product) => (
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
            ))
          )}
        </div>
        
        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth group px-8"
          >
            View All Products
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;