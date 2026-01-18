'use client';

import { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface TestimonialsSectionProps {
  className?: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  alt: string;
  rating: number;
  text: string;
  date: string;
}

const TestimonialsSection = ({ className = '' }: TestimonialsSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Jennifer Martinez',
    role: 'Wedding Client',
    image: "https://images.unsplash.com/photo-1695571712454-78a80d4570b1",
    alt: 'Smiling woman with long brown hair in elegant dress at outdoor wedding venue',
    rating: 5,
    text: 'BakeryBliss created the wedding cake of our dreams! Not only was it stunning, but every guest raved about how delicious it was. Sarah and her team were professional, creative, and made the entire process stress-free.',
    date: '2025-12-15'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Regular Customer',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17280f6a4-1763301282153.png",
    alt: 'Professional man with short dark hair in casual business attire smiling in modern office',
    rating: 5,
    text: 'I stop by every Saturday morning for their sourdough bread and croissants. The quality is consistently exceptional, and the staff always greets me with a smile. This place has become a cherished part of my weekend routine.',
    date: '2026-01-05'
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    role: 'Birthday Party Host',
    image: "https://images.unsplash.com/photo-1575300009825-05981125967f",
    alt: 'Cheerful woman with blonde hair in casual sweater holding birthday cake at home celebration',
    rating: 5,
    text: 'The custom birthday cake for my daughter\'s 5th birthday was absolutely perfect! They brought her unicorn dreams to life, and it tasted even better than it looked. Every child and parent at the party was impressed.',
    date: '2025-11-20'
  },
  {
    id: '4',
    name: 'David Thompson',
    role: 'Corporate Client',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_183fc715d-1763301362797.png",
    alt: 'Business professional man with glasses in suit smiling confidently in corporate office setting',
    rating: 5,
    text: 'We order from BakeryBliss for all our office events. Their pastry platters are always fresh, beautifully presented, and arrive exactly on time. They\'ve become our go-to for impressing clients and celebrating team milestones.',
    date: '2025-10-30'
  }];


  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className={`bg-background ${className}`}>
      <div className="mx-auto px-5 lg:px-20 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl text-foreground mb-4">
              What Our Customers Say
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground">
              Real stories from our valued customers
            </p>
          </div>

          <div className="relative">
            {/* Main Testimonial Card */}
            <div className="bg-card rounded-2xl shadow-warm-lg p-8 lg:p-12">
              <div className="flex flex-col items-center text-center">
                {/* Customer Image */}
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-6 shadow-warm-md">
                  <AppImage
                    src={currentTestimonial.image}
                    alt={currentTestimonial.alt}
                    className="w-full h-full object-cover" />

                </div>

                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, index) =>
                  <Icon
                    key={index}
                    name="StarIcon"
                    size={20}
                    variant="solid"
                    className={
                    index < currentTestimonial.rating ?
                    'text-primary' : 'text-muted'
                    } />

                  )}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-lg text-foreground leading-relaxed mb-6 max-w-2xl">
                  "{currentTestimonial.text}"
                </blockquote>

                {/* Customer Info */}
                <div>
                  <p className="font-heading text-xl text-foreground">
                    {currentTestimonial.name}
                  </p>
                  <p className="caption text-muted-foreground mt-1">
                    {currentTestimonial.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-16 w-12 h-12 bg-card rounded-full shadow-warm-md hover:shadow-warm-lg flex items-center justify-center transition-smooth focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Previous testimonial">

              <Icon name="ChevronLeftIcon" size={24} className="text-foreground" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-16 w-12 h-12 bg-card rounded-full shadow-warm-md hover:shadow-warm-lg flex items-center justify-center transition-smooth focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Next testimonial">

              <Icon name="ChevronRightIcon" size={24} className="text-foreground" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) =>
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-smooth focus:outline-none focus:ring-2 focus:ring-primary ${
                index === currentIndex ?
                'bg-primary w-8' : 'bg-muted hover:bg-primary/50'}`
                }
                aria-label={`Go to testimonial ${index + 1}`} />

              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default TestimonialsSection;