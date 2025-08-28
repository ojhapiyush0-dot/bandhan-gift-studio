import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import giftCollection from "@/assets/gift-collection.jpg";

const products = [
  {
    name: "Festive Delights Hamper",
    price: 2499,
    originalPrice: 3199,
    image: product1,
    rating: 4.8,
    reviews: 124,
    badge: "Bestseller"
  },
  {
    name: "Premium Corporate Gift Box",
    price: 1899,
    originalPrice: 2299,
    image: product2,
    rating: 4.9,
    reviews: 89,
    badge: "New"
  },
  {
    name: "Personalized Love Box",
    price: 1599,
    originalPrice: 1999,
    image: product3,
    rating: 4.7,
    reviews: 156,
    badge: "Popular"
  },
  {
    name: "Luxury Collection Set",
    price: 3999,
    originalPrice: 4999,
    image: giftCollection,
    rating: 4.9,
    reviews: 78,
    badge: "Premium"
  }
];

const FeaturedProducts = () => {
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
            <Button variant="outline" size="sm">All</Button>
            <Button variant="ghost" size="sm">Bestsellers</Button>
            <Button variant="ghost" size="sm">New Arrivals</Button>
            <Button variant="ghost" size="sm">On Sale</Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
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