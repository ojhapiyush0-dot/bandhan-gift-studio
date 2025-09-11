-- First, temporarily drop policies that depend on the has_role function
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Drop the conflicting functions 
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role) CASCADE;
DROP FUNCTION IF EXISTS public.has_role(uuid, text) CASCADE;

-- Create a single, clear has_role function that works with text roles
CREATE OR REPLACE FUNCTION public.has_role(
  _user_id UUID,
  _role TEXT
)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = _user_id AND role = _role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Make sure the user_roles table uses TEXT for roles (not enum)
ALTER TABLE public.user_roles ALTER COLUMN role TYPE TEXT;

-- Recreate the profiles policy with the new function
CREATE POLICY "Admins can view all profiles" 
ON public.profiles FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

-- Grant admin access to your account
INSERT INTO public.user_roles (user_id, role)
VALUES ('51038e4a-3bbe-487a-b9ae-1b0737156347', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;