import { useWishlist } from "@/hooks/useWishlist";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { items, loading: wishlistLoading } = useWishlist();
  const { products, loading: productsLoading } = useProducts();
  
  // Filter products that are in the wishlist
  const wishlistProducts = products.filter(product => 
    items.some(item => item.product_id === product.id)
  );

  const isLoading = wishlistLoading || productsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">Loading your wishlist...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Link>
          </Button>
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full mb-4">
            <Heart className="w-8 h-8 text-secondary-foreground" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            My Wishlist
          </h1>
          <p className="text-xl text-muted-foreground">
            {items.length > 0 
              ? `${items.length} item${items.length === 1 ? '' : 's'} saved for later` 
              : "Your wishlist is empty"
            }
          </p>
        </div>

        {/* Wishlist Content */}
        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No items in wishlist yet</h3>
              <p className="text-muted-foreground mb-6">
                Start browsing and save your favorite products to see them here.
              </p>
              <Button asChild className="gradient-primary text-primary-foreground">
                <Link to="/">
                  Start Shopping
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlistProducts.map((product) => (
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
    </div>
  );
};

export default Wishlist;