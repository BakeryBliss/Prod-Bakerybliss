'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface BreadcrumbProps {
  className?: string;
  customBreadcrumbs?: Array<{ label: string; href: string }>;
}

interface BreadcrumbItem {
  label: string;
  href: string;
}

const Breadcrumb = ({ className = '', customBreadcrumbs }: BreadcrumbProps) => {
  const pathname = usePathname();

  const routeLabels: Record<string, string> = {
    '/home': 'Home',
    '/about-us': 'About Us',
    '/product-details': 'Products',
    '/shopping-cart': 'Shopping Cart',
    '/order-confirmation': 'Order Confirmation',
    '/customer-profile': 'My Account',
  };

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/home' }];

    let currentPath = '';
    paths.forEach((path) => {
      currentPath += `/${path}`;
      const label = routeLabels[currentPath] || path.charAt(0).toUpperCase() + path.slice(1);
      breadcrumbs.push({ label, href: currentPath });
    });

    return breadcrumbs;
  };
  
  const breadcrumbs = customBreadcrumbs && customBreadcrumbs.length > 0
    ? customBreadcrumbs
    : generateBreadcrumbs();

  if (!breadcrumbs || breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-2 text-sm ${className}`}
    >
      <ol className="flex items-center gap-2 flex-wrap">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={crumb.href} className="flex items-center gap-2">
              {index > 0 && (
                <Icon
                  name="ChevronRightIcon"
                  size={16}
                  className="text-muted-foreground"
                />
              )}
              {isLast ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-muted-foreground hover:text-primary transition-smooth focus:outline-none focus:text-primary focus:underline"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;