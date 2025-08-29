import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { Link } from "react-router-dom";

const Success = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart after successful payment
    clearCart();
  }, [clearCart]);

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-md mx-auto text-center">
        <CardContent className="p-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for your purchase. Your order has been confirmed and will be processed shortly.
          </p>
          <div className="space-y-2">
            <Link to="/">
              <Button className="w-full">Continue Shopping</Button>
            </Link>
            <Link to="/orders">
              <Button variant="outline" className="w-full">View Orders</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Success;