import { ShoppingBag, Plus, Minus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

const Cart = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, loading } = useCart();

  const formatPrice = (price: number) => {
    return `₹${(price / 100).toLocaleString()}`;
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;
    
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          items: items.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.product.price
          }))
        }
      });

      if (error) throw error;
      
      // Open Stripe checkout in a new tab
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="w-5 h-5" />
          {totalItems > 0 && (
            <Badge variant="secondary" className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center p-0 text-xs">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({totalItems} items)</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                    <img
                      src={item.product.image_url || '/placeholder.svg'}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.product.name}</h4>
                      <p className="text-primary font-semibold">{formatPrice(item.product.price)}</p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.product_id, Math.max(1, item.quantity - 1))}
                          disabled={loading || item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          disabled={loading}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.product_id)}
                          disabled={loading}
                          className="ml-auto"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {items.length > 0 && (
            <div className="border-t border-border pt-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-xl font-bold text-primary">{formatPrice(totalPrice)}</span>
              </div>
              <Button 
                onClick={handleCheckout}
                className="w-full" 
                size="lg"
                disabled={loading}
              >
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;