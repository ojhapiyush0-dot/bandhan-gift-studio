-- Update the product policies to work with text-based roles
DROP POLICY IF EXISTS "Users can update their own products" ON public.products;
DROP POLICY IF EXISTS "Users can delete their own products" ON public.products;

-- Create new policies that work with text roles instead of enum
CREATE POLICY "Users can update their own products" 
ON public.products FOR UPDATE 
USING (
  auth.uid() = created_by OR 
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Users can delete their own products" 
ON public.products FOR DELETE 
USING (
  auth.uid() = created_by OR 
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Now we can safely change the role column type
ALTER TABLE public.user_roles ALTER COLUMN role TYPE TEXT;

-- Grant admin access to your account
INSERT INTO public.user_roles (user_id, role)
VALUES ('51038e4a-3bbe-487a-b9ae-1b0737156347', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;