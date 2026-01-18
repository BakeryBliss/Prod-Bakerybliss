'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import ContactUsDialog from '@/components/ui/ContactUsDialog';

const FloatingContactButton = () => {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);

  return (
    <>
      {/* Floating Contact Button */}
      <button
        onClick={() => setIsContactDialogOpen(true)}
        className="fixed right-6 bottom-6 z-40 bg-primary text-primary-foreground p-4 rounded-full shadow-warm-lg hover:bg-primary/90 transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none focus:ring-4 focus:ring-ring focus:ring-offset-2 group"
        aria-label="Contact us"
      >
        <Icon
          name="ChatBubbleLeftRightIcon"
          size={24}
          className="group-hover:animate-pulse"
        />
      </button>

      {/* Contact Us Dialog */}
      <ContactUsDialog
        isOpen={isContactDialogOpen}
        onClose={() => setIsContactDialogOpen(false)}
      />
    </>
  );
};

export default FloatingContactButton;
