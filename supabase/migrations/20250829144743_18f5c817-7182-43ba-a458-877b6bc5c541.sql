-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL, -- Price in cents
  original_price INTEGER,
  image_url TEXT,
  category TEXT,
  rating DECIMAL(2,1) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  badge TEXT,
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create cart_items table
CREATE TABLE public.cart_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total_amount INTEGER NOT NULL, -- Total in cents
  status TEXT NOT NULL DEFAULT 'pending',
  shipping_address JSONB,
  payment_intent_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  quantity INTEGER NOT NULL,
  price INTEGER NOT NULL, -- Price at time of purchase
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Products policies (public read, admin write)
CREATE POLICY "Products are viewable by everyone" 
ON public.products FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create products" 
ON public.products FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own products" 
ON public.products FOR UPDATE 
USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own products" 
ON public.products FOR DELETE 
USING (auth.uid() = created_by);

-- Cart items policies
CREATE POLICY "Users can view their own cart items" 
ON public.cart_items FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own cart items" 
ON public.cart_items FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart items" 
ON public.cart_items FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cart items" 
ON public.cart_items FOR DELETE 
USING (auth.uid() = user_id);

-- Orders policies
CREATE POLICY "Users can view their own orders" 
ON public.orders FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" 
ON public.orders FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders" 
ON public.orders FOR UPDATE 
USING (auth.uid() = user_id);

-- Order items policies
CREATE POLICY "Users can view order items for their orders" 
ON public.order_items FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.orders 
  WHERE orders.id = order_items.order_id 
  AND orders.user_id = auth.uid()
));

CREATE POLICY "Users can create order items for their orders" 
ON public.order_items FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.orders 
  WHERE orders.id = order_items.order_id 
  AND orders.user_id = auth.uid()
));

-- Create indexes for better performance
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_name ON public.products USING GIN(to_tsvector('english', name));
CREATE INDEX idx_cart_items_user_id ON public.cart_items(user_id);
CREATE INDEX idx_orders_user_id ON public.orders(user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at
  BEFORE UPDATE ON public.cart_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample products
INSERT INTO public.products (name, description, price, original_price, image_url, category, rating, reviews_count, badge, stock_quantity) VALUES
('Festive Delights Hamper', 'A premium collection of festive treats and delicacies', 249900, 319900, '/src/assets/product-1.jpg', 'hampers', 4.8, 124, 'Bestseller', 50),
('Premium Corporate Gift Box', 'Elegant corporate gifting solution with premium items', 189900, 229900, '/src/assets/product-2.jpg', 'corporate', 4.9, 89, 'New', 30),
('Personalized Love Box', 'Customizable romantic gift box for special occasions', 159900, 199900, '/src/assets/product-3.jpg', 'personalized', 4.7, 156, 'Popular', 75),
('Luxury Collection Set', 'Our most premium luxury gift collection', 399900, 499900, '/src/assets/gift-collection.jpg', 'luxury', 4.9, 78, 'Premium', 25);