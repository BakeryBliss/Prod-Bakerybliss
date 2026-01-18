'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface NewsletterSignupProps {
  className?: string;
}

const NewsletterSignup = ({ className = '' }: NewsletterSignupProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitted(true);
    setEmail('');

    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section className={`py-16 lg:py-24 bg-primary ${className}`}>
      <div className="mx-auto px-5 lg:px-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary-foreground/10 rounded-full flex items-center justify-center">
              <Icon name="EnvelopeIcon" size={32} className="text-primary-foreground" />
            </div>
          </div>

          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-primary-foreground">
            Stay Updated with Our Latest Treats
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new products, special offers, and exclusive baking tips delivered straight to your inbox.
          </p>

          {isSubmitted ? (
            <div className="bg-success/20 border border-success text-success-foreground rounded-lg p-6 max-w-md mx-auto">
              <div className="flex items-center gap-3 justify-center">
                <Icon name="CheckCircleIcon" size={24} variant="solid" />
                <p className="font-medium">Thank you for subscribing!</p>
              </div>
              <p className="caption mt-2">Check your inbox for a welcome email.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-4 rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-3 focus:ring-ring"
                    aria-label="Email address"
                  />
                  {error && (
                    <p className="text-error-foreground text-sm mt-2 text-left">{error}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-8 py-4 bg-accent text-accent-foreground rounded-md font-medium hover:bg-accent/90 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
            </form>
          )}

          <div className="flex items-center justify-center gap-6 pt-4">
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <Icon name="CheckCircleIcon" size={20} />
              <span className="caption">Weekly Updates</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <Icon name="GiftIcon" size={20} />
              <span className="caption">Exclusive Offers</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <Icon name="SparklesIcon" size={20} />
              <span className="caption">Baking Tips</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;