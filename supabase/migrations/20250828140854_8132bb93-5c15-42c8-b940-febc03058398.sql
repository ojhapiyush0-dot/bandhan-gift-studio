-- Fix the search path security issue in handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', null), COALESCE(NEW.raw_user_meta_data->>'avatar_url', null))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;