import { Heart, Star, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
}

const ProductCard = ({ 
  name, 
  price, 
  originalPrice, 
  image, 
  rating, 
  reviews, 
  badge 
}: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden border-0 shadow-card hover:shadow-premium transition-all duration-500 hover:-translate-y-2 bg-card">
      <div className="relative overflow-hidden">
        {badge && (
          <div className="absolute top-4 left-4 z-10 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-medium">
            {badge}
          </div>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 bg-card/80 backdrop-blur-sm hover:bg-card hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="w-4 h-4" />
        </Button>
        
        <div className="aspect-square overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            className="w-full gradient-primary text-primary-foreground shadow-gold"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-3">
          <h3 className="font-serif font-semibold text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-secondary text-secondary" />
              <span className="text-sm font-medium text-foreground">{rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">({reviews} reviews)</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">₹{price.toLocaleString()}</span>
            {originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                ₹{originalPrice.toLocaleString()}
              </span>
            )}
            {originalPrice && (
              <span className="text-sm text-secondary font-medium">
                {Math.round(((originalPrice - price) / originalPrice) * 100)}% off
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;