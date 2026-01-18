import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const NextStepsSection = () => {
  const nextSteps = [
    {
      title: 'View Order History',
      description: 'Track all your past and current orders',
      icon: 'ClipboardDocumentListIcon',
      href: '/customer-profile',
      color: 'bg-primary/10 text-primary',
    },
    {
      title: 'Continue Shopping',
      description: 'Explore more delicious treats',
      icon: 'ShoppingBagIcon',
      href: '/product-details',
      color: 'bg-accent/10 text-accent',
    },
    {
      title: 'Follow Us',
      description: 'Stay updated with new products and offers',
      icon: 'HeartIcon',
      href: '/home',
      color: 'bg-success/10 text-success',
    },
  ];

  return (
    <div className="bg-card border border-border rounded-md p-6 lg:p-8">
      <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">What's Next?</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {nextSteps.map((step) => (
          <Link
            key={step.title}
            href={step.href}
            className="flex flex-col items-center text-center p-6 bg-muted rounded-md hover:bg-primary/5 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${step.color}`}>
              <Icon name={step.icon as any} size={28} />
            </div>
            <h3 className="font-medium text-foreground mb-2">{step.title}</h3>
            <p className="caption text-muted-foreground">{step.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NextStepsSection;