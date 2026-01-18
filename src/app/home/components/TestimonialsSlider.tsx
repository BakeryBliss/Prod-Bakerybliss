'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  alt: string;
  rating: number;
  comment: string;
}

interface TestimonialsSliderProps {
  className?: string;
}

const TestimonialsSlider = ({ className = '' }: TestimonialsSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Wedding Client',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a9e8814c-1763296696290.png",
    alt: 'Professional woman with brown hair smiling at camera in business attire',
    rating: 5,
    comment: 'BakeryBliss created the most stunning wedding cake for our special day. The attention to detail was incredible, and it tasted even better than it looked! Our guests are still talking about it.'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Regular Customer',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1cd09ec58-1763296862264.png",
    alt: 'Asian man with glasses smiling in casual blue shirt outdoors',
    rating: 5,
    comment: 'I stop by every morning for their fresh croissants and coffee. The quality is consistently excellent, and the staff is always friendly. Best bakery in town, hands down!'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Birthday Party Host',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b5f955b0-1763294351669.png",
    alt: 'Hispanic woman with long dark hair smiling warmly at camera',
    rating: 5,
    comment: 'Ordered a custom birthday cake for my daughter\'s party. The design was exactly what we wanted, and the cake was delicious. Everyone loved it! Will definitely order again.'
  },
  {
    id: '4',
    name: 'David Thompson',
    role: 'Corporate Client',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c9126cc7-1763293601162.png",
    alt: 'Professional man in navy suit smiling confidently in office setting',
    rating: 5,
    comment: 'We order from BakeryBliss for all our office events. Their pastries and desserts are always a hit with our team. Professional service and exceptional quality every time.'
  }];


  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className={`py-16 lg:py-24 bg-background ${className}`}>
      <div className="mx-auto px-5 lg:px-20">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-card rounded-lg shadow-warm-lg p-8 lg:p-12 border border-border">
            <div className="absolute top-8 left-8 text-primary opacity-20">
              <Icon name="ChatBubbleLeftRightIcon" size={48} variant="solid" />
            </div>

            <div className="relative space-y-6">
              <div className="flex items-center gap-1 justify-center">
                {[...Array(5)].map((_, i) =>
                <Icon
                  key={i}
                  name="StarIcon"
                  size={24}
                  variant={i < currentTestimonial.rating ? 'solid' : 'outline'}
                  className={
                  i < currentTestimonial.rating ? 'text-accent' : 'text-muted-foreground'
                  } />

                )}
              </div>

              <p className="text-xl lg:text-2xl text-foreground text-center leading-relaxed">
                "{currentTestimonial.comment}"
              </p>

              <div className="flex items-center justify-center gap-4 pt-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                  <AppImage
                    src={currentTestimonial.image}
                    alt={currentTestimonial.alt}
                    className="w-full h-full object-cover" />

                </div>
                <div className="text-left">
                  <p className="font-heading font-semibold text-lg text-foreground">
                    {currentTestimonial.name}
                  </p>
                  <p className="caption text-muted-foreground">{currentTestimonial.role}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                className="w-12 h-12 flex items-center justify-center bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-smooth focus:outline-none focus:ring-3 focus:ring-ring"
                aria-label="Previous testimonial">

                <Icon name="ChevronLeftIcon" size={24} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) =>
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-smooth ${
                  index === currentIndex ? 'bg-primary w-8' : 'bg-border hover:bg-primary/50'}`
                  }
                  aria-label={`Go to testimonial ${index + 1}`} />

                )}
              </div>
              <button
                onClick={handleNext}
                className="w-12 h-12 flex items-center justify-center bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-smooth focus:outline-none focus:ring-3 focus:ring-ring"
                aria-label="Next testimonial">

                <Icon name="ChevronRightIcon" size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default TestimonialsSlider;