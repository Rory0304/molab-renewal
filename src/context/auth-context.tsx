"use client";

import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/auth-helpers-nextjs";

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
      console.error("fail to resolve session key");
      resetUserInfo();
    }

    setAuthorized(true);
    setUserInfo(session?.user || null);
  }, []);

  const signOut = () => {
    try {
      supabaseClient.auth.signOut();
      resetUserInfo();
    } catch (err) {
      console.error("fail to sign out");
    }
  };

  //
  //
  //
  React.useEffect(() => {
    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        setUserInfo(session?.user || null);
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
