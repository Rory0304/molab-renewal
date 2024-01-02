'use client';

import React from 'react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { User } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

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
  const supabaseClient = createClientComponentClient();
  const router = useRouter();

  const [authorized, setAuthorized] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState<User | null>(null);

  //
  //
  //
  const resetUserInfo = () => {
    setAuthorized(false);
    setUserInfo(null);
  };

  const resolveSession = React.useCallback(async () => {
    const {
      data: { session },
      error,
    } = await supabaseClient.auth.getSession();

    if (error) {
      console.error('fail to resolve session key');
      resetUserInfo();
    }

    setAuthorized(Boolean(session?.user));
    setUserInfo(session?.user || null);
  }, []);

  const signOut = async () => {
    console.log('sign out');
    try {
      await supabaseClient.auth.signOut().then(res => {
        if (res.error) {
          throw new Error('fail to sign out');
        }
        resetUserInfo();
        router.push('/login');
      });
    } catch (err) {
      console.error(err);
    }
  };

  //
  //
  //
  React.useEffect(() => {
    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        console.log(_event);
        setUserInfo(session?.user || null);
        setAuthorized(Boolean(session?.user));
      }
    );

    resolveSession();

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
