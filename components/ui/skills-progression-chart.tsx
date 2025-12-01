'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Calendar, Star } from 'lucide-react';

interface SkillProgression {
  skill: string;
  level: number; // 1-10
  year: string;
  description: string;
}

interface SkillsProgressionChartProps {
  className?: string;
}

export function SkillsProgressionChart({ className = '' }: SkillsProgressionChartProps) {
  const skillProgression: SkillProgression[] = [
    {
      skill: 'JavaScript',
      level: 9,
      year: '2018',
      description: 'Базовое знание, работа с DOM',
    },
    {
      skill: 'React',
      level: 8,
      year: '2019',
      description: 'Создание компонентов, state management',
    },
    {
      skill: 'Node.js',
      level: 7,
      year: '2020',
      description: 'Backend API, Express, базы данных',
    },
    {
      skill: 'TypeScript',
      level: 8,
      year: '2021',
      description: 'Типизация, продвинутые возможности',
    },
    {
      skill: 'Next.js',
      level: 9,
      year: '2022',
      description: 'SSR, App Router, оптимизация',
    },
    {
      skill: 'Docker',
      level: 7,
      year: '2022',
      description: 'Контейнеризация, DevOps практики',
    },
    {
      skill: 'PostgreSQL',
      level: 8,
      year: '2023',
      description: 'Сложные запросы, оптимизация',
    },
    {
      skill: 'Nest.js',
      level: 8,
      year: '2023',
      description: 'Enterprise backend, микросервисы',
    },
  ];

  // Группируем навыки по годам
  const skillsByYear = skillProgression.reduce(
    (acc, skill) => {
      if (!acc[skill.year]) {
        acc[skill.year] = [];
      }
      acc[skill.year].push(skill);
      return acc;
    },
    {} as Record<string, SkillProgression[]>,
  );

  const getLevelLabel = (level: number) => {
    if (level >= 9) return 'Эксперт';
    if (level >= 7) return 'Продвинутый';
    if (level >= 5) return 'Средний';
    return 'Начинающий';
  };

  const getLevelColor = (level: number) => {
    if (level >= 9) return 'bg-green-500';
    if (level >= 7) return 'bg-blue-500';
    if (level >= 5) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Рост навыков со временем
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(skillsByYear)
            .sort(([a], [b]) => parseInt(a) - parseInt(b))
            .map(([year, skills]) => (
              <div key={year} className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-semibold">{year} год</h3>
                  <Badge variant="outline" className="ml-auto">
                    {skills.length} навыков
                  </Badge>
                </div>

                <div className="grid gap-3">
                  {skills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{skill.skill}</span>
                          <Badge variant="secondary" className="text-xs">
                            {getLevelLabel(skill.level)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{skill.level}/10</span>
                          <div
                            className={`w-3 h-3 rounded-full ${getLevelColor(skill.level)}`}
                          ></div>
                        </div>
                      </div>

                      <Progress value={skill.level * 10} className="h-2" />

                      <p className="text-xs text-muted-foreground">{skill.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          {/* Итоговые показатели */}
          <div className="pt-4 border-t">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{skillProgression.length}</div>
                <div className="text-sm text-muted-foreground">Навыков освоено</div>
              </div>

              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {Math.round(
                    skillProgression.reduce((sum, skill) => sum + skill.level, 0) /
                      skillProgression.length,
                  )}
                  /10
                </div>
                <div className="text-sm text-muted-foreground">Средний уровень</div>
              </div>

              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {skillProgression.filter((skill) => skill.level >= 8).length}
                </div>
                <div className="text-sm text-muted-foreground">Экспертных навыков</div>
              </div>

              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {new Set(skillProgression.map((skill) => skill.year)).size}
                </div>
                <div className="text-sm text-muted-foreground">Лет опыта</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
