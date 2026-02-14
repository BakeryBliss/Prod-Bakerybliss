'use client';

import { useState } from 'react';
import Icon from './AppIcon';

interface UserAvatarProps {
  src?: string | null;
  alt?: string;
  size?: number;
  className?: string;
  showFallback?: boolean;
  borderClassName?: string;
}

const UserAvatar = ({ 
  src, 
  alt = 'User avatar', 
  size = 32, 
  className = '',
  showFallback = true,
  borderClassName = 'border-2 border-primary/20'
}: UserAvatarProps) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // If no src provided or image failed to load, show fallback
  if (!src || imageError) {
    if (!showFallback) return null;
    
    return (
      <div 
        className={`inline-flex items-center justify-center bg-primary/10 text-primary rounded-full ${borderClassName} ${className}`}
        style={{ width: size, height: size }}
      >
        <Icon 
          name="UserIcon" 
          size={Math.floor(size * 0.6)} 
        />
      </div>
    );
  }

  return (
    <div className={`relative inline-block ${className}`}>
      {isLoading && (
        <div 
          className={`absolute inset-0 bg-muted animate-pulse rounded-full ${borderClassName}`}
          style={{ width: size, height: size }}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={`rounded-full object-cover ${borderClassName} transition-opacity ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ width: size, height: size }}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading="lazy"
      />
    </div>
  );
};

export default UserAvatar;