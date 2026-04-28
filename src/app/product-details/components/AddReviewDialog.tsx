'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/hooks/useAuth';
import { addReview } from '@/services/reviews';
import type { Review } from '@/types/database';

interface AddReviewDialogProps {
  productId: string;
  isOpen: boolean;
  onClose: () => void;
  onReviewAdded: () => void;
}

const AddReviewDialog = ({ productId, isOpen, onClose, onReviewAdded }: AddReviewDialogProps) => {
  const { user, isLoggedIn } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!user?.id) {
      setErrorMessage('Please log in to add a review');
      return;
    }

    if (!comment.trim()) {
      setErrorMessage('Please write a comment');
      return;
    }

    if (comment.trim().length < 10) {
      setErrorMessage('Comment must be at least 10 characters');
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData: Partial<Review> = {
        product_id: productId,
        profile_id: user.id,
        rating,
        comment: comment.trim(),
        created_at: new Date().toISOString(),
      };

      const result = await addReview(reviewData);

      if (result) {
        setComment('');
        setRating(5);
        onReviewAdded();
        onClose();
      } else {
        setErrorMessage('Failed to add review. Please try again.');
      }
    } catch (error) {
      console.error('Error adding review:', error);
      setErrorMessage('An error occurred while adding your review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onClose();
        }}
        aria-label="Close dialog"
      />

      {/* Dialog */}
      <div className="relative bg-card rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <h3 className="font-heading text-xl text-foreground">Add a Review</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-md transition-smooth focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Close"
          >
            <Icon name="XMarkIcon" size={24} className="text-foreground" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {!isLoggedIn ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <Icon name="UserCircleIcon" size={48} className="text-muted-foreground" />
              <p className="text-center text-foreground font-medium">Please log in to add a review</p>
              <p className="text-center caption text-muted-foreground">
                You need to be logged in to share your experience with this product.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-smooth focus:outline-none focus:ring-2 focus:ring-ring"
              >
                Log In
              </button>
            </div>
          ) : (
            <>
              {/* Rating Selection */}
              <div className="space-y-3">
                <label className="block text-foreground font-medium">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 transition-smooth focus:outline-none focus:ring-2 focus:ring-ring rounded-md"
                      aria-label={`Rate ${star} stars`}
                    >
                      <Icon
                        name="StarIcon"
                        size={32}
                        variant={star <= rating ? 'solid' : 'outline'}
                        className={
                          star <= rating ? 'text-warning' : 'text-muted-foreground hover:text-warning'
                        }
                      />
                    </button>
                  ))}
                </div>
                <p className="caption text-muted-foreground">{rating} out of 5 stars</p>
              </div>

              {/* Comment */}
              <div className="space-y-3">
                <label htmlFor="review-comment" className="block text-foreground font-medium">
                  Your Review
                </label>
                <textarea
                  id="review-comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience with this product... (minimum 10 characters)"
                  className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  rows={5}
                  disabled={isSubmitting}
                />
                <p className="caption text-muted-foreground">
                  {comment.length} characters
                </p>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="p-3 bg-destructive/10 border border-destructive text-destructive rounded-md flex items-start gap-2">
                  <Icon name="ExclamationTriangleIcon" size={18} className="mt-0.5 flex-shrink-0" />
                  <span className="caption">{errorMessage}</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-muted text-foreground rounded-md font-medium hover:bg-muted/80 transition-smooth focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !comment.trim()}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-smooth focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Icon name="CheckIcon" size={18} />
                      Submit Review
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddReviewDialog;
