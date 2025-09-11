import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export const useAdmin = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    let active = true;
    const check = async () => {
      if (!user) {
        setIsAdmin(false);
        return;
      }
      setChecking(true);
      try {
        // Ensure the special email is granted admin on first login
        await supabase.rpc('ensure_admin_for_current_user');
      } catch (e) {
        // noop
      }
      try {
        const { data } = await supabase.rpc('check_user_role', {
          _user_id: user.id,
          _role: 'admin',
        });
        if (!active) return;
        setIsAdmin(Boolean(data));
      } finally {
        setChecking(false);
      }
    };
    check();
    return () => {
      active = false;
    };
  }, [user?.id]);

  return { isAdmin, checking };
};
