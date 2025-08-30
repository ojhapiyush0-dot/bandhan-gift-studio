import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-serif font-bold text-foreground mb-6">
            About Bandhan Box
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Creating unforgettable moments through curated gift experiences that celebrate every special occasion and relationship.
          </p>
        </div>

        {/* Brand Story */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-foreground">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Bandhan Box was born from a simple belief: that every relationship deserves to be celebrated with thoughtful, beautiful gifts that create lasting memories.
              </p>
              <p>
                Founded in the heart of India, we understand the importance of festivals, celebrations, and the joy of giving. Our journey began with a mission to make gifting more meaningful, personal, and accessible to everyone.
              </p>
              <p>
                Today, we're proud to be India's premier destination for curated gift hampers, personalized gifts, and festive collections that bring families and friends closer together.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-primary p-8 flex items-center justify-center">
              <div className="text-center text-primary-foreground">
                <h3 className="text-2xl font-serif font-bold mb-4">10,000+</h3>
                <p>Happy Customers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-foreground text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-card">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💝</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Quality First</h3>
                <p className="text-muted-foreground">
                  Every product is carefully selected and curated to ensure the highest quality and presentation.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-card">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Personalization</h3>
                <p className="text-muted-foreground">
                  We believe every gift should be as unique as the person receiving it, with personalized touches.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-card">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Timely Delivery</h3>
                <p className="text-muted-foreground">
                  Fast, secure delivery ensures your special moments are never missed.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mission */}
        <div className="text-center bg-card rounded-3xl p-12 shadow-card">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-6">Our Mission</h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            To strengthen bonds and create joyful moments by offering thoughtfully curated gifts that celebrate 
            India's rich traditions while embracing modern gifting needs. We're committed to making every 
            occasion special with products that reflect love, care, and attention to detail.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;