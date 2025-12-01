'use client';
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// Расширенный интерфейс для бейджей технологий с hover эффектами
export interface TechnologyBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  technology?: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  description?: string;
  projects?: number;
}

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

// Компонент для технологий с hover эффектами и уровнем экспертизы
function TechnologyBadge({
  className,
  variant = 'secondary',
  technology,
  level = 'intermediate',
  description,
  projects = 1,
  ...props
}: TechnologyBadgeProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const levelColors = {
    beginner: 'bg-green-100 text-green-800 border-green-200',
    intermediate: 'bg-blue-100 text-blue-800 border-blue-200',
    advanced: 'bg-purple-100 text-purple-800 border-purple-200',
    expert: 'bg-orange-100 text-orange-800 border-orange-200',
  };

  const levelLabels = {
    beginner: 'Начинающий',
    intermediate: 'Средний',
    advanced: 'Продвинутый',
    expert: 'Эксперт',
  };

  return (
    <div className="relative inline-block">
      <div
        className={cn(
          badgeVariants({ variant }),
          'cursor-help transition-all duration-200 hover:scale-105',
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {technology}
      </div>

      {isHovered && (description || level) && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
          <div className="bg-popover text-popover-foreground p-3 rounded-lg shadow-lg border min-w-48">
            <div className="space-y-2">
              <div className="font-medium text-sm">{technology}</div>
              {description && <div className="text-xs text-muted-foreground">{description}</div>}
              {level && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium">Уровень:</span>
                  <span className={cn('text-xs px-2 py-1 rounded-full border', levelColors[level])}>
                    {levelLabels[level]}
                  </span>
                </div>
              )}
              <div className="text-xs text-muted-foreground">
                Использовано в {projects} проект{projects > 1 ? 'ах' : 'е'}
              </div>
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-popover"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export { Badge, TechnologyBadge, badgeVariants };
