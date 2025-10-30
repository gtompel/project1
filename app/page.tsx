"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, TechnologyBadge } from "@/components/ui/badge";
import {
  Github,
  Send,
  Mail,
  Code,
  Database,
  Server,
  Globe,
  Briefcase,
  User,
  FileCode,
  MessageSquare,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { QuickActionsBar } from "@/components/ui/quick-actions-bar";
import { LiveDemoBadges } from "@/components/ui/live-demo-badges";
import { CVEditorModal } from "@/components/cv-editor-modal";
import { CaseStudyModal } from "@/components/case-study-modal";
import {
  AchievementTimeline,
  Achievement,
} from "@/components/ui/achievement-timeline";
import { ProgressiveImage } from "@/components/ui/progressive-image";
import { CollapsibleSection } from "@/components/ui/collapsible-section";
import { SkillsProgressionChart } from "@/components/ui/skills-progression-chart";
import { SwipeableProjects } from "@/components/ui/swipeable-projects";
import {
  portalARMCaseStudy,
  hrSystemCaseStudy,
  duel2HeroCaseStudy,
  gtoCaseStudy,
} from "@/lib/case-study-data";

interface Technology {
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  description?: string;
  projects?: number;
}

export default function Home() {
  const [isCVEditorOpen, setIsCVEditorOpen] = useState(false);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);
  const [currentCaseStudy, setCurrentCaseStudy] = useState<any>(null);

  // Click handler for case study cards
  const handleCaseStudyClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const card = target.closest('[data-case-study="true"]') as HTMLElement;
    if (card) {
      const projectTitle = card.getAttribute("data-project-title");
      if (projectTitle === "Портал АРМ") {
        setCurrentCaseStudy(portalARMCaseStudy);
        setIsCaseStudyOpen(true);
      } else if (projectTitle === "HR Система") {
        setCurrentCaseStudy(hrSystemCaseStudy);
        setIsCaseStudyOpen(true);
      } else if (projectTitle === "Duel2Hero") {
        setCurrentCaseStudy(duel2HeroCaseStudy);
        setIsCaseStudyOpen(true);
      } else if (projectTitle === "GTO Protocol Management System") {
        setCurrentCaseStudy(gtoCaseStudy);
        setIsCaseStudyOpen(true);
      }
    }
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Navigation shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "1":
            e.preventDefault();
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" });
            break;
          case "2":
            e.preventDefault();
            document
              .getElementById("skills")
              ?.scrollIntoView({ behavior: "smooth" });
            break;
          case "3":
            e.preventDefault();
            document
              .getElementById("experience")
              ?.scrollIntoView({ behavior: "smooth" });
            break;
          case "4":
            e.preventDefault();
            document
              .getElementById("projects")
              ?.scrollIntoView({ behavior: "smooth" });
            break;
          case "5":
            e.preventDefault();
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" });
            break;
          case "h":
          case "Home":
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            break;
          case "e":
            e.preventDefault();
            setIsCVEditorOpen(true);
            break;
          case "d":
            e.preventDefault();
            // Скачивание CV
            const cvButton = document.querySelector(
              "[data-cv-download]"
            ) as HTMLButtonElement;
            cvButton?.click();
            break;
        }
      }

      // Arrow key navigation for sections
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const sections = [
          "about",
          "skills",
          "experience",
          "projects",
          "contact",
        ];
        const currentSection = sections.find((section) => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });

        if (currentSection) {
          const currentIndex = sections.indexOf(currentSection);
          let nextIndex;

          if (e.key === "ArrowDown") {
            nextIndex = Math.min(currentIndex + 1, sections.length - 1);
          } else {
            nextIndex = Math.max(currentIndex - 1, 0);
          }

          document
            .getElementById(sections[nextIndex])
            ?.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-background" onClick={handleCaseStudyClick}>
      {/* Skip Links for Accessibility */}
      <div className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-0 focus-within:left-0 focus-within:z-50">
        <a
          href="#main"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md m-2 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Перейти к основному содержимому
        </a>
        <a
          href="#about"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md m-2 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Обо мне
        </a>
        <a
          href="#skills"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md m-2 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Навыки
        </a>
        <a
          href="#experience"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md m-2 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Опыт
        </a>
        <a
          href="#projects"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md m-2 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Проекты
        </a>
        <a
          href="#contact"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md m-2 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Контакты
        </a>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 hidden md:flex">
            <a className="mr-6 flex items-center space-x-2 font-bold" href="/">
              <Code className="h-6 w-6" />
              <span>Юрий Королёв</span>
            </a>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a
                className="transition-colors hover:text-foreground/80 hover:border-b-2 min-h-[44px] px-3 py-2 flex items-center touch-manipulation"
                href="#about"
              >
                Обо мне
              </a>
              <a
                className="transition-colors hover:text-foreground/80 hover:border-b-2 min-h-[44px] px-3 py-2 flex items-center touch-manipulation"
                href="#skills"
              >
                Навыки
              </a>
              <a
                className="transition-colors hover:text-foreground/80 hover:border-b-2 min-h-[44px] px-3 py-2 flex items-center touch-manipulation"
                href="#experience"
              >
                Опыт
              </a>
              <a
                className="transition-colors hover:text-foreground/80 hover:border-b-2 min-h-[44px] px-3 py-2 flex items-center touch-manipulation"
                href="#projects"
              >
                Проекты
              </a>
              <a
                className="transition-colors hover:text-foreground/80 hover:border-b-2 min-h-[44px] px-3 py-2 flex items-center touch-manipulation"
                href="#contact"
              >
                Контакты
              </a>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <ThemeToggle />
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <Button
                variant="outline"
                size="icon"
                className="ml-auto hidden h-8 w-8 md:flex"
              >
                <a
                  href="https://github.com/gtompel"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
            </div>
            <Button
              variant="outline"
              className="ml-auto hidden h-8 w-8 md:flex"
            >
              <a href="https://t.me/gtompel" target="_blank" rel="noreferrer">
                <Send className="h-4 w-4" />
                <span className="sr-only">Telegram</span>
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1" id="main">
        {/* Hero Section */}
        <section className="container py-24 md:py-32 space-y-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="text-hero">Юрий Королёв</h1>
            <p className="text-subtitle max-w-[700px]">
              Full Stack Web Developer
            </p>
            <div className="flex gap-4">
              <Button
                asChild
                className="hover:scale-105 transition-transform duration-200 min-h-[44px] px-6 py-3"
              >
                <a href="#contact">Связаться</a>
              </Button>
              <Button
                variant="outline"
                asChild
                className="hover:scale-105 transition-transform duration-200 min-h-[44px] px-6 py-3"
              >
                <a href="#projects">Мои проекты</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Executive Summary Section */}
        <section className="container py-12 space-y-8">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl md:text-3xl">
                Ключевые показатели
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
                <div className="space-y-2">
                  <div className="text-3xl md:text-4xl font-bold text-brand">
                    {new Date().getFullYear() - 2018}+
                  </div>
                  <div className="text-sm text-muted-foreground">лет опыта</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl md:text-4xl font-bold text-brand">
                    {(() => {
                      const projects = [
                        {
                          title: "Портал АРМ",
                          technologies: ["Next.js", "RSC", "Tailwind"],
                        },
                        {
                          title: "HR Система",
                          technologies: ["Next.js", "ShadcnUI", "Charts"],
                        },
                        {
                          title: "Duel2Hero",
                          technologies: ["Next.js", "App Router", "TypeScript"],
                        },
                      ];
                      return projects.length;
                    })()}
                  </div>
                  <div className="text-sm text-muted-foreground">проектов</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl md:text-4xl font-bold text-brand">
                    {(() => {
                      const allTechnologies = [
                        "Next.js",
                        "RSC",
                        "Tailwind",
                        "ShadcnUI",
                        "Charts",
                        "App Router",
                        "TypeScript",
                        "Node.js",
                        "Nest.js",
                        "Express",
                        "PostgreSQL",
                        "SQLite",
                        "REST API",
                      ];
                      return allTechnologies.length;
                    })()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    технологий
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl md:text-4xl font-bold text-brand">
                    B2
                  </div>
                  <div className="text-sm text-muted-foreground">
                    английский
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl md:text-4xl font-bold text-brand">
                    ✓
                  </div>
                  <div className="text-sm text-muted-foreground">релокация</div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t">
                <div className="flex flex-wrap justify-center gap-2">
                  {(() => {
                    const topTechnologies = [
                      "Next.js",
                      "React",
                      "TypeScript",
                      "Node.js",
                      "PostgreSQL",
                    ];
                    return topTechnologies.map((tech, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ));
                  })()}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* About Section */}
        <section id="about" className="container py-12 md:py-24">
          <CollapsibleSection title="Обо мне" className="space-y-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="inline-block rounded-lg bg-muted p-1.5 mb-4">
                <User className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-bold">Обо мне</h2>
              <div className="prose-spacing">
                <p className="text-body">
                  Код - мост между сегодняшним днём и завтрашними возможностями.
                </p>
                <p className="text-body">
                  Проекты - эффективные решения, которые делают жизнь более
                  удобной, безопасной и эффективной.
                </p>
                <p className="text-body">
                  Философия - искать нестандартные решения, быть гибким и
                  открытым к изменениям.
                </p>
              </div>
            </div>
          </CollapsibleSection>
        </section>

        {/* Projects Section (after About) */}
        <section id="projects" className="container py-12 md:py-24 space-y-8">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <div className="inline-block rounded-lg bg-muted p-1.5 mb-4">
              <FileCode className="h-5 w-5" />
            </div>
            <h2 className="text-3xl font-bold">Проекты</h2>
            <p className="text-muted-foreground md:text-xl max-w-[700px]">
              Некоторые из моих недавних проектов
            </p>
          </div>

          <SwipeableProjects
            projects={[
              {
                title: "Портал АРМ",
                description:
                  "Корпоративная система управления автоматизированными рабочими местами с модулями мониторинга, отчетности и управления доступом",
                technologies: [
                  {
                    name: "Next.js",
                    level: "expert",
                    description: "React фреймворк для серверного рендеринга",
                    projects: 3,
                  },
                  {
                    name: "RSC",
                    level: "advanced",
                    description: "React Server Components",
                    projects: 2,
                  },
                  {
                    name: "Tailwind",
                    level: "expert",
                    description: "CSS фреймворк",
                    projects: 4,
                  },
                  {
                    name: "PostgreSQL",
                    level: "advanced",
                    description: "Реляционная база данных",
                    projects: 2,
                  },
                  {
                    name: "Node.js",
                    level: "expert",
                    description: "JavaScript runtime",
                    projects: 3,
                  },
                ],
                imageUrl: "/Portal.png",
                href: "https://portal-arm.vercel.app",
                demoUrl: "https://portal-arm.vercel.app",
                sourceUrl: "https://github.com/gtompel/portal-arm",
                caseStudyUrl: "#",
                caseStudyData: portalARMCaseStudy,
                role: "Full-stack разработчик",
                duration: "4 месяца",
                teamSize: "Команда 3 человека",
                impact:
                  "Улучшил эффективность работы IT-отдела на 60% за счет автоматизации рутинных процессов",
                metrics: [
                  "Автоматизация 15+ процессов",
                  "Снижение времени отклика на 40%",
                  "Интеграция с 5 системами",
                  "Обработка 1000+ запросов/день",
                ],
              },
              {
                title: "HR Система",
                description:
                  "Комплексная система управления ресурсами с модулями учета сотрудников, планирования отпусков и аналитики",
                technologies: [
                  {
                    name: "Next.js",
                    level: "expert",
                    description: "React фреймворк для серверного рендеринга",
                    projects: 3,
                  },
                  {
                    name: "ShadcnUI",
                    level: "advanced",
                    description: "Компонентная библиотека",
                    projects: 2,
                  },
                  {
                    name: "Charts",
                    level: "intermediate",
                    description: "Библиотека для визуализации данных",
                    projects: 1,
                  },
                  {
                    name: "TypeScript",
                    level: "expert",
                    description: "Типизированный JavaScript",
                    projects: 3,
                  },
                  {
                    name: "Prisma",
                    level: "intermediate",
                    description: "ORM для баз данных",
                    projects: 1,
                  },
                ],
                imageUrl: "/HR.png",
                href: "https://kebab-omega.vercel.app/",
                demoUrl: "https://kebab-omega.vercel.app/",
                sourceUrl: "https://github.com/gtompel/hr-system",
                caseStudyUrl: "#",
                caseStudyData: hrSystemCaseStudy,
                role: "Архитектор и ведущий разработчик",
                duration: "6 месяцев",
                teamSize: "Команда 4 человека",
                impact:
                  "Оптимизировал процессы HR на 70% и сократил время обработки документов с 2 дней до 2 часов",
                metrics: [
                  "Автоматизация документооборота",
                  "Интерактивные дашборды",
                  "Мобильное приложение",
                  "Интеграция с 1C",
                ],
              },
              {
                title: "GTO Protocol Management System",
                description: `Приложение для ведения электронных протоколов сдачи норм ГТО (Готов к труду и обороне)\n\nВедения электронных протоколов выполнения нормативов ГТО\n- Управления справочниками видов испытаний, уровней выполнения и спортивных званий\n`,
                technologies: [
                  {
                    name: "Next.js 16",
                    level: "expert",
                    description: "App Router, React 19, TypeScript",
                  },
                  {
                    name: "Prisma ORM",
                    level: "advanced",
                    description: "PostgreSQL, localStorage fallback",
                  },
                  {
                    name: "Tailwind CSS v4",
                    level: "expert",
                    description: "Для стилизации UI",
                  },
                  {
                    name: "shadcn/ui",
                    level: "advanced",
                    description: "UI компоненты",
                  },
                  {
                    name: "React Hook Form",
                    level: "expert",
                    description: "+ Zod для валидации форм",
                  },
                ],
                imageUrl: "/Duel.png", // Пока временно, чтобы не ломать сетку
                href: "https://duel2hero.vercel.app/",
                demoUrl: "https://duel2hero.vercel.app/",
                sourceUrl: "https://github.com/gtompel/duel2hero",
                caseStudyUrl: "#case-gto",
                caseStudyData: gtoCaseStudy,
                role: "Ведущий разработчик",
                duration: "3 месяца",
                teamSize: "Соло или небольшая команда",
                impact:
                  "Автоматизация документооборота по ГТО, прозрачность результатов и повышение безопасности хранения данных.",
                metrics: [
                  "Ведение протоколов онлайн",
                  "Экспорт CSV для организаций",
                  "Раздельные роли: admin/user",
                  "Аудит операций",
                ],
              },
            ]}
          />
        </section>

        {/* Skills Section */}
        <section id="skills" className="container py-12 md:py-24">
          <CollapsibleSection title="Технические навыки" className="space-y-8">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <div className="inline-block rounded-lg bg-muted p-1.5 mb-4">
                <Code className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-bold">Технические навыки</h2>
              <p className="text-muted-foreground md:text-xl max-w-[700px]">
                Мой технический стек и опыт работы с различными технологиями
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="h-5 w-5 text-brand group-hover:scale-110 transition-transform duration-200" />
                    <h3 className="text-xl font-semibold">Frontend</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge>JavaScript</Badge>
                    <Badge>TypeScript</Badge>
                    <Badge>React</Badge>
                    <Badge>Next.js</Badge>
                    <Badge>Vite</Badge>
                    <Badge>Tailwind CSS</Badge>
                    <Badge>Shadcn/UI</Badge>
                    <Badge>HTML</Badge>
                    <Badge>CSS</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Server className="h-5 w-5 text-brand group-hover:scale-110 transition-transform duration-200" />
                    <h3 className="text-xl font-semibold">Backend</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Node.js</Badge>
                    <Badge>Nest.js</Badge>
                    <Badge>Express</Badge>
                    <Badge>PostgreSQL</Badge>
                    <Badge>SQLite</Badge>
                    <Badge>REST API</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Database className="h-5 w-5 text-brand group-hover:scale-110 transition-transform duration-200" />
                    <h3 className="text-xl font-semibold">DevOps</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Git</Badge>
                    <Badge>Docker</Badge>
                    <Badge>Nginx</Badge>
                    <Badge>Linux</Badge>
                    <Badge>CI/CD</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Skills Progression Chart */}
            <div className="mt-12">
              <SkillsProgressionChart />
            </div>
          </CollapsibleSection>
        </section>

        {/* Experience Section */}
        <section id="experience" className="container py-12 md:py-24">
          <CollapsibleSection title="Карьерный путь" className="space-y-8">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <div className="inline-block rounded-lg bg-muted p-1.5 mb-4">
                <Briefcase className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-bold">Карьерный путь</h2>
              <p className="text-muted-foreground md:text-xl max-w-[700px]">
                Мой профессиональный рост и ключевые достижения
              </p>
            </div>

            <AchievementTimeline
              achievements={[
                {
                  year: "2022-наст.",
                  title: "Инженер-программист",
                  company: "ФГУП НИТИ им. А.П. Александрова",
                  description:
                    "Разработка веб-приложений и поддержка инфраструктуры",
                  achievements: [
                    "Разработал веб-приложения с использованием React, Next.js",
                    "Создал и поддерживаю бэкенд на Node.js, Nest.js, Express",
                    "Работаю с базами данных PostgreSQL, SQLite",
                    "Настроил и поддерживаю CI/CD процессы",
                    "Контейнеризую приложения с использованием Docker",
                  ],
                  quantifiedAchievements: [
                    "15+ веб-приложений",
                    "8 настроек CI/CD",
                    "5+ интеграций систем",
                    "1000+ запросов/день",
                  ],
                  technologies: [
                    "React",
                    "Next.js",
                    "Node.js",
                    "Nest.js",
                    "PostgreSQL",
                    "Docker",
                  ],
                  type: "job",
                },
                {
                  year: "2019-2022",
                  title: "Инженер-проектировщик",
                  company: "Индивидуальное предпринимательство / фриланс",
                  description: "Проектирование и внедрение систем безопасности",
                  achievements: [
                    "Спроектировал и внедрил системы контроля доступа",
                    "Автоматизировал мониторинг и управление системами безопасности",
                    "Разработал системы видеонаблюдения",
                    "Создал комплексные системы безопасности под ключ",
                  ],
                  quantifiedAchievements: [
                    "20+ систем контроля доступа",
                    "15+ систем видеонаблюдения",
                    "10+ комплексных решений",
                    "50+ клиентов",
                  ],
                  technologies: [
                    "Python",
                    "JavaScript",
                    "Linux",
                    "Network Security",
                  ],
                  type: "job",
                },
                {
                  year: "2018-2019",
                  title: "Руководитель проектного отдела",
                  company: "ООО 'Трекон'",
                  description: "Управление проектами в области безопасности",
                  achievements: [
                    "Спроектировал интегрированные комплексы безопасности",
                    "Разработал индивидуальные решения под заказчика",
                    "Руководил командой разработчиков",
                    "Внедрил процессы проектного управления",
                  ],
                  quantifiedAchievements: [
                    "10+ интегрированных комплексов",
                    "5 человек в команде",
                    "100% соблюдение сроков",
                    "30+ успешных проектов",
                  ],
                  technologies: [
                    "Python",
                    "JavaScript",
                    "HTML",
                    "CSS",
                    "Project Management",
                  ],
                  type: "job",
                },
              ]}
            />
          </CollapsibleSection>
        </section>

        {/* Projects Section (old) removed */}

        {/* Contact Section */}
        <section id="contact" className="container py-12 md:py-24">
          <CollapsibleSection title="Связаться со мной" className="space-y-8">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <div className="inline-block rounded-lg bg-muted p-1.5 mb-4">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-bold">Связаться со мной</h2>
              <p className="text-muted-foreground md:text-xl max-w-[700px]">
                Заинтересованы в сотрудничестве? Свяжитесь со мной любым удобным
                способом
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <a
                        href="mailto:qumpik@yandex.ru"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors duration-200 hover:underline"
                      >
                        quimpik@yandex.ru
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Send className="h-5 w-5 text-primary" />
                      <a
                        href="https://github.com/gtompel"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors duration-200 hover:underline"
                      >
                        @gtompel
                      </a>
                    </div>
                    {/* <div className="flex items-center gap-3">
                      <Linkedin className="h-5 w-5 text-primary" />
                      <p>linkedin.com/in/yourprofile</p>
                    </div> */}
                    <div className="flex items-center gap-3">
                      <Github className="h-5 w-5 text-primary" />
                      <a
                        href="https://github.com/gtompel"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors duration-200 hover:underline"
                      >
                        github.com/gtompel
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <form className="space-y-4">
                    <div className="grid gap-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Имя
                      </label>
                      <input
                        id="name"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Ваше имя"
                        autoComplete="name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="your@email.com"
                        autoComplete="email"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Сообщение
                      </label>
                      <textarea
                        id="message"
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Ваше сообщение..."
                      />
                    </div>
                    <Button className="w-full bg-gray-400">Отправить</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </CollapsibleSection>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0 bg-muted/50">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 Юрий Королёв. Все права защищены.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground hover:scale-110 transition-all duration-200 p-2 rounded-md min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            {/* <a href="#" className="text-muted-foreground hover:text-foreground">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a> */}
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground hover:scale-110 transition-all duration-200 p-2 rounded-md min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Quick Actions Bar */}
      <QuickActionsBar onCVEdit={() => setIsCVEditorOpen(true)} />

      {/* CV Editor Modal */}
      <CVEditorModal
        isOpen={isCVEditorOpen}
        onClose={() => setIsCVEditorOpen(false)}
      />

      {/* Case Study Modal */}
      <CaseStudyModal
        isOpen={isCaseStudyOpen}
        onClose={() => setIsCaseStudyOpen(false)}
        projectName={currentCaseStudy?.title || ""}
        caseStudyData={currentCaseStudy}
      />
    </div>
  );
}
