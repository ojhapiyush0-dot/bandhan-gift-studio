-- Work with the existing app_role enum - let's see what values it has and add admin if needed
DO $$ 
BEGIN
    -- Check if 'admin' value exists in the enum, if not add it
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'admin' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'app_role')) THEN
        ALTER TYPE public.app_role ADD VALUE 'admin';
    END IF;
END $$;

-- Grant admin access to your account using the enum type
INSERT INTO public.user_roles (user_id, role)
VALUES ('51038e4a-3bbe-487a-b9ae-1b0737156347', 'admin'::app_role)
ON CONFLICT (user_id, role) DO NOTHING;

-- Make sure the has_role function works with the app_role enum
CREATE OR REPLACE FUNCTION public.has_role(
  _user_id UUID,
  _role app_role
)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = _user_id AND role = _role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;