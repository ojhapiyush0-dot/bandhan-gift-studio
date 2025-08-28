import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    name: "Festival Hampers",
    description: "Traditional sweets and festive treats",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    color: "from-orange-500/20 to-yellow-500/20"
  },
  {
    name: "Corporate Gifts",
    description: "Premium gifts for business relations",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
    color: "from-blue-500/20 to-indigo-500/20"
  },
  {
    name: "Personalized Boxes",
    description: "Custom curated for your loved ones",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400",
    color: "from-pink-500/20 to-rose-500/20"
  },
  {
    name: "Wedding Favors",
    description: "Elegant gifts for special celebrations",
    image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400",
    color: "from-purple-500/20 to-pink-500/20"
  }
];

const CategorySection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Explore Our Collections
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the perfect gift for every occasion and relationship
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden border-0 shadow-card hover:shadow-premium transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-serif font-semibold mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/90 mb-4">
                    {category.description}
                  </p>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="group/btn opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Explore 
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;