import { ArrowRight, Gift, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroHamper from "@/assets/hero-hamper.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center gradient-subtle overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium">
              <Gift className="w-4 h-4" />
              Festive Season Special - Up to 30% Off
            </div>
            
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-foreground leading-tight">
              Premium
              <span className="text-primary block">Gifting</span>
              <span className="gradient-gold bg-clip-text text-transparent block">
                Redefined
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              Curate moments of joy with our handpicked collection of festive hampers 
              and personalized gift boxes that celebrate every special bond.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="gradient-primary text-primary-foreground shadow-premium hover:shadow-gold transition-smooth group px-8 py-6 text-lg"
              >
                Shop Hampers
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth px-8 py-6 text-lg"
              >
                Personalize Gift
              </Button>
            </div>
            
            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  4.9/5 from 2000+ happy customers
                </span>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div className="absolute -inset-4 gradient-gold opacity-20 rounded-3xl blur-xl" />
            <div className="relative bg-card rounded-3xl p-8 shadow-premium">
              <img 
                src={heroHamper} 
                alt="Premium festive gift hamper with traditional sweets and decorative items"
                className="w-full h-auto rounded-2xl object-cover"
              />
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground p-3 rounded-full shadow-gold">
                <Heart className="w-6 h-6" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-card text-card-foreground p-4 rounded-2xl shadow-card border">
                <div className="text-sm font-medium">Free Shipping</div>
                <div className="text-xs text-muted-foreground">On orders above ₹999</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;