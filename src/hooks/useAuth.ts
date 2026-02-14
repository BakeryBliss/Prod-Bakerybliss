import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export const useAuth = () => {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check current session
    const checkAuth = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error('Auth error:', error);
          setIsLoading(false);
          return;
        }

        setSession(session);
        setUser(session?.user || null);
        setIsLoggedIn(!!session);

        // Store token for localStorage fallback
        if (session?.access_token) {
          localStorage.setItem('authToken', session.access_token);
          window.dispatchEvent(new Event('authChanged'));
        } else {
          localStorage.removeItem('authToken');
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error checking auth:', error);
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user || null);
      setIsLoggedIn(!!session);

      if (session?.access_token) {
        localStorage.setItem('authToken', session.access_token);
      } else {
        localStorage.removeItem('authToken');
      }

      window.dispatchEvent(new Event('authChanged'));
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem('authToken');
      window.dispatchEvent(new Event('authChanged'));
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    session,
    user,
    isLoading,
    isLoggedIn,
    logout,
  };
};
