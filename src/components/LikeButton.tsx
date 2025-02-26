
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface LikeButtonProps {
  className?: string;
  onClick?: () => void;
}

export const LikeButton = ({ className = "", onClick }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    onClick?.();
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`hover:scale-110 transition-transform ${className}`}
      onClick={handleClick}
    >
      <Heart className={`h-6 w-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
    </Button>
  );
};
