import Auth from "nhost-js-sdk/dist/Auth";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AuthContext } from "./AuthContext";
import { AuthUser, AuthUserType } from "./AuthUser";

interface AuthProviderProps {
  children: React.ReactNode;
  auth: Auth;
}

export function AuthProvider({ children, auth }: AuthProviderProps) {
  const isMounted = useRef(false);
  const [authState, setAuthState] = useState({
    signedIn: auth.isAuthenticated() || false,
    user: null as AuthUserType,
  });

  useEffect(() => {
    isMounted.current = true;
    auth.onAuthStateChanged((data) => {
      if (isMounted.current) {
        setAuthState((oldValue) => ({ ...oldValue, signedIn: data }));
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, []);

  const setUser = useCallback(
    (user: AuthUser) => {
      setAuthState((oldValue) => ({ ...oldValue, user }));
    },
    [setAuthState]
  );

  return (
    <AuthContext.Provider value={{ ...authState, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
