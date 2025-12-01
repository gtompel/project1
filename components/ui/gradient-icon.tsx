'use client';
import React from 'react';
import { cn } from '@/lib/utils';

interface GradientIconProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number; // внешний размер круга в px
  padding?: number; // внутренний паддинг для иконки
  rounded?: 'full' | 'lg';
}

export function GradientIcon({
  children,
  className,
  size = 48,
  padding = 8,
  rounded = 'full',
  ...props
}: GradientIconProps) {
  const roundedClass = rounded === 'full' ? 'rounded-full' : 'rounded-lg';
  const outerStyle: React.CSSProperties = {
    width: size,
    height: size,
  };
  return (
    <div
      className={cn(
        'inline-block bg-gradient-to-r from-primary to-primary/60 p-[2px]',
        roundedClass,
        className,
      )}
      style={outerStyle}
      {...props}
    >
      <div
        className={cn('bg-background w-full h-full flex items-center justify-center', roundedClass)}
        style={{ padding }}
      >
        {children}
      </div>
    </div>
  );
}
