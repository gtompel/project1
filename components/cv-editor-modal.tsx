'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Save, Eye, X } from 'lucide-react';
import { cvData, CVData } from '@/lib/cv-data';

interface CVEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CVEditorModal({ isOpen, onClose }: CVEditorModalProps) {
  const [data, setData] = useState<CVData>(cvData);

  const updatePersonal = (field: keyof CVData['personal'], value: string) => {
    setData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }));
  };

  const updateSkills = (field: keyof CVData['skills'], value: string) => {
    setData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [field]: value,
      },
    }));
  };

  const addExperience = () => {
    setData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: '',
          period: '',
          position: '',
          description: '',
        },
      ],
    }));
  };

  const updateExperience = (index: number, field: keyof CVData['experience'][0], value: string) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, i) => (i === index ? { ...exp, [field]: value } : exp)),
    }));
  };

  const removeExperience = (index: number) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const addProject = () => {
    setData((prev) => ({
      ...prev,
      projects: [...prev.projects, ''],
    }));
  };

  const updateProject = (index: number, value: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((project, i) => (i === index ? value : project)),
    }));
  };

  const removeProject = (index: number) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const saveData = () => {
    // Здесь можно добавить логику сохранения данных
    console.log('Сохраненные данные CV:', data);
    alert('Данные CV сохранены!');
    onClose();
  };

  const previewCV = () => {
    // Открываем предварительный просмотр CV
    const cvWindow = window.open('', '_blank');
    if (cvWindow) {
      cvWindow.document.write(generateCVHTML(data));
      cvWindow.document.close();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Редактор данных CV
            <div className="flex gap-2">
              <Button onClick={previewCV} variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Предпросмотр
              </Button>
              <Button onClick={saveData} size="sm">
                <Save className="h-4 w-4 mr-2" />
                Сохранить
              </Button>
              <Button onClick={onClose} variant="outline" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
          <DialogDescription>
            Редактируйте свои личные данные, навыки, опыт работы и проекты для резюме
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Личные данные */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Личные данные</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Имя</Label>
                  <Input
                    id="name"
                    value={data.personal.name}
                    onChange={(e) => updatePersonal('name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="title">Должность</Label>
                  <Input
                    id="title"
                    value={data.personal.title}
                    onChange={(e) => updatePersonal('title', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={data.personal.email}
                    onChange={(e) => updatePersonal('email', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    value={data.personal.github}
                    onChange={(e) => updatePersonal('github', e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="telegram">Telegram</Label>
                  <Input
                    id="telegram"
                    value={data.personal.telegram}
                    onChange={(e) => updatePersonal('telegram', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Навыки */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Технические навыки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="frontend">Frontend</Label>
                  <Input
                    id="frontend"
                    value={data.skills.frontend}
                    onChange={(e) => updateSkills('frontend', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="backend">Backend</Label>
                  <Input
                    id="backend"
                    value={data.skills.backend}
                    onChange={(e) => updateSkills('backend', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="devops">DevOps</Label>
                  <Input
                    id="devops"
                    value={data.skills.devops}
                    onChange={(e) => updateSkills('devops', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="additional">Дополнительно</Label>
                  <Input
                    id="additional"
                    value={data.skills.additional}
                    onChange={(e) => updateSkills('additional', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Опыт работы */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Опыт работы
                <Button onClick={addExperience} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить опыт
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.experience.map((exp, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Input
                          placeholder="Компания"
                          value={exp.company}
                          onChange={(e) => updateExperience(index, 'company', e.target.value)}
                        />
                        <Input
                          placeholder="Период"
                          value={exp.period}
                          onChange={(e) => updateExperience(index, 'period', e.target.value)}
                        />
                        <Input
                          placeholder="Должность"
                          value={exp.position}
                          onChange={(e) => updateExperience(index, 'position', e.target.value)}
                        />
                      </div>
                      <Button
                        onClick={() => removeExperience(index)}
                        variant="outline"
                        size="sm"
                        className="ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Textarea
                      placeholder="Описание"
                      value={exp.description}
                      onChange={(e) => updateExperience(index, 'description', e.target.value)}
                      rows={2}
                    />
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Проекты */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Ключевые проекты
                <Button onClick={addProject} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить проект
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.projects.map((project, index) => (
                <div key={index} className="flex gap-3">
                  <Input
                    placeholder="Название проекта"
                    value={project}
                    onChange={(e) => updateProject(index, e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={() => removeProject(index)} variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Функция для генерации HTML контента CV (используется в preview и download)
function generateCVHTML(data: CVData): string {
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
        ${data.experience
          .map(
            (exp) => `
          <div class="experience-item">
            <h4>${exp.company} (${exp.period})</h4>
            <p><strong>${exp.position}</strong></p>
            <p>${exp.description}</p>
          </div>
        `,
          )
          .join('')}
      </div>

      <div class="section">
        <h2>Ключевые проекты</h2>
        <ul class="projects-list">
          ${data.projects.map((project) => `<li>${project}</li>`).join('')}
        </ul>
      </div>
    </body>
    </html>
  `;
}
