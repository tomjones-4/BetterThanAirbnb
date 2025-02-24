import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

interface SignOutProps {
  onSessionChange: (session: any) => void;
  handleSignOut: () => void;
}

export const SignOut: React.FC<SignOutProps> = ({
  onSessionChange,
  handleSignOut,
}) => {
  return (
    <Button
      variant="outline"
      onClick={() => {
        handleSignOut();
        onSessionChange(null);
      }}
    >
      Sign Out
    </Button>
  );
};
