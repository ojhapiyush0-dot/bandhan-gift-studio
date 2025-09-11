-- Create a new function with a different name to avoid conflicts
CREATE OR REPLACE FUNCTION public.check_user_role(
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

-- Grant admin access to your account
INSERT INTO public.user_roles (user_id, role)
VALUES ('51038e4a-3bbe-487a-b9ae-1b0737156347', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;