"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, FileText, Play } from "lucide-react";

export interface LiveDemoBadgesProps {
  demoUrl?: string;
  sourceUrl?: string;
  caseStudyUrl?: string;
  className?: string;
}

export function LiveDemoBadges({
  demoUrl,
  sourceUrl,
  caseStudyUrl,
  className = ""
}: LiveDemoBadgesProps) {
  const badges = [];

  if (demoUrl) {
    badges.push(
      <Badge
        key="demo"
        variant="default"
        className={`cursor-pointer bg-green-100 text-green-800 hover:bg-green-200 border-green-300 ${className}`}
        onClick={() => window.open(demoUrl, '_blank', 'noopener,noreferrer')}
      >
        <Play className="w-3 h-3 mr-1" />
        Попробовать демо
      </Badge>
    );
  }

  if (sourceUrl) {
    badges.push(
      <Badge
        key="source"
        variant="secondary"
        className={`cursor-pointer bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300 ${className}`}
        onClick={() => window.open(sourceUrl, '_blank', 'noopener,noreferrer')}
      >
        <Github className="w-3 h-3 mr-1" />
        Исходный код
      </Badge>
    );
  }

  if (caseStudyUrl) {
    badges.push(
      <Badge
        key="case-study"
        variant="outline"
        className={`cursor-pointer hover:bg-blue-50 hover:border-blue-300 ${className}`}
        onClick={() => window.open(caseStudyUrl, '_blank', 'noopener,noreferrer')}
      >
        <FileText className="w-3 h-3 mr-1" />
        Кейс-стади
      </Badge>
    );
  }

  if (badges.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {badges}
    </div>
  );
}
