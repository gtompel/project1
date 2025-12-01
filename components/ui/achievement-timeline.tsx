import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Award, TrendingUp } from 'lucide-react';

export interface Achievement {
  year: string;
  title: string;
  company?: string;
  description: string;
  achievements: string[];
  quantifiedAchievements?: string[]; // Конкретные количественные достижения
  technologies?: string[];
  type: 'job' | 'project' | 'certification' | 'promotion';
}

export interface AchievementTimelineProps {
  achievements: Achievement[];
  className?: string;
}

export function AchievementTimeline({ achievements, className = '' }: AchievementTimelineProps) {
  const getIcon = (type: Achievement['type']) => {
    switch (type) {
      case 'job':
        return <MapPin className="h-4 w-4" />;
      case 'project':
        return <Award className="h-4 w-4" />;
      case 'certification':
        return <Award className="h-4 w-4" />;
      case 'promotion':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: Achievement['type']) => {
    switch (type) {
      case 'job':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'project':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'certification':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'promotion':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Timeline line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-px"></div>

      <div className="space-y-8">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className={`relative flex items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
          >
            {/* Timeline dot */}
            <div
              className={`absolute left-4 md:left-1/2 w-3 h-3 rounded-full border-2 border-background transform -translate-x-1.5 mt-2 ${getTypeColor(achievement.type).replace('text-', 'bg-').replace('border-', 'border-')}`}
            ></div>

            {/* Content */}
            <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getIcon(achievement.type)}
                      <Badge
                        variant="outline"
                        className={`text-xs ${getTypeColor(achievement.type)}`}
                      >
                        {achievement.year}
                      </Badge>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {achievement.type}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-semibold mb-1">{achievement.title}</h3>
                  {achievement.company && (
                    <p className="text-sm text-muted-foreground mb-2">{achievement.company}</p>
                  )}

                  <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>

                  {achievement.achievements.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Ключевые достижения:</h4>
                      <ul className="space-y-1">
                        {achievement.achievements.map((ach, i) => (
                          <li
                            key={i}
                            className="text-sm text-muted-foreground flex items-start gap-2"
                          >
                            <span className="text-primary mt-1">•</span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {achievement.quantifiedAchievements &&
                    achievement.quantifiedAchievements.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2 text-primary">
                          Количественные показатели:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {achievement.quantifiedAchievements.map((metric, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="text-xs bg-primary/10 text-primary border-primary/20"
                            >
                              {metric}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                  {achievement.technologies && achievement.technologies.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Технологии:</h4>
                      <div className="flex flex-wrap gap-1">
                        {achievement.technologies.map((tech, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
