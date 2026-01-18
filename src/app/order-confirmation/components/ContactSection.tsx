'use client';

import Icon from '@/components/ui/AppIcon';

interface ContactSectionProps {
  phone: string;
  email: string;
}

const ContactSection = ({ phone, email }: ContactSectionProps) => {
  return (
    <div className="bg-card border border-border rounded-md p-6 lg:p-8">
      <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">Need Help?</h2>
      <p className="text-muted-foreground mb-6">
        Have questions about your order? Our team is here to help!
      </p>

      <div className="space-y-4">
        <a
          href={`tel:${phone}`}
          className="flex items-center gap-4 p-4 bg-muted rounded-md hover:bg-primary/10 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
        >
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="PhoneIcon" size={24} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground mb-1">Call Us</p>
            <p className="text-muted-foreground">{phone}</p>
          </div>
          <Icon name="ChevronRightIcon" size={20} className="text-muted-foreground flex-shrink-0" />
        </a>

        <a
          href={`mailto:${email}`}
          className="flex items-center gap-4 p-4 bg-muted rounded-md hover:bg-primary/10 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
        >
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="EnvelopeIcon" size={24} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground mb-1">Email Us</p>
            <p className="text-muted-foreground break-all">{email}</p>
          </div>
          <Icon name="ChevronRightIcon" size={20} className="text-muted-foreground flex-shrink-0" />
        </a>
      </div>
    </div>
  );
};

export default ContactSection;