import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export const useAuth = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:8080",
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return {
    session,
    handleSignIn,
    handleSignOut,
  };
};
