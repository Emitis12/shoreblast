
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "../lib/supabase";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async (currentUser) => {
    if (!currentUser) {
      setProfile(null);
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, role")
      .eq("id", currentUser.id)
      .single();

    if (error) {
      console.error("Profile loading error:", error.message);
      setProfile(null);
      return;
    }

    setProfile(data);
  }, []);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Session error:", error.message);
      }

      if (!mounted) return;

      const currentUser = session?.user ?? null;
      setUser(currentUser);

      await loadProfile(currentUser);

      if (mounted) setLoading(false);
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      const currentUser = session?.user ?? null;

      setUser(currentUser);

      if (event === "SIGNED_OUT") {
        setProfile(null);
        setLoading(false);
        return;
      }

      // Defer the profile request until after the auth callback.
      setTimeout(() => {
        if (mounted) {
          loadProfile(currentUser).finally(() => {
            if (mounted) setLoading(false);
          });
        }
      }, 0);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [loadProfile]);

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
  };

  const isAdmin = profile?.role === "super_admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isAdmin,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
