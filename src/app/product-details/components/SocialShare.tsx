'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SocialShareProps {
  productName: string;
  productUrl: string;
}

const SocialShare = ({ productName, productUrl }: SocialShareProps) => {
  const [showCopied, setShowCopied] = useState(false);

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: 'ChatBubbleLeftRightIcon',
      color: 'hover:text-[#25D366]',
      url: `https://wa.me/?text=${encodeURIComponent(`${productName} - ${productUrl}`)}`,
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="bg-card rounded-lg shadow-warm p-6">
      <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
        <Icon name="ShareIcon" size={20} className="text-primary" />
        Share This Product
      </h3>
      <div className="flex items-center gap-3 flex-wrap">
        {shareLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => handleShare(link.url)}
            className={`w-12 h-12 flex items-center justify-center bg-background border border-border rounded-md transition-smooth focus:outline-none focus:ring-2 focus:ring-ring ${link.color}`}
            aria-label={`Share on ${link.name}`}
          >
            <Icon name={link.icon as any} size={20} />
          </button>
        ))}
        <div className="relative">
          <button
            onClick={handleCopyLink}
            className="w-12 h-12 flex items-center justify-center bg-background border border-border rounded-md hover:text-primary transition-smooth focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Copy link"
          >
            <Icon name="LinkIcon" size={20} />
          </button>
          {showCopied && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-success text-success-foreground rounded caption font-medium whitespace-nowrap animate-slide-in-from-top">
              Link copied!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialShare;