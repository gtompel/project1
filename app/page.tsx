"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, TechnologyBadge } from "@/components/ui/badge";
import { Github, Send, Mail, Code, Database, Server, Globe, Briefcase, User, FileCode, MessageSquare } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { QuickActionsBar } from "@/components/ui/quick-actions-bar";
import { LiveDemoBadges } from "@/components/ui/live-demo-badges";
import { CVEditorModal } from "@/components/cv-editor-modal";
import { AchievementTimeline, Achievement } from "@/components/ui/achievement-timeline";
import { ProgressiveImage } from "@/components/ui/progressive-image";
import { CollapsibleSection } from "@/components/ui/collapsible-section";

interface Technology {
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  description?: string;
  projects?: number;
}

interface ProjectCardProps {
  title: string;
  description: string;
  technologies?: Technology[]; // Заменили tags на technologies с уровнями экспертизы
  imageUrl?: string; // Этот параметр необязателен
  href?: string;
  demoUrl?: string; // Ссылка на демо
  sourceUrl?: string; // Ссылка на исходный код
  caseStudyUrl?: string; // Ссылка на кейс-стади
  role?: string; // Роль в проекте
  duration?: string; // Время разработки
  teamSize?: string; // Размер команды
  impact?: string; // Влияние/результаты
  metrics?: string[]; // Конкретные метрики
}

export default function Home() {
  const [isCVEditorOpen, setIsCVEditorOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
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
                className="transition-colors hover:text-foreground/80 hover:border-b-2"
                href="#about"
              >
                Обо мне
              </a>
              <a
                className="transition-colors hover:text-foreground/80 hover:border-b-2"
                href="#skills"
              >
                Навыки
              </a>
              <a
                className="transition-colors hover:text-foreground/80 hover:border-b-2"
                href="#experience"
              >
                Опыт
              </a>
              <a
                className="transition-colors hover:text-foreground/80 hover:border-b-2"
                href="#projects"
              >
                Проекты
              </a>
              <a
                className="transition-colors hover:text-foreground/80 hover:border-b-2 "
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-24 md:py-32 space-y-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Юрий Королёв
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-[700px]">
              Full Stack Web Developer
            </p>
            <div className="flex gap-4">
              <Button asChild>
                <a href="#contact">Связаться</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#projects">Мои проекты</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Executive Summary Section */}
        <section className="container py-12 space-y-8">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl md:text-3xl">Ключевые показатели</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
                <div className="space-y-2">
                  <div className="text-3xl md:text-4xl font-bold text-primary">
                    {new Date().getFullYear() - 2018}+
                  </div>
                  <div className="text-sm text-muted-foreground">лет опыта</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl md:text-4xl font-bold text-primary">
                    {(() => {
                      const projects = [
                        { title: "Портал АРМ", technologies: ["Next.js", "RSC", "Tailwind"] },
                        { title: "HR Система", technologies: ["Next.js", "ShadcnUI", "Charts"] },
                        { title: "Duel2Hero", technologies: ["Next.js", "App Router", "TypeScript"] }
                      ];
                      return projects.length;
                    })()}
                  </div>
                  <div className="text-sm text-muted-foreground">проектов</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl md:text-4xl font-bold text-primary">
                    {(() => {
                      const allTechnologies = [
                        "Next.js", "RSC", "Tailwind", "ShadcnUI", "Charts",
                        "App Router", "TypeScript", "Node.js", "Nest.js",
                        "Express", "PostgreSQL", "SQLite", "REST API"
                      ];
                      return allTechnologies.length;
                    })()}
                  </div>
                  <div className="text-sm text-muted-foreground">технологий</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl md:text-4xl font-bold text-primary">
                    B2
                  </div>
                  <div className="text-sm text-muted-foreground">английский</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl md:text-4xl font-bold text-primary">
                    ✓
                  </div>
                  <div className="text-sm text-muted-foreground">релокация</div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t">
                <div className="flex flex-wrap justify-center gap-2">
                  {(() => {
                    const topTechnologies = [
                      "Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"
                    ];
                    return topTechnologies.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
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
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
                Обо мне
              </h2>
              <p className="text-muted-foreground md:text-xl max-w-[700px]">
                Код - мост между сегодняшним днём и завтрашними
                возможностями. <br/>
                Проекты - эффективные решения, которые
                делают жизнь более удобной, безопасной и эффективной.< br/>
                Философия - искать нестандартные решения, быть гибким и
                открытым к изменениям.
              </p>
            </div>
          </CollapsibleSection>
        </section>

        {/* Projects Section (after About) */}
        <section
          id="projects"
          className="container py-12 md:py-24 space-y-8"
        >
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <div className="inline-block rounded-lg bg-muted p-1.5 mb-4">
              <FileCode className="h-5 w-5" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Проекты
            </h2>
            <p className="text-muted-foreground md:text-xl max-w-[700px]">
              Некоторые из моих недавних проектов
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard
              title="Портал АРМ"
              description="Корпоративная система управления автоматизированными рабочими местами с модулями мониторинга, отчетности и управления доступом"
              technologies={[
                { name: "Next.js", level: "expert", description: "React фреймворк для серверного рендеринга", projects: 3 },
                { name: "RSC", level: "advanced", description: "React Server Components", projects: 2 },
                { name: "Tailwind", level: "expert", description: "CSS фреймворк", projects: 4 },
                { name: "PostgreSQL", level: "advanced", description: "Реляционная база данных", projects: 2 },
                { name: "Node.js", level: "expert", description: "JavaScript runtime", projects: 3 }
              ]}
              imageUrl="/Portal.png"
              href="https://portal-arm.vercel.app"
              demoUrl="https://portal-arm.vercel.app"
              sourceUrl="https://github.com/gtompel/portal-arm"
              caseStudyUrl="#"
              role="Full-stack разработчик"
              duration="4 месяца"
              teamSize="Команда 3 человека"
              impact="Улучшил эффективность работы IT-отдела на 60% за счет автоматизации рутинных процессов"
              metrics={[
                "Автоматизация 15+ процессов",
                "Снижение времени отклика на 40%",
                "Интеграция с 5 системами",
                "Обработка 1000+ запросов/день"
              ]}
            />
            <ProjectCard
              title="HR Система"
              description="Комплексная система управления человеческими ресурсами с модулями учета сотрудников, планирования отпусков и аналитики"
              technologies={[
                { name: "Next.js", level: "expert", description: "React фреймворк для серверного рендеринга", projects: 3 },
                { name: "ShadcnUI", level: "advanced", description: "Компонентная библиотека", projects: 2 },
                { name: "Charts", level: "intermediate", description: "Библиотека для визуализации данных", projects: 1 },
                { name: "TypeScript", level: "expert", description: "Типизированный JavaScript", projects: 3 },
                { name: "Prisma", level: "intermediate", description: "ORM для баз данных", projects: 1 }
              ]}
              imageUrl="/HR.png"
              href="https://kebab-omega.vercel.app/"
              demoUrl="https://kebab-omega.vercel.app/"
              sourceUrl="https://github.com/gtompel/hr-system"
              caseStudyUrl="#"
              role="Архитектор и ведущий разработчик"
              duration="6 месяцев"
              teamSize="Команда 4 человека"
              impact="Оптимизировал процессы HR на 70% и сократил время обработки документов с 2 дней до 2 часов"
              metrics={[
                "Автоматизация документооборота",
                "Интерактивные дашборды",
                "Мобильное приложение",
                "Интеграция с 1C"
              ]}
            />
            <ProjectCard
              title="Duel2Hero"
              description="Игровое приложение для соревнований в сборе уникальных чисел с элементами RPG и социальными функциями"
              technologies={[
                { name: "Next.js", level: "expert", description: "React фреймворк для серверного рендеринга", projects: 3 },
                { name: "App Router", level: "advanced", description: "Новая система маршрутизации Next.js", projects: 2 },
                { name: "TypeScript", level: "expert", description: "Типизированный JavaScript", projects: 3 },
                { name: "Socket.io", level: "intermediate", description: "Библиотека для реального времени", projects: 1 },
                { name: "MongoDB", level: "intermediate", description: "NoSQL база данных", projects: 1 }
              ]}
              imageUrl="/Duel.png"
              href="https://duel2hero.vercel.app/"
              demoUrl="https://duel2hero.vercel.app/"
              sourceUrl="https://github.com/gtompel/duel2hero"
              caseStudyUrl="#"
              role="Индивидуальный проект"
              duration="2 месяца"
              teamSize="Соло-разработка"
              impact="Создал увлекательное игровое приложение с активным сообществом пользователей"
              metrics={[
                "Реал-тайм multiplayer",
                "Геймификация процесса",
                "Социальные рейтинги",
                "Адаптивный дизайн"
              ]}
            />
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="container py-12 md:py-24"
        >
          <CollapsibleSection title="Технические навыки" className="space-y-8">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <div className="inline-block rounded-lg bg-muted p-1.5 mb-4">
                <Code className="h-5 w-5" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
                Технические навыки
              </h2>
              <p className="text-muted-foreground md:text-xl max-w-[700px]">
                Мой технический стек и опыт работы с различными технологиями
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="h-5 w-5 text-primary" />
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

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Server className="h-5 w-5 text-primary" />
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

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Database className="h-5 w-5 text-primary" />
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
          </CollapsibleSection>
        </section>

        {/* Experience Section */}
        <section id="experience" className="container py-12 md:py-24">
          <CollapsibleSection title="Карьерный путь" className="space-y-8">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <div className="inline-block rounded-lg bg-muted p-1.5 mb-4">
                <Briefcase className="h-5 w-5" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
                Карьерный путь
              </h2>
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
                  description: "Разработка веб-приложений и поддержка инфраструктуры",
                  achievements: [
                    "Разработал 15+ веб-приложений с использованием React, Next.js",
                    "Создал и поддерживаю бэкенд на Node.js, Nest.js, Express",
                    "Работаю с базами данных PostgreSQL, SQLite",
                    "Настроил и поддерживаю CI/CD процессы",
                    "Контейнеризую приложения с использованием Docker"
                  ],
                  technologies: ["React", "Next.js", "Node.js", "Nest.js", "PostgreSQL", "Docker"],
                  type: "job"
                },
                {
                  year: "2019-2022",
                  title: "Инженер-проектировщик",
                  company: "Индивидуальное предпринимательство / фриланс",
                  description: "Проектирование и внедрение систем безопасности",
                  achievements: [
                    "Спроектировал и внедрил 20+ систем контроля доступа",
                    "Автоматизировал мониторинг и управление системами безопасности",
                    "Разработал 15+ систем видеонаблюдения",
                    "Создал комплексные системы безопасности под ключ"
                  ],
                  technologies: ["Python", "JavaScript", "Linux", "Network Security"],
                  type: "job"
                },
                {
                  year: "2018-2019",
                  title: "Руководитель проектного отдела",
                  company: "ООО 'Трекон'",
                  description: "Управление проектами в области безопасности",
                  achievements: [
                    "Спроектировал 10+ интегрированных комплексов безопасности",
                    "Разработал индивидуальные решения под заказчика",
                    "Руководил командой из 5 человек",
                    "Внедрил процессы проектного управления"
                  ],
                  technologies: ["Python", "JavaScript", "HTML", "CSS", "Project Management"],
                  type: "job"
                }
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
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
                Связаться со мной
              </h2>
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
                        className="text-primary"
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
                        className="text-primary"
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
                        className="text-primary"
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
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            {/* <a href="#" className="text-muted-foreground hover:text-foreground">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a> */}
            <a href="#" className="text-muted-foreground hover:text-foreground">
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
    </div>
  );
}

function ProjectCard({
  title,
  description,
  technologies = [],
  imageUrl,
  href,
  demoUrl,
  sourceUrl,
  caseStudyUrl,
  role,
  duration,
  teamSize,
  impact,
  metrics
}: ProjectCardProps) {
  return (
    <Card className="overflow-hidden group h-full flex flex-col">
      <a
        href={href}
        target={href ? "_blank" : undefined}
        rel={href ? "noopener noreferrer" : undefined}
        className={href ? "block focus:outline-none flex-shrink-0" : undefined}
      >
        <div className="aspect-video w-full overflow-hidden">
          <ProgressiveImage
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            width={400}
            height={200}
            priority={true}
            className="transition-all hover:scale-105"
          />
        </div>
      </a>

      <CardContent className="p-4 md:p-6 flex-1 flex flex-col">
        {/* Live Demo Badges - мобильная оптимизация */}
        <div className="px-0 pt-0 pb-3">
          <LiveDemoBadges
            demoUrl={demoUrl}
            sourceUrl={sourceUrl}
            caseStudyUrl={caseStudyUrl}
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg md:text-xl font-semibold mb-2 leading-tight">
            {href ? (
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
                  <span className="font-medium text-xs">Роль:</span>
                  <Badge variant="outline" className="text-xs px-2 py-0.5">{role}</Badge>
                </div>
              )}
              {duration && (
                <div className="flex items-center gap-1">
                  <span className="font-medium text-xs">Время:</span>
                  <span className="text-xs">{duration}</span>
                </div>
              )}
              {teamSize && (
                <div className="flex items-center gap-1">
                  <span className="font-medium text-xs">Команда:</span>
                  <span className="text-xs">{teamSize}</span>
                </div>
              )}
            </div>
          )}

          {impact && (
            <div className="mb-3 p-2.5 md:p-3 bg-muted/50 rounded-lg">
              <p className="text-xs md:text-sm font-medium text-primary mb-1">Результат:</p>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{impact}</p>
            </div>
          )}

          {metrics && metrics.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {metrics.map((metric, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20 px-2 py-0.5">
                    {metric}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <p className="text-sm md:text-base text-muted-foreground mb-4 leading-relaxed flex-1">{description}</p>
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
      </CardContent>
    </Card>
  );
}
 