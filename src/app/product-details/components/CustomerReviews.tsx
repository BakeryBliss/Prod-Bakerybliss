'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Review {
  id: string;
  customerName: string;
  customerImage?: string | null;
  customerImageAlt?: string | null;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  helpful: number;
}

interface CustomerReviewsProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  ratingDistribution: { stars: number; count: number; percentage: number }[];
}

const CustomerReviews = ({
  reviews,
  averageRating,
  totalReviews,
  ratingDistribution,
}: CustomerReviewsProps) => {
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'helpful'>('recent');

  const filteredReviews = filterRating
    ? reviews.filter((r) => r.rating === filterRating)
    : reviews;

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'helpful') {
      return b.helpful - a.helpful;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="bg-card rounded-lg shadow-warm p-6 lg:p-8">
      <h2 className="font-heading text-2xl text-foreground mb-6">Customer Reviews</h2>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 pb-8 border-b border-border">
        {/* Average Rating */}
        <div className="flex flex-col items-center justify-center p-6 bg-background rounded-lg">
          <div className="text-5xl font-bold text-primary mb-2">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, index) => (
              <Icon
                key={index}
                name="StarIcon"
                size={24}
                variant={index < Math.floor(averageRating) ? 'solid' : 'outline'}
                className={
                  index < Math.floor(averageRating) ? 'text-warning' : 'text-muted-foreground'
                }
              />
            ))}
          </div>
          <p className="caption text-muted-foreground">Based on {totalReviews} reviews</p>
        </div>

        {/* Rating Distribution */}
        <div className="lg:col-span-2 space-y-3">
          {ratingDistribution.map((dist) => (
            <button
              key={dist.stars}
              onClick={() => setFilterRating(filterRating === dist.stars ? null : dist.stars)}
              className={`w-full flex items-center gap-3 p-3 rounded-md transition-smooth focus:outline-none focus:ring-2 focus:ring-ring ${
                filterRating === dist.stars
                  ? 'bg-primary/10 border-2 border-primary' :'bg-background hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center gap-1 min-w-[100px]">
                <span className="font-medium text-foreground">{dist.stars}</span>
                <Icon name="StarIcon" size={16} variant="solid" className="text-warning" />
              </div>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div className="flex h-full gap-0.5">
                  {Array.from({ length: 20 }).map((_, index) => (
                    <span
                      key={index}
                      className={`h-full flex-1 rounded-full ${index < Math.round(dist.percentage / 5) ? 'bg-warning' : 'bg-transparent'}`}
                    />
                  ))}
                </div>
              </div>
              <span className="caption text-muted-foreground min-w-[60px] text-right">
                {dist.count} ({dist.percentage}%)
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Sort Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-foreground font-medium">
            {filteredReviews.length} {filteredReviews.length === 1 ? 'Review' : 'Reviews'}
          </span>
          {filterRating && (
            <button
              onClick={() => setFilterRating(null)}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full caption font-medium hover:bg-primary/20 transition-smooth flex items-center gap-1"
            >
              {filterRating} stars
              <Icon name="XMarkIcon" size={14} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="caption text-muted-foreground">Sort by:</span>
          <button
            onClick={() => setSortBy('recent')}
            className={`px-4 py-2 rounded-md transition-smooth focus:outline-none focus:ring-2 focus:ring-ring ${
              sortBy === 'recent' ?'bg-primary text-primary-foreground' :'bg-background text-foreground hover:bg-muted'
            }`}
          >
            Most Recent
          </button>
          <button
            onClick={() => setSortBy('helpful')}
            className={`px-4 py-2 rounded-md transition-smooth focus:outline-none focus:ring-2 focus:ring-ring ${
              sortBy === 'helpful' ?'bg-primary text-primary-foreground' :'bg-background text-foreground hover:bg-muted'
            }`}
          >
            Most Helpful
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <div key={review.id} className="p-6 bg-background rounded-lg">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-muted flex items-center justify-center">
                {review.customerImage ? (
                  <AppImage
                    src={review.customerImage}
                    alt={review.customerImageAlt || review.customerName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Icon name="UserCircleIcon" size={32} className="text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-foreground">{review.customerName}</span>
                  {review.verified && (
                    <span className="px-2 py-0.5 bg-success/10 text-success rounded caption font-medium flex items-center gap-1">
                      <Icon name="CheckBadgeIcon" size={14} />
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <Icon
                        key={index}
                        name="StarIcon"
                        size={16}
                        variant={index < review.rating ? 'solid' : 'outline'}
                        className={
                          index < review.rating ? 'text-warning' : 'text-muted-foreground'
                        }
                      />
                    ))}
                  </div>
                  <span className="caption text-muted-foreground">{review.date}</span>
                </div>
              </div>
            </div>
            <p className="text-foreground leading-relaxed mb-4">{review.comment}</p>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-smooth focus:outline-none">
                <Icon name="HandThumbUpIcon" size={18} />
                <span className="caption">Helpful ({review.helpful})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;