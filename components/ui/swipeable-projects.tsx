'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ProgressiveImage } from '@/components/ui/progressive-image';
import { LiveDemoBadges } from '@/components/ui/live-demo-badges';
import { TechnologyBadge } from '@/components/ui/badge';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/language-provider';

export interface Project {
  title: string;
  description: string;
  technologies?: Array<{
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    description?: string;
    projects?: number;
  }>;
  imageUrl?: string;
  href?: string;
  demoUrl?: string;
  sourceUrl?: string;
  caseStudyUrl?: string;
  caseStudyData?: any;
  caseStudyKey?: string;
  role?: string;
  duration?: string;
  teamSize?: string;
  impact?: string;
  metrics?: string[];
}

interface SwipeableProjectsProps {
  projects: Project[];
  className?: string;
}

export function SwipeableProjects({ projects, className = '' }: SwipeableProjectsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < projects.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }

    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < projects.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Desktop Grid - скрываем на мобильных */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>

      {/* Mobile Swipe Container */}
      <div
        ref={containerRef}
        className="md:hidden relative overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${projects.length * 100}%`,
          }}
        >
          {projects.map((project, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <div className="px-4">
                <ProjectCard project={project} />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-4 space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        {currentIndex > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            onClick={goToPrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}

        {currentIndex < projects.length - 1 && (
          <Button
            variant="outline"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            onClick={goToNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const { translations } = useLanguage();
  const labels = translations.projects.cardLabels;
  const {
    title,
    description,
    technologies = [],
    imageUrl,
    href,
    demoUrl,
    sourceUrl,
    caseStudyUrl,
    caseStudyData,
    role,
    duration,
    teamSize,
    impact,
    metrics,
  } = project;

  const handleProjectClick = (e: React.MouseEvent) => {
    if (caseStudyData || !href) return;
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) {
      return;
    }
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card
      className={`overflow-hidden group h-full flex flex-col card-hover border-2 transition-all duration-300 ${caseStudyData ? 'cursor-pointer' : ''}`}
      data-case-study={caseStudyData ? 'true' : 'false'}
      data-project-title={title}
      data-project-key={project.caseStudyKey}
      onClick={handleProjectClick}
    >
      <a
        href={href && !caseStudyData ? href : undefined}
        target={href && !caseStudyData ? '_blank' : undefined}
        rel={href && !caseStudyData ? 'noopener noreferrer' : undefined}
        className={
          href && !caseStudyData
            ? 'block focus:outline-none flex-shrink-0'
            : 'block focus:outline-none flex-shrink-0'
        }
      >
        <div className="aspect-video w-full overflow-hidden">
          <ProgressiveImage
            src={imageUrl || '/placeholder.svg'}
            alt={title}
            width={400}
            height={200}
            priority={true}
            className="transition-all hover:scale-105"
          />
        </div>
      </a>

      <div className="p-4 md:p-6 flex-1 flex flex-col">
        {/* Live Demo Badges - мобильная оптимизация */}
        <div className="px-0 pt-0 pb-3">
          <LiveDemoBadges demoUrl={demoUrl} sourceUrl={sourceUrl} caseStudyUrl={caseStudyUrl} />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-lg md:text-xl font-semibold mb-2 leading-tight">
            {href && !caseStudyData ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground/80 hover:border-b-2 block"
              >
                {title}
              </a>
            ) : (
              <span className="transition-colors hover:text-foreground/80 hover:border-b-2 cursor-pointer block">
                {title}
              </span>
            )}
          </h3>

          {/* Метрики проекта - мобильная оптимизация */}
          {(role || duration || teamSize) && (
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 mb-3 text-sm text-muted-foreground">
              {role && (
                <div className="flex items-center gap-1">
                  <span className="font-medium text-xs">{labels.role}:</span>
                  <Badge variant="outline" className="text-xs px-2 py-0.5">
                    {role}
                  </Badge>
                </div>
              )}
              {duration && (
                <div className="flex items-center gap-1">
                  <span className="font-medium text-xs">{labels.duration}:</span>
                  <span className="text-xs">{duration}</span>
                </div>
              )}
              {teamSize && (
                <div className="flex items-center gap-1">
                  <span className="font-medium text-xs">{labels.team}:</span>
                  <span className="text-xs">{teamSize}</span>
                </div>
              )}
            </div>
          )}

          {impact && (
            <div className="mb-3 p-2.5 md:p-3 bg-muted/50 rounded-lg">
              <p className="text-xs md:text-sm font-medium text-primary mb-1">{labels.impact}:</p>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{impact}</p>
            </div>
          )}

          {metrics && metrics.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {metrics.map((metric, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs bg-primary/10 text-primary border-primary/20 px-2 py-0.5"
                  >
                    {metric}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <p className="text-sm md:text-base text-muted-foreground mb-4 leading-relaxed flex-1">
            {description}
          </p>
        </div>

        {/* Технологии - мобильная оптимизация */}
        <div className="flex flex-wrap gap-1.5 md:gap-2 mt-auto">
          {technologies.slice(0, 6).map((tech, i) => (
            <TechnologyBadge
              key={i}
              technology={tech.name}
              level={tech.level}
              description={tech.description}
              projects={tech.projects || 1}
              variant="secondary"
            />
          ))}
          {technologies.length > 6 && (
            <Badge variant="outline" className="text-xs">
              +{technologies.length - 6}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}
