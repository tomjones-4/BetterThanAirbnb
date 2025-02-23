import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

interface SignOutProps {
  onSessionChange: (session: any) => void;
}

export const SignOut: React.FC<SignOutProps> = ({ onSessionChange }) => {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    onSessionChange(null);
  };

  return (
    <Button variant="outline" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};
