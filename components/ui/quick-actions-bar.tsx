"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, MessageSquare, FileCode, Github, ChevronUp } from "lucide-react";
import { cvData } from "@/lib/cv-data";
import { useToast } from "@/hooks/use-toast";

interface QuickActionsBarProps {
  onCVEdit?: () => void;
}

export function QuickActionsBar({ onCVEdit }: QuickActionsBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const generateCV = () => {
    try {

      // Импортируем функцию генерации HTML из CVEditor
      const cvHTML = generateCVHTMLFromData(cvData);

      // Создаем blob с HTML содержимым
      const blob = new Blob([cvHTML], { type: 'text/html;charset=utf-8' });

      // Создаем ссылку для скачивания
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'cv-yuri-korolev.html';

      // Программно кликаем по ссылке для скачивания HTML
      document.body.appendChild(link);
      link.click();

      // Очищаем
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Показываем стильное уведомление
      toast({
        title: "CV успешно скачан!",
        description: "HTML файл сохранен в папке загрузок",
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: "Ошибка при генерации CV",
        description: "Попробуйте еще раз",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  // Функция для генерации HTML контента CV (используется в preview и download)
  const generateCVHTMLFromData = (data: any) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>CV - ${data.personal.name}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
          }
          h1 { color: #333; border-bottom: 2px solid #007acc; padding-bottom: 10px; }
          h2 { color: #007acc; margin-top: 30px; }
          .section { margin: 20px 0; }
          .contact-info { background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .skills-list { display: flex; flex-wrap: wrap; gap: 20px; margin: 15px 0; }
          .skill-category { flex: 1; min-width: 200px; }
          .experience-item { margin: 15px 0; padding: 10px; background: #f9f9f9; border-left: 4px solid #007acc; }
          .projects-list { list-style: none; padding: 0; }
          .projects-list li { margin: 10px 0; padding: 10px; background: #e8f4fd; border-radius: 5px; }
          @media print {
            body { margin: 0; padding: 15px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>${data.personal.name}</h1>
        <h2>${data.personal.title}</h2>

        <div class="contact-info">
          <h3>Контакты</h3>
          <p><strong>Email:</strong> ${data.personal.email}</p>
          <p><strong>GitHub:</strong> ${data.personal.github}</p>
          <p><strong>Telegram:</strong> ${data.personal.telegram}</p>
        </div>

        <div class="section">
          <h2>Технические навыки</h2>
          <div class="skills-list">
            <div class="skill-category">
              <strong>Frontend:</strong><br>
              ${data.skills.frontend}
            </div>
            <div class="skill-category">
              <strong>Backend:</strong><br>
              ${data.skills.backend}
            </div>
            <div class="skill-category">
              <strong>DevOps:</strong><br>
              ${data.skills.devops}
            </div>
            <div class="skill-category">
              <strong>Дополнительно:</strong><br>
              ${data.skills.additional}
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Опыт работы</h2>
          ${data.experience.map((exp: any) => `
            <div class="experience-item">
              <h4>${exp.company} (${exp.period})</h4>
              <p><strong>${exp.position}</strong></p>
              <p>${exp.description}</p>
            </div>
          `).join('')}
        </div>

        <div class="section">
          <h2>Ключевые проекты</h2>
          <ul class="projects-list">
            ${data.projects.map((project: string) => `<li>${project}</li>`).join('')}
          </ul>
        </div>
      </body>
      </html>
    `;
  };

  if (!isVisible) return null;

  return (
    <Card className="fixed bottom-6 right-6 z-50 shadow-lg border-2">
      <div className="flex flex-col gap-2 p-2">
        <Button
          size="sm"
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <MessageSquare className="h-4 w-4" />
          <span className="hidden sm:inline">Написать</span>
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <FileCode className="h-4 w-4" />
          <span className="hidden sm:inline">Проекты</span>
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="w-full justify-start gap-2"
          asChild
        >
          <a href="https://github.com/gtompel" target="_blank" rel="noopener noreferrer">
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={() => {
            generateCV();
          }}
          data-cv-download
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">CV</span>
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={onCVEdit}
        >
          <FileCode className="h-4 w-4" />
          <span className="hidden sm:inline">Редактировать CV</span>
        </Button>

        <div className="border-t pt-2 mt-1">
          <Button
            size="sm"
            variant="ghost"
            className="w-full justify-center"
            onClick={scrollToTop}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
