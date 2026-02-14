'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  useEffect(() => {
    // Initialize auth session on app load
    const initializeAuth = async () => {
      try {
        // Check for existing session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth initialization error:', error);
          return;
        }

        // Store initial session state
        if (session?.access_token) {
          localStorage.setItem('authToken', session.access_token);
          window.dispatchEvent(new Event('authChanged'));
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      }
    };

    initializeAuth();

    // Listen for auth state changes globally
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          localStorage.setItem('authToken', session.access_token);
          window.dispatchEvent(new Event('authChanged'));
          console.log('User signed in:', session.user.email);
        } else if (event === 'SIGNED_OUT') {
          localStorage.removeItem('authToken');
          window.dispatchEvent(new Event('authChanged'));
          console.log('User signed out');
        } else if (event === 'TOKEN_REFRESHED' && session) {
          localStorage.setItem('authToken', session.access_token);
          console.log('Token refreshed for user:', session.user.email);
        }
      }
    );

    // Cleanup subscription on unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return <>{children}</>;
};

export default AuthProvider;