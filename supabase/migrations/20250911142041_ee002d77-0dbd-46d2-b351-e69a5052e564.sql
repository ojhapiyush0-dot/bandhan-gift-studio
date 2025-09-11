-- Grant admin access to your account using the existing enum type
-- First check if app_role enum exists and create it if needed
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
        CREATE TYPE app_role AS ENUM ('admin', 'user', 'moderator');
    END IF;
END$$;

-- Ensure the role column uses the enum type
ALTER TABLE public.user_roles ALTER COLUMN role TYPE app_role USING role::app_role;

-- Grant admin access to your account with the proper enum value
INSERT INTO public.user_roles (user_id, role)
VALUES ('51038e4a-3bbe-487a-b9ae-1b0737156347', 'admin'::app_role)
ON CONFLICT (user_id, role) DO NOTHING;