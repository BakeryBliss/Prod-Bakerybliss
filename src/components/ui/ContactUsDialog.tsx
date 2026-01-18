'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ContactUsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactUsDialog = ({ isOpen, onClose }: ContactUsDialogProps) => {
  const [query, setQuery] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [requestCallback, setRequestCallback] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [phoneError, setPhoneError] = useState<string>('');

  // Phone number validation function for Indian numbers
  const validatePhoneNumber = (phone: string): boolean => {
    // Remove all spaces, hyphens, and other non-digit characters except +
    const cleanPhone = phone.replace(/[^\d+]/g, '');


    const indianPhoneRegex = /^(\+91|91)?[6-9]\d{9}$/;

    if (!indianPhoneRegex.test(cleanPhone)) {
      setPhoneError('Please enter a valid 10-digit Indian mobile number');
      return false;
    }

    setPhoneError('');
    return true;
  };

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
    // Clear error when user starts typing
    if (phoneError) {
      setPhoneError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    // Validate phone number if callback is requested
    if (requestCallback && !validatePhoneNumber(phoneNumber.trim())) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query.trim(),
          phoneNumber: phoneNumber.trim(),
          requestCallback,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success
        setSubmitMessage({ type: 'success', text: data.message });

        // Reset form after a short delay
        setTimeout(() => {
          setQuery('');
          setPhoneNumber('');
          setRequestCallback(false);
          setSubmitMessage(null);
          onClose();
        }, 2000);
      } else {
        // Error
        setSubmitMessage({ type: 'error', text: data.error || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitMessage({ type: 'error', text: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-warm-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Contact Us
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-primary/10 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
            aria-label="Close dialog"
          >
            <Icon name="XMarkIcon" size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="query" className="block text-sm font-medium text-foreground mb-2">
              Your Query *
            </label>
            <textarea
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Please describe your question or concern..."
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-3 focus:ring-ring focus:border-primary resize-none"
              rows={4}
              required
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="callback"
                checked={requestCallback}
                onChange={(e) => setRequestCallback(e.target.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-ring focus:ring-2"
              />
              <label htmlFor="callback" className="text-sm font-medium text-foreground">
                Request a callback
              </label>
            </div>

            {requestCallback && (
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="Enter your 10-digit mobile number (e.g., 9876543210)"
                  className={`w-full px-3 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-3 focus:ring-ring focus:border-primary ${
                    phoneError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border'
                  }`}
                  required={requestCallback}
                />
                {phoneError && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <Icon name="ExclamationCircleIcon" size={14} />
                    {phoneError}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-md">
            <p className="font-medium mb-1">Note:</p>
            <p>We do not accept orders through this contact form. For custom orders or inquiries, please reach out to us directly.</p>
          </div>

          {/* Submit Message */}
          {submitMessage && (
            <div className={`p-3 rounded-md text-sm ${
              submitMessage.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              <div className="flex items-center gap-2">
                <Icon
                  name={submitMessage.type === 'success' ? 'CheckCircleIcon' : 'ExclamationTriangleIcon'}
                  size={16}
                  className={submitMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}
                />
                <span>{submitMessage.text}</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border rounded-md text-foreground hover:bg-muted transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !query.trim()}
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
            >
              {isSubmitting ? 'Sending...' : 'Send Query'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUsDialog;
