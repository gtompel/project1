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
  Star,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LiveDev } from "@/components/live-dev";
import { QuickActionsBar } from "@/components/ui/quick-actions-bar";
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
import { Testimonials } from "@/components/ui/testimonials";
import { GradientIcon } from "@/components/ui/gradient-icon";
import { useToast } from "@/hooks/use-toast";
import { useInView } from "@/hooks/use-in-view";
import { useScrollSection } from "@/hooks/use-scroll-section";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const { toast } = useToast();
  const statsRef = React.useRef<HTMLDivElement | null>(null);
  const isStatsInView = useInView(statsRef as React.RefObject<HTMLElement>, {
    threshold: 0.5,
  });
  const activeSection = useScrollSection();
  const [counters, setCounters] = useState({
    years: 0,
    projects: 0,
    technologies: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  // Гидратация и стабильное SSR: не читаем localStorage до монтирования
  const [isHydrated, setIsHydrated] = useState(false);
  const [isTestimonialsVisible, setIsTestimonialsVisible] = useState(false);

  React.useEffect(() => {
    setIsHydrated(true);
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem("testimonials-visible")
        : null;
    if (saved !== null) {
      setIsTestimonialsVisible(saved === "true");
    } else {
      // По умолчанию скрыто, без завязки на NODE_ENV, чтобы избежать рассинхронизации
      setIsTestimonialsVisible(false);
    }
  }, []);

  // Сохраняем состояние в localStorage при изменении
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "testimonials-visible",
        String(isTestimonialsVisible)
      );
    }
  }, [isTestimonialsVisible]);

  // Scroll reveal hooks для секций
  const aboutReveal = useScrollReveal({ threshold: 0.2 });
  const skillsReveal = useScrollReveal({ threshold: 0.2 });
  const experienceReveal = useScrollReveal({ threshold: 0.2 });
  const projectsReveal = useScrollReveal({ threshold: 0.2 });
  const testimonialsReveal = useScrollReveal({ threshold: 0.2 });
  const contactReveal = useScrollReveal({ threshold: 0.2 });

  // Параллакс эффект для Hero
  React.useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const handleParallax = () => {
      const scrollY = window.scrollY;
      setParallaxOffset({ x: scrollY * 0.3, y: scrollY * 0.2 });
    };

    window.addEventListener("scroll", handleParallax);
    return () => window.removeEventListener("scroll", handleParallax);
  }, []);

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

  // Прогресс скролла
  React.useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Анимация счетчиков
  React.useEffect(() => {
    if (!isStatsInView) return;

    const targetYears = new Date().getFullYear() - 2018;
    const targetProjects = 3;
    const targetTechnologies = 13;

    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setCounters({
        years: Math.floor(targetYears * easeOutQuart),
        projects: Math.floor(targetProjects * easeOutQuart),
        technologies: Math.floor(targetTechnologies * easeOutQuart),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters({
          years: targetYears,
          projects: targetProjects,
          technologies: targetTechnologies,
        });
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isStatsInView]);

  // Обработчик формы контакта
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Имитация отправки (можно заменить на реальный API)
    try {
      // Здесь можно добавить реальную отправку через API
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Имитация задержки

      const mailtoLink = `mailto:quimpik@yandex.ru?subject=Сообщение от ${encodeURIComponent(
        name
      )}&body=${encodeURIComponent(message + "\n\nОт: " + email)}`;
      window.location.href = mailtoLink;

      toast({
        title: "Сообщение отправлено",
        description:
          "Спасибо за ваше сообщение! Я свяжусь с вами в ближайшее время.",
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить сообщение. Попробуйте позже.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
        {/* Прогресс скролла */}
        <div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
        <div className="container flex h-16 items-center">
          <div className="mr-4 hidden md:flex">
            <a className="mr-6 flex items-center space-x-2 font-bold" href="/">
              <Code className="h-6 w-6" />
              <span>Юрий Королёв</span>
            </a>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a
                className={`transition-all hover:text-foreground/80 hover:border-b-2 min-h-[44px] px-3 py-2 flex items-center touch-manipulation ${
                  activeSection === "about"
                    ? "text-primary border-b-2 border-primary font-medium"
                    : ""
                }`}
                href="#about"
              >
                Обо мне
              </a>
              <a
                className={`transition-all hover:text-foreground/80 hover:border-b-2 min-h-[44px] px-3 py-2 flex items-center touch-manipulation ${
                  activeSection === "skills"
                    ? "text-primary border-b-2 border-primary font-medium"
                    : ""
                }`}
                href="#skills"
              >
                Навыки
              </a>
              <a
                className={`transition-all hover:text-foreground/80 hover:border-b-2 min-h-[44px] px-3 py-2 flex items-center touch-manipulation ${
                  activeSection === "experience"
                    ? "text-primary border-b-2 border-primary font-medium"
                    : ""
                }`}
                href="#experience"
              >
                Опыт
              </a>
              <a
                className={`transition-all hover:text-foreground/80 hover:border-b-2 min-h-[44px] px-3 py-2 flex items-center touch-manipulation ${
                  activeSection === "projects"
                    ? "text-primary border-b-2 border-primary font-medium"
                    : ""
                }`}
                href="#projects"
              >
                Проекты
              </a>
              <a
                className={`transition-all hover:text-foreground/80 hover:border-b-2 min-h-[44px] px-3 py-2 flex items-center touch-manipulation ${
                  activeSection === "contact"
                    ? "text-primary border-b-2 border-primary font-medium"
                    : ""
                }`}
                href="#contact"
              >
                Контакты
              </a>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <ThemeToggle />
            {(process.env.NODE_ENV === "development" ||
              process.env.NEXT_PUBLIC_LIVE_DEV === "1") && (
              <LiveDev inline buttonClassName="h-8 w-8" />
            )}
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
        <section className="container py-24 md:py-32 space-y-8 relative">
          {/* Градиентный фон с параллакс */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-primary/5 dark:from-primary/10 dark:via-background dark:to-primary/10" />
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 w-[720px] h-[720px] bg-primary/15 dark:bg-primary/20 rounded-full blur-3xl md:blur-[120px] opacity-70 dark:opacity-50 transition-transform duration-500 ease-out"
            style={{
              transform: `translate(calc(-50% + ${parallaxOffset.x}px), calc(-50% + ${parallaxOffset.y}px))`,
            }}
          />

          <div className="flex flex-col items-center text-center space-y-4 relative z-10">
            <div className="inline-block rounded-full bg-gradient-to-r from-primary to-primary/60 p-1 mb-4 animate-fade-in">
              <div className="rounded-full bg-background p-2">
                <Code className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-hero bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent animate-fade-in">
              Юрий Королёв
            </h1>
            <p className="text-subtitle max-w-[700px] animate-fade-in animation-delay-200">
              Full Stack Web Developer
            </p>
            <p className="text-muted-foreground max-w-[600px] animate-fade-in animation-delay-400">
              Создаю современные веб-приложения с акцентом на производительность
              и пользовательский опыт
            </p>
            <div className="flex gap-4 pt-4 animate-fade-in animation-delay-600">
              <Button
                asChild
                className="hover:scale-105 transition-transform duration-200 min-h-[44px] px-6 py-3 bg-gradient-to-r from-primary to-primary/80 shadow-lg hover:shadow-xl"
              >
                <a href="#contact">Связаться</a>
              </Button>
              <Button
                variant="outline"
                asChild
                className="hover:scale-105 transition-transform duration-200 min-h-[44px] px-6 py-3 border-2"
              >
                <a href="#projects">Мои проекты</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Executive Summary Section */}
        <section className="container py-12 space-y-8" ref={statsRef}>
          <Card className="max-w-4xl mx-auto border-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl md:text-3xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Ключевые показатели
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
                <div className="space-y-2 p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 transition-all duration-300 group">
                  <div className="text-3xl md:text-4xl font-bold text-brand group-hover:scale-110 transition-transform duration-300">
                    {counters.years}+
                  </div>
                  <div className="text-sm text-muted-foreground">лет опыта</div>
                </div>
                <div className="space-y-2 p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 transition-all duration-300 group">
                  <div className="text-3xl md:text-4xl font-bold text-brand group-hover:scale-110 transition-transform duration-300">
                    {counters.projects}
                  </div>
                  <div className="text-sm text-muted-foreground">проектов</div>
                </div>
                <div className="space-y-2 p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 transition-all duration-300 group">
                  <div className="text-3xl md:text-4xl font-bold text-brand group-hover:scale-110 transition-transform duration-300">
                    {counters.technologies}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    технологий
                  </div>
                </div>
                <div className="space-y-2 p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 transition-all duration-300 group">
                  <div className="text-3xl md:text-4xl font-bold text-brand group-hover:scale-110 transition-transform duration-300">
                    B2
                  </div>
                  <div className="text-sm text-muted-foreground">
                    английский
                  </div>
                </div>
                <div className="space-y-2 p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 transition-all duration-300 group">
                  <div className="text-3xl md:text-4xl font-bold text-brand group-hover:scale-110 transition-transform duration-300">
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
        <section
          id="about"
          ref={aboutReveal.ref as React.RefObject<HTMLElement>}
          className={`container py-12 md:py-24 transition-all duration-1000 ${
            aboutReveal.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <CollapsibleSection title="Обо мне" className="space-y-8">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="relative">
                <div className="inline-block rounded-full bg-gradient-to-r from-primary to-primary/60 p-1 mb-4 animate-pulse">
                  <div className="rounded-full bg-background p-3">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Обо мне
              </h2>
              <div className="max-w-3xl prose-spacing">
                <Card className="p-6 md:p-8 bg-gradient-to-br from-card to-card/50 border-2 shadow-lg">
                  <div className="space-y-4 text-left">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/10 p-2 mt-1">
                        <Code className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Код</h3>
                        <p className="text-body text-muted-foreground">
                          Создаю масштабируемые веб‑приложения с акцентом на
                          быстродействие и комфорт пользователя.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/10 p-2 mt-1">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Проекты</h3>
                        <p className="text-body text-muted-foreground">
                          Инженерно продуманные решения, повышающие удобство,
                          безопасность и эффективность.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/10 p-2 mt-1">
                        <Globe className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          Философия
                        </h3>
                        <p className="text-body text-muted-foreground">
                          Стремлюсь к инновациям, сохраняю гибкость в работе и
                          непрерывно изучаю актуальные технологии и практики.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </CollapsibleSection>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          ref={skillsReveal.ref as React.RefObject<HTMLElement>}
          className={`container py-12 md:py-24 transition-all duration-1000 ${
            skillsReveal.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <CollapsibleSection title="Технические навыки" className="space-y-8">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <GradientIcon className="mb-4" size={48} padding={8}>
                <Code className="h-5 w-5 text-primary" />
              </GradientIcon>
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
        <section
          id="experience"
          ref={experienceReveal.ref as React.RefObject<HTMLElement>}
          className={`container py-12 md:py-24 transition-all duration-1000 ${
            experienceReveal.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <CollapsibleSection title="Карьерный путь" className="space-y-8">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <GradientIcon className="mb-4" size={48} padding={8}>
                <Briefcase className="h-5 w-5 text-primary" />
              </GradientIcon>
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

        {/* Projects Section */}
        <section
          id="projects"
          ref={projectsReveal.ref as React.RefObject<HTMLElement>}
          className={`container py-12 md:py-24 space-y-8 transition-all duration-1000 ${
            projectsReveal.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <GradientIcon className="mb-4" size={48} padding={8}>
              <FileCode className="h-5 w-5 text-primary" />
            </GradientIcon>
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
                imageUrl: "/Duel.png",
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

        {/* Testimonials Section */}
        {isHydrated && isTestimonialsVisible && (
          <section
            id="testimonials"
            ref={testimonialsReveal.ref as React.RefObject<HTMLElement>}
            className={`container py-12 md:py-24 transition-all duration-1000 ${
              testimonialsReveal.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <GradientIcon className="mb-4" size={48} padding={8}>
                <Star className="h-5 w-5 text-primary" />
              </GradientIcon>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Отзывы
              </h2>
              <p className="text-muted-foreground md:text-xl max-w-[700px]">
                Что говорят коллеги и клиенты о моей работе
              </p>
            </div>

            <Testimonials
              testimonials={[
                {
                  id: "1",
                  name: "Алексей Иванов",
                  role: "Руководитель IT-отдела",
                  company: "ФГУП НИТИ",
                  content:
                    "Юрий проявил себя как ответственный и профессиональный разработчик. Портал АРМ, который он создал, значительно упростил нашу работу и повысил эффективность процессов.",
                  rating: 5,
                  project: "Портал АРМ",
                },
                {
                  id: "2",
                  name: "Мария Петрова",
                  role: "HR-директор",
                  company: "Корпорация",
                  content:
                    "Работа с Юрием над HR-системой была очень продуктивной. Он внимательно выслушал все требования и создал решение, которое превзошло наши ожидания. Система работает стабильно и удобна в использовании.",
                  rating: 5,
                  project: "HR Система",
                },
                {
                  id: "3",
                  name: "Дмитрий Сидоров",
                  role: "CTO",
                  company: "Технологический стартап",
                  content:
                    "Юрий показал отличные навыки в full-stack разработке. Его код чистый, хорошо структурирован и легко поддерживается. Рекомендую его как надежного специалиста.",
                  rating: 5,
                },
                {
                  id: "4",
                  name: "Елена Козлова",
                  role: "Менеджер проектов",
                  company: "IT-компания",
                  content:
                    "В работе с Юрием впечатлила его способность быстро вникать в задачи и предлагать оптимальные решения. Все проекты были сданы в срок и с высоким качеством.",
                  rating: 5,
                },
              ]}
            />
          </section>
        )}

        {/* Contact Section */}
        <section
          id="contact"
          ref={contactReveal.ref as React.RefObject<HTMLElement>}
          className={`container py-12 md:py-24 transition-all duration-1000 ${
            contactReveal.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <CollapsibleSection title="Связаться со мной" className="space-y-8">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <GradientIcon className="mb-4" size={48} padding={8}>
                <MessageSquare className="h-5 w-5 text-primary" />
              </GradientIcon>
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
                        href="mailto:quimpik@yandex.ru"
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

              <Card className="border-2 shadow-lg glass">
                <CardContent className="pt-6">
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid gap-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Имя
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
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
                        name="email"
                        type="email"
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
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
                        name="message"
                        required
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-none"
                        placeholder="Ваше сообщение..."
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="mr-2">Отправка...</span>
                          <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                        </>
                      ) : (
                        "Отправить сообщение"
                      )}
                    </Button>
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
      <QuickActionsBar
        onCVEdit={() => setIsCVEditorOpen(true)}
        onToggleTestimonials={() =>
          setIsTestimonialsVisible(!isTestimonialsVisible)
        }
        isTestimonialsVisible={isTestimonialsVisible}
      />

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
