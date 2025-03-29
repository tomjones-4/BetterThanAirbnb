import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Search, MessageSquare, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignOut } from "@/components/auth/SignOut";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Messages } from "./Messages";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import AddListingDialog from "./AddListingDialog";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const { session, handleSignIn, handleSignOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-semibold">
              Better Than Airbnb
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link
              to="/search"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Search size={20} />
              <span>Search</span>
            </Link>
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      1
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Dialog
                    open={isMessagesOpen}
                    onOpenChange={setIsMessagesOpen}
                  >
                    <DialogTrigger asChild>
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Messages</span>
                        <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                          1
                        </span>
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <Messages onClose={() => setIsMessagesOpen(false)} />
                    </DialogContent>
                  </Dialog>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={handleSignOut}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="default" onClick={handleSignIn}>
                Sign In
              </Button>
            )}
            <AddListingDialog />
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
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link
              to="/search"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Search size={20} />
              <span>Search</span>
            </Link>
            {session && (
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setIsMessagesOpen(true)}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Messages</span>
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  1
                </span>
              </Button>
            )}
            <Link
              to="/changelog"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <span>Changelog</span>
            </Link>
          </div>
        </div>
      )}

      {/* Mobile Messages Dialog */}
      <Dialog open={isMessagesOpen} onOpenChange={setIsMessagesOpen}>
        <DialogContent className="max-w-md">
          <Messages onClose={() => setIsMessagesOpen(false)} />
        </DialogContent>
      </Dialog>
    </nav>
  );
};
