'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Save, Eye } from 'lucide-react';
import { cvData, CVData } from '@/lib/cv-data';
import { PersonalForm } from './cv-editor-personal';
import { SkillsForm } from './cv-editor-skills';
import { ExperienceForm } from './cv-editor-experience';
import { ProjectList } from './cv-editor-projects';

export function CVEditor() {
  const [data, setData] = useState<CVData>(cvData);
  const [isEditing, setIsEditing] = useState(false);

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
    setIsEditing(false);
    alert('Данные CV сохранены!');
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
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
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
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <PersonalForm data={data.personal} onChange={updatePersonal} />
          <SkillsForm data={data.skills} onChange={updateSkills} />
          <ExperienceForm
            data={data.experience}
            onChange={updateExperience}
            onAdd={addExperience}
            onRemove={removeExperience}
          />
          <ProjectList
            data={data.projects}
            onChange={updateProject}
            onAdd={addProject}
            onRemove={removeProject}
          />
        </CardContent>
      </Card>
    </div>
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
