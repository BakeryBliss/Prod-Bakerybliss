'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
// import CartIndicator from '@/components/common/CartIndicator';
import UserAccountMenu from '@/components/common/UserAccountMenu';
import SearchBar from '@/components/common/SearchBar';

interface HeaderProps {
  className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navigationItems = [
    { label: 'Home', href: '/home', icon: 'HomeIcon' },
    { label: 'Products', href: '/products', icon: 'ShoppingBagIcon' },
    { label: 'About', href: '/about-us', icon: 'InformationCircleIcon' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-navigation bg-card transition-smooth ${
        isScrolled ? 'shadow-warm-md' : 'shadow-warm-sm'
      } ${className}`}
    >
      <div className="mx-auto px-5 lg:px-20">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link
            href="/home"
            className="flex items-center gap-3 transition-smooth hover:opacity-80 focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 rounded-md"
          >
            <div className="relative w-12 h-12 lg:w-14 lg:h-14">
              <svg
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <circle cx="28" cy="28" r="28" fill="var(--color-primary)" />
                <path
                  d="M28 12C28 12 20 16 20 24C20 28 22 30 24 32C26 34 28 36 28 40C28 36 30 34 32 32C34 30 36 28 36 24C36 16 28 12 28 12Z"
                  fill="var(--color-background)"
                />
                <ellipse cx="28" cy="42" rx="8" ry="3" fill="var(--color-accent)" />
                <path
                  d="M24 26C24 26 25 24 28 24C31 24 32 26 32 26"
                  stroke="var(--color-primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-semibold text-xl lg:text-2xl text-primary">
                BakeryBliss
              </span>
              <span className="caption text-muted-foreground text-xs hidden sm:block">
                Artisan Baked Goods
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-smooth font-medium ${
                  isActive(item.href)
                    ? 'text-primary bg-primary/10' :'text-foreground hover:text-primary hover:bg-primary/5'
                } focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2`}
              >
                <Icon name={item.icon as any} size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Desktop Search */}
            <div className="hidden lg:block">
              <SearchBar />
            </div>

            {/* Cart Indicator */}
            {/* <CartIndicator /> */}

            {/* User Account Menu */}
            <UserAccountMenu />


            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-foreground hover:bg-primary/10 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-20 bg-card z-navigation lg:hidden animate-slide-in-from-top">
          <div className="flex flex-col h-full overflow-y-auto scrollbar-warm">
            {/* Mobile Search */}
            <div className="p-5 border-b border-border">
              <SearchBar />
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col p-5 gap-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-4 rounded-md transition-smooth font-medium ${
                    isActive(item.href)
                      ? 'text-primary bg-primary/10' :'text-foreground hover:text-primary hover:bg-primary/5'
                  } focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2`}
                >
                  <Icon name={item.icon as any} size={24} />
                  <span className="text-lg">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

    </header>
  );
};

export default Header;