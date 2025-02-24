import { useState } from "react";
import { Home, Search, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignOut } from "@/components/auth/SignOut";
import { useAuth } from "@/hooks/useAuth";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const { session, handleSignIn, handleSignOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-xl font-semibold">
              Better Than Airbnb
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Home size={20} />
              <span>Home</span>
            </a>
            <a
              href="/search"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Search size={20} />
              <span>Search</span>
            </a>
            {session ? (
              <>
                <span>{session?.user?.email}</span>
                <SignOut />
              </>
            ) : (
              <Button variant="default" onClick={handleSignIn}>
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 animate-fade-down">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <a
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Home size={20} />
              <span>Home</span>
            </a>
            <a
              href="/search"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Search size={20} />
              <span>Search</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
