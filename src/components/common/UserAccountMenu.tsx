'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import LoginRegisterDialog from '@/components/ui/LoginRegisterDialog';
import { useAuth } from '@/hooks/useAuth';

interface UserAccountMenuProps {
  className?: string;
}

const UserAccountMenu = ({ className = '' }: UserAccountMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isLoggedIn, isLoading, logout } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  const menuItems = isLoggedIn
    ? [
        { label: 'My Profile', href: '/customer-profile', icon: 'UserIcon' },
        // { label: 'Order History', href: '/order-confirmation', icon: 'ClipboardDocumentListIcon' },
      ]
    : [];

  return (
    <div ref={menuRef} className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md text-foreground hover:bg-primary/10 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
        aria-label="User account menu"
        aria-expanded={isOpen ? 'true' : 'false'}
        aria-haspopup="true"
      >
        <Icon name="UserCircleIcon" size={24} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-popover rounded-md shadow-warm-lg border border-border overflow-hidden animate-slide-in-from-top z-dropdown">
          {isLoggedIn ? (
            <>
              <div className="p-4 border-b border-border">
                <p className="font-medium text-popover-foreground">Welcome back!</p>
                <p className="caption text-muted-foreground mt-1">Manage your account</p>
              </div>
              <nav className="py-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-popover-foreground hover:bg-primary/10 transition-smooth focus:outline-none focus:bg-primary/10"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon name={item.icon as any} size={20} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
              <div className="border-t border-border p-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-md transition-smooth focus:outline-none focus:ring-2 focus:ring-destructive"
                >
                  <Icon name="ArrowRightOnRectangleIcon" size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            <div className="p-4">
              <p className="font-medium text-popover-foreground mb-3">Welcome to BakeryBliss</p>
              <button
                onClick={() => {
                  setIsDialogOpen(true);
                  setIsOpen(false);
                }}
                className="block w-full px-4 py-3 bg-primary text-primary-foreground text-center rounded-md font-medium hover:bg-primary/90 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
              >
                Sign In / Register
              </button>
              <p className="caption text-muted-foreground mt-3 text-center">
                Access your orders and profile
              </p>
            </div>
          )}
        </div>
      )}

      <LoginRegisterDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  );
};

export default UserAccountMenu;