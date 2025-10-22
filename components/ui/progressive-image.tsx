"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export function ProgressiveImage({
  src,
  alt,
  className = "",
  placeholder,
  width = 400,
  height = 200,
  priority = false,
  onLoad,
  onError
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder/Skeleton */}
      {!isLoaded && !hasError && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">Изображение недоступно</div>
          </div>
        </div>
      )}

      {/* Main image */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
}
