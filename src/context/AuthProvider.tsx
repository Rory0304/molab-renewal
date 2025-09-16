'use client';

import React from 'react';

import type { User } from '@supabase/auth-helpers-nextjs';
import { SupabaseClientSingleton } from 'src/supabase/SupabaseClientSingleton';

type AuthProviderProps = { children: React.ReactNode };

interface AuthContextType {
  authorized: boolean;
  userInfo: User | null;
  signOut: () => void;
}

//
//
//
const AuthContext = React.createContext<AuthContextType>({
  authorized: false,
  userInfo: null,
  signOut: () => {},
});

//
//
//
function AuthProvider({ children }: AuthProviderProps) {
  const supabaseClient = SupabaseClientSingleton.getClient();

  const [authorized, setAuthorized] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState<User | null>(null);

  //
  //
  //
  const resetUserInfo = () => {
    setAuthorized(false);
    setUserInfo(null);
  };

  const resolveSession = async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabaseClient.auth.getSession();

      if (error) {
        console.error('fail to resolve session key', error);
        resetUserInfo();
        return;
      }

      setAuthorized(Boolean(session?.user));
      setUserInfo(session?.user || null);
    } catch (err) {
      console.error('Error resolving session:', err);
      resetUserInfo();
    }
  };

  const signOut = async () => {
    try {
      await supabaseClient.auth.signOut();

      resetUserInfo();

      localStorage.removeItem('sb-yjizvhkbeyqrgkaaodgh-auth-token');
      window.location.href = '/';
    } catch (err) {
      console.error(err);
    }
  };

  //
  //
  //
  React.useEffect(() => {
    const initializeAuth = async () => {
      await resolveSession();
    };

    initializeAuth();

    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        setUserInfo(session?.user || null);
        setAuthorized(Boolean(session?.user));
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ userInfo, authorized, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

//
//
//
const useAuth = () => {
  return React.useContext(AuthContext);
};

export { AuthContext, AuthProvider, useAuth };
