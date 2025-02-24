import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export const SignOut: React.FC = () => {
  const { handleSignOut } = useAuth();
  return (
    <Button variant="outline" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};
