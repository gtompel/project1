"use client";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, TrendingUp, Users, Zap, Shield, Database, Workflow, BarChart3, Clock, Target, Award } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  caseStudyData: {
    title: string;
    goal: string;
    context: {
      role: string;
      duration: string;
      team: string;
      technologies: string[];
    };
    achievements: string[];
    architecture: {
      frontend: string;
      styling: string;
      database: string;
      backend: string;
      integrations: string;
      access: string;
      monitoring: string;
    };
    modules: {
      monitoring: string[];
      reporting: string[];
      access: string[];
      automation: string[];
      integrations: string[];
      performance: string[];
    };
    technical: {
      architecture: string;
      development: string;
      security: string;
      testing: string;
      performance: string;
      documentation: string;
    };
    results: {
      efficiency: string;
      response: string;
      processes: string;
      integrations: string;
      requests: string;
      system: string;
    };
    scenarios: {
      operator: string[];
      admin: string[];
      manager: string[];
    };
    improvements: string[];
    presentation: string[];
  };
}

export function CaseStudyModal({ isOpen, onClose, projectName, caseStudyData }: CaseStudyModalProps) {
  // Проверяем, что caseStudyData существует
  if (!caseStudyData) {
    return null;
  }

  const { translations } = useLanguage();
  const dict = translations.caseStudyModal;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center mb-4">
            {caseStudyData.title}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            {dict.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          {/* Цель проекта */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                {dict.goalTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">{caseStudyData.goal}</p>
            </CardContent>
          </Card>

          {/* Контекст */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                {dict.contextTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">{dict.context.role}</h4>
                  <Badge variant="secondary">{caseStudyData.context.role}</Badge>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{dict.context.duration}</h4>
                  <Badge variant="outline">{caseStudyData.context.duration}</Badge>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{dict.context.team}</h4>
                  <Badge variant="outline">{caseStudyData.context.team}</Badge>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{dict.context.technologies}</h4>
                  <div className="flex flex-wrap gap-1">
                    {caseStudyData.context.technologies.map((tech, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{tech}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Достижения */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                {dict.achievementsTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {caseStudyData.achievements.map((achievement, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{achievement}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Архитектура решения */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                {dict.architectureTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(caseStudyData.architecture).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <h4 className="font-semibold capitalize">
                      {dict.architectureLabels[key as keyof typeof dict.architectureLabels] ?? key}:
                    </h4>
                    <p className="text-sm text-muted-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ключевые модули */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Workflow className="h-5 w-5 text-primary" />
                {dict.modulesTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(caseStudyData.modules).map(([key, items]) => (
                  <div key={key} className="space-y-3">
                    <h4 className="font-semibold capitalize flex items-center gap-2">
                      {key === 'monitoring' && <BarChart3 className="h-4 w-4" />}
                      {key === 'reporting' && <BarChart3 className="h-4 w-4" />}
                      {key === 'access' && <Shield className="h-4 w-4" />}
                      {key === 'automation' && <Zap className="h-4 w-4" />}
                      {key === 'integrations' && <Workflow className="h-4 w-4" />}
                      {key === 'performance' && <TrendingUp className="h-4 w-4" />}
                      {dict.moduleLabels[key as keyof typeof dict.moduleLabels] ?? key}:
                    </h4>
                    <ul className="space-y-1">
                      {items.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Технические решения */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                {dict.technicalTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(caseStudyData.technical).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <h4 className="font-semibold capitalize">
                      {dict.technicalLabels[key as keyof typeof dict.technicalLabels] ?? key}:
                    </h4>
                    <p className="text-sm text-muted-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Результаты и бизнес-цели */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                {dict.resultsTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(caseStudyData.results).map(([key, value]) => (
                  <div key={key} className="text-center p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2 capitalize">
                      {dict.resultLabels[key as keyof typeof dict.resultLabels] ?? key}:
                    </h4>
                    <p className="text-sm text-muted-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Пользовательские сценарии */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                {dict.scenariosTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(caseStudyData.scenarios).map(([role, tasks]) => (
                  <div key={role} className="space-y-3">
                    <h4 className="font-semibold capitalize">
                      {dict.scenarioLabels[role as keyof typeof dict.scenarioLabels] ?? role}:
                    </h4>
                    <ul className="space-y-1">
                      {tasks.map((task, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Пути улучшения */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                {dict.improvementsTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {caseStudyData.improvements.map((improvement, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{improvement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Как использовать в докладе */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Award className="h-5 w-5" />
                {dict.presentationTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {caseStudyData.presentation.map((tip, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
