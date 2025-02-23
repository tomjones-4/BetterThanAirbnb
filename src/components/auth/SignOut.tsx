import { supabase } from "../../lib/supabase";

const SignOut = () => {
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error: any) {
      console.error("Error signing out:", error.message);
    }
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOut;
