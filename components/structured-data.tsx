import React from "react";

export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Юрий Королёв",
    "jobTitle": "Full Stack Web Developer",
    "description": "Опытный Full Stack разработчик с экспертизой в React, Next.js, Node.js, PostgreSQL и DevOps практиках",
    "url": "https://youchoice.vercel.app",
    "sameAs": [
      "https://github.com/gtompel",
      "mailto:quimpik@yandex.ru"
    ],
    "knowsAbout": [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "CI/CD",
      "Web Development",
      "Full Stack Development"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Full Stack Web Developer",
      "occupationLocation": {
        "@type": "Country",
        "name": "Россия"
      },
      "skills": [
        "React", "Next.js", "TypeScript", "Node.js", "Nest.js",
        "PostgreSQL", "SQLite", "Docker", "Git", "CI/CD",
        "Tailwind CSS", "Shadcn/UI", "Express", "REST API"
      ]
    }
  };

  const resumeSchema = {
    "@context": "https://schema.org",
    "@type": "Resume",
    "name": "Резюме Юрия Королёва",
    "description": "Full Stack Web Developer с опытом работы в веб-разработке и системной интеграции",
    "about": {
      "@type": "Person",
      "name": "Юрий Королёв",
      "jobTitle": "Full Stack Web Developer"
    },
    "workExperience": [
      {
        "@type": "WorkExperience",
        "name": "Инженер-программист",
        "employer": {
          "@type": "Organization",
          "name": "ФГУП НИТИ им. А.П. Александрова"
        },
        "startDate": "2022-10",
        "endDate": "present",
        "description": "Разработка веб-приложений и поддержка инфраструктуры"
      },
      {
        "@type": "WorkExperience",
        "name": "Инженер-проектировщик",
        "employer": {
          "@type": "Organization",
          "name": "Индивидуальное предпринимательство"
        },
        "startDate": "2019-05",
        "endDate": "2022-09",
        "description": "Проектирование и внедрение систем безопасности"
      },
      {
        "@type": "WorkExperience",
        "name": "Руководитель проектного отдела",
        "employer": {
          "@type": "Organization",
          "name": "ООО Трекон"
        },
        "startDate": "2018-04",
        "endDate": "2019-01",
        "description": "Управление проектами в области безопасности"
      }
    ],
    "education": {
      "@type": "EducationalOccupationalCredential",
      "name": "Высшее техническое образование",
      "description": "Специальность связанная с информационными технологиями и системами безопасности"
    }
  };

  const portfolioProjects = [
    {
      "@type": "SoftwareApplication",
      "name": "Портал АРМ",
      "description": "Система управления автоматизированными рабочими местами",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "url": "https://portal-arm.vercel.app"
      },
      "author": {
        "@type": "Person",
        "name": "Юрий Королёв"
      },
      "programmingLanguage": ["JavaScript", "TypeScript"],
      "applicationSubCategory": "Enterprise Software"
    },
    {
      "@type": "SoftwareApplication",
      "name": "HR Система",
      "description": "Система управления человеческими ресурсами",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "url": "https://kebab-omega.vercel.app"
      },
      "author": {
        "@type": "Person",
        "name": "Юрий Королёв"
      },
      "programmingLanguage": ["JavaScript", "TypeScript"],
      "applicationSubCategory": "HR Software"
    },
    {
      "@type": "SoftwareApplication",
      "name": "Duel2Hero",
      "description": "Игровое приложение для соревнований",
      "applicationCategory": "GameApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "url": "https://duel2hero.vercel.app"
      },
      "author": {
        "@type": "Person",
        "name": "Юрий Королёв"
      },
      "programmingLanguage": ["JavaScript", "TypeScript"],
      "applicationSubCategory": "Multiplayer Game"
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(resumeSchema),
        }}
      />
      {portfolioProjects.map((project, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(project),
          }}
        />
      ))}
    </>
  );
}
