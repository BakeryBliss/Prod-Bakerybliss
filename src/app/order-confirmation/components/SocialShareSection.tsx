'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SocialShareSectionProps {
  orderNumber: string;
}

const SocialShareSection = ({ orderNumber }: SocialShareSectionProps) => {
  const [copied, setCopied] = useState(false);

  const shareMessage = `Just ordered delicious treats from BakeryBliss! Order #${orderNumber} 🍰✨`;
  const shareUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${shareUrl}/order-confirmation?order=${orderNumber}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: 'ShareIcon',
      color: 'bg-[#1877F2] hover:bg-[#1877F2]/90',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Twitter',
      icon: 'ChatBubbleLeftRightIcon',
      color: 'bg-[#1DA1F2] hover:bg-[#1DA1F2]/90',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'WhatsApp',
      icon: 'ChatBubbleOvalLeftEllipsisIcon',
      color: 'bg-[#25D366] hover:bg-[#25D366]/90',
      url: `https://wa.me/?text=${encodeURIComponent(shareMessage + ' ' + shareUrl)}`,
    },
  ];

  return (
    <div className="bg-card border border-border rounded-md p-6 lg:p-8">
      <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">Share Your Order</h2>
      <p className="text-muted-foreground mb-6">
        Excited about your treats? Share the joy with friends and family!
      </p>

      <div className="flex flex-wrap gap-3">
        {socialPlatforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-3 text-white rounded-md font-medium transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 ${platform.color}`}
          >
            <Icon name={platform.icon as any} size={20} />
            <span>{platform.name}</span>
          </a>
        ))}

        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 px-4 py-3 bg-muted text-foreground rounded-md font-medium hover:bg-primary/10 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
        >
          <Icon name={copied ? 'CheckIcon' : 'LinkIcon'} size={20} />
          <span>{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>
      </div>
    </div>
  );
};

export default SocialShareSection;