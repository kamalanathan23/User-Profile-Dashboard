import { Github, Search, User } from "lucide-react";
import { Button } from "./ui/button";

const cartIcon = new URL("../assets/cart.png", import.meta.url).toString();

interface HeaderProps {
  onCartClick?: () => void;
  onProfileClick?: () => void;
  cartItemCount?: number;
}

export function Header({
  onCartClick,
  onProfileClick,
  cartItemCount = 3,
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-medium tracking-wider">
              <a
                href="https://github.com/kamalanathan23"
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer inline-flex items-center gap-2"
                aria-label="GitHub"
              >
                <Github className="w-7 h-7 text-gray-900" aria-hidden="true" />
                <span className="font-bold text-gray-900">GitHub</span>
              </a>
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm text-gray-900 hover:text-gray-600 transition-colors cursor-pointer">New Arrivals</a>
            <a href="#" className="text-sm text-gray-900 hover:text-gray-600 transition-colors cursor-pointer">Women</a>
            <a href="#" className="text-sm text-gray-900 hover:text-gray-600 transition-colors cursor-pointer">Men</a>
            <a href="#" className="text-sm text-gray-900 hover:text-gray-600 transition-colors cursor-pointer">Collections</a>
            <a href="#" className="text-sm text-gray-900 hover:text-gray-600 transition-colors cursor-pointer">Sale</a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="p-2 cursor-pointer">
              <Search className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 cursor-pointer"
              onClick={onProfileClick}
            >
              <User className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="p-2 relative cursor-pointer"
              onClick={onCartClick}
            >
              <img 
                src={cartIcon}
                alt="Shopping cart" 
                className="w-5 h-5" 
              />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}