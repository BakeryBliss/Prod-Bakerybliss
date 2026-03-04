import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/ui/AppIcon';

interface FooterProps {
  className?: string;
}

const Footer = ({ className = '' }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { label: 'All Products', href: '/products' },
      { label: 'Cakes', href: '/products?category=cakes' },
      { label: 'Pastries', href: '/products?category=pastries' },
      { label: 'Breads', href: '/products?category=breads' },
    ],
    company: [
      { label: 'About Us', href: '/about-us' },
      // { label: 'Our Story', href: '/about-us#story' },
      // { label: 'Careers', href: '/about-us#careers' },
      // { label: 'Contact', href: '/about-us#contact' },
    ],
    // support: [
    //   { label: 'My Account', href: '/customer-profile' },
    //   { label: 'Order History', href: '/order-confirmation' },
    //   { label: 'Shopping Cart', href: '/shopping-cart' },
    //   { label: 'FAQs', href: '/about-us#faq' },
    // ],
    // legal: [
    //   { label: 'Privacy Policy', href: '/privacy-policy' },
    //   { label: 'Terms & Conditions', href: '/terms-conditions' },
    //   { label: 'Cookie Policy', href: '/cookie-policy' },
    //   { label: 'Refund Policy', href: '/refund-policy' },
    // ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: 'ShareIcon', href: 'https://facebook.com/bakerybliss' },
    { name: 'Instagram', icon: 'CameraIcon', href: 'https://instagram.com/bakerybliss' },
    { name: 'Twitter', icon: 'ChatBubbleLeftRightIcon', href: 'https://twitter.com/bakerybliss' },
    { name: 'Pinterest', icon: 'PhotoIcon', href: 'https://pinterest.com/bakerybliss' },
  ];

  return (
    <footer className={`bg-card border-t border-border ${className}`}>
      <div className="mx-auto px-5 lg:px-20 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12">
                <Image
                  src="/assets/images/logo.png"
                  alt="Bliss Bakery Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-semibold text-xl text-primary">
                  Bliss Bakery
                </span>
                <span className="caption text-muted-foreground text-xs">
                  Est. 2026
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              Crafting delicious memories since 2025. We use only the finest ingredients to create baked goods that bring joy to every occasion.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-smooth focus:outline-none focus:ring-3 focus:ring-ring"
                  aria-label={social.name}
                >
                  <Icon name={social.icon as any} size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-smooth focus:outline-none focus:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-smooth focus:outline-none focus:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-smooth focus:outline-none focus:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-smooth focus:outline-none focus:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="caption text-muted-foreground text-center md:text-left">
              &copy; {currentYear} BakeryBliss. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon name="ShieldCheckIcon" size={20} />
                <span className="caption">Secure Payments</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon name="TruckIcon" size={20} />
                <span className="caption">Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;