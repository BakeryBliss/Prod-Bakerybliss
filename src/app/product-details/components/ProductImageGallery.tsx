'use client';

import { useEffect, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

interface ProductImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setSelectedImageIndex(0);
    setIsZoomed(false);
  }, [images, productName]);

  const handlePrevious = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative bg-card rounded-lg overflow-hidden shadow-warm-md aspect-square">
        <AppImage
          src={images[selectedImageIndex].url}
          alt={images[selectedImageIndex].alt}
          className={`w-full h-full object-cover transition-smooth ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/90 hover:bg-background rounded-full flex items-center justify-center shadow-warm transition-smooth focus:outline-none focus:ring-3 focus:ring-ring"
              aria-label="Previous image"
            >
              <Icon name="ChevronLeftIcon" size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/90 hover:bg-background rounded-full flex items-center justify-center shadow-warm transition-smooth focus:outline-none focus:ring-3 focus:ring-ring"
              aria-label="Next image"
            >
              <Icon name="ChevronRightIcon" size={24} />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-background/90 rounded-full caption font-medium">
          {selectedImageIndex + 1} / {images.length}
        </div>

        {/* Zoom Indicator */}
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-background/90 rounded-full caption font-medium flex items-center gap-2">
          <Icon name={isZoomed ? 'MagnifyingGlassMinusIcon' : 'MagnifyingGlassPlusIcon'} size={16} />
          {isZoomed ? 'Zoom Out' : 'Zoom In'}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto scrollbar-warm pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring ${
                index === selectedImageIndex
                  ? 'border-primary shadow-warm'
                  : 'border-border hover:border-primary/50'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <AppImage
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;