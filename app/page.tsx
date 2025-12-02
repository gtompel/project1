'use client';

// === ИМПОРТЫ ===
import React, { useState } from 'react';

// UI-компоненты
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Иконки (Lucide React)
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
  Menu,
} from 'lucide-react';

// Кастомные компоненты
import { ThemeToggle } from '@/components/theme-toggle'; // Переключатель темы
import { LiveDev } from '@/components/live-dev'; // Кнопка "Live Dev" (только в dev-режиме)
import { QuickActionsBar } from '@/components/ui/quick-actions-bar';
import { CVEditorModal } from '@/components/cv-editor-modal'; // Модальное окно редактора CV
import { CaseStudyModal } from '@/components/case-study-modal'; // Модальное окно с кейсом
import { AchievementTimeline, Achievement } from '@/components/ui/achievement-timeline';
import { CollapsibleSection } from '@/components/ui/collapsible-section';
import { SkillsProgressionChart } from '@/components/ui/skills-progression-chart';
import { SwipeableProjects, type Project } from '@/components/ui/swipeable-projects';
import { Testimonials } from '@/components/ui/testimonials';
import { GradientIcon } from '@/components/ui/gradient-icon';

// Radix UI + UI-kit
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

// Хуки
import { useToast } from '@/hooks/use-toast';
import { useInView } from '@/hooks/use-in-view'; // Проверка видимости элемента
import { useScrollSection } from '@/hooks/use-scroll-section'; // Определение активной секции при скролле
import { useScrollReveal } from '@/hooks/use-scroll-reveal'; // Анимация появления при скролле

// Данные
import { portalARMCaseStudy, hrSystemCaseStudy, gtoCaseStudy } from '@/lib/case-study-data';

// Локализация
import { LanguageSwitcher } from '@/components/language-switcher';
import { useLanguage } from '@/components/language-provider';

// === ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ===

/**
 * Глубокая клонирование объекта для безопасного использования в useMemo.
 * Используется, чтобы избежать мутаций трансляций.
 */
const cloneTranslations = <T,>(data: T): T => {
  if (typeof structuredClone === 'function') {
    return structuredClone(data);
  }
  return JSON.parse(JSON.stringify(data));
};

// Типы для кейсов
type CaseStudyKey = 'portalARM' | 'hrSystem' | 'gto';

/**
 * Карта соответствия ключей кейсов и их данных.
 * Используется при открытии модального окна с деталями проекта.
 */
const CASE_STUDY_MAP: Record<
  CaseStudyKey,
  typeof portalARMCaseStudy | typeof hrSystemCaseStudy | typeof gtoCaseStudy
> = {
  portalARM: portalARMCaseStudy,
  hrSystem: hrSystemCaseStudy,
  gto: gtoCaseStudy,
};

/**
 * Соответствие ключей иконок для секции "Обо мне".
 */
const ABOUT_ICON_MAP = {
  code: Code,
  briefcase: Briefcase,
  globe: Globe,
} as const;

// === ОСНОВНОЙ КОМПОНЕНТ ===
export default function Home() {
  // --- ЛОКАЛИЗАЦИЯ ---
  const { translations: rawTranslations } = useLanguage();
  const translations = React.useMemo(() => cloneTranslations(rawTranslations), [rawTranslations]);

  // --- СОСТОЯНИЯ МОДАЛЬНЫХ ОКОН ---
  const [isCVEditorOpen, setIsCVEditorOpen] = useState(false);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);
  const [currentCaseStudy, setCurrentCaseStudy] = useState<any>(null);

  // --- ИНДИКАТОР ПРОГРЕССА СКРОЛЛА (для header-линии) ---
  const [scrollProgress, setScrollProgress] = useState(0);

  // --- TOAST-УВЕДОМЛЕНИЯ ---
  const { toast } = useToast();

  // --- РЕФЫ ДЛЯ АНИМАЦИЙ И СКРОЛЛА ---
  const statsRef = React.useRef<HTMLDivElement | null>(null);
  const isStatsInView = useInView(statsRef as React.RefObject<HTMLElement>, {
    threshold: 0.5, // Анимация запустится, когда 50% блока окажется в поле зрения
  });

  // --- ОПРЕДЕЛЕНИЕ АКТИВНОЙ СЕКЦИИ НАВИГАЦИИ ---
  const activeSection = useScrollSection();

  // --- СЧЁТЧИКИ ДЛЯ АНИМИРОВАННЫХ ЧИСЕЛ ---
  const [counters, setCounters] = useState({
    years: 0,
    projects: 0,
    technologies: 0,
  });

  // --- СОСТОЯНИЕ ОТПРАВКИ ФОРМЫ ---
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- ПАРАЛЛАКС ДЛЯ ФОНА ---
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  // --- ГИДРАТАЦИЯ (для корректной работы localStorage на клиенте) ---
  const [isHydrated, setIsHydrated] = useState(false);
  const [isTestimonialsVisible, setIsTestimonialsVisible] = useState(false);

  // --- ПОДГОТОВКА ДАННЫХ ИЗ ТРАНСЛЯЦИЙ ---
  const navItems = Array.isArray(translations.nav.items)
    ? translations.nav.items.map((item) => (item && typeof item === 'object' ? { ...item } : item))
    : [];
  const skipLinks = Array.isArray(translations.header.skipLinks)
    ? translations.header.skipLinks.map((item) =>
        item && typeof item === 'object' ? { ...item } : item,
      )
    : [];
  const topTechnologies = ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL'];
  const aboutCardsRaw = Array.isArray(translations.about.cards) ? translations.about.cards : [];
  const aboutCards: typeof aboutCardsRaw = [];
  for (const card of aboutCardsRaw) {
    if (card && typeof card === 'object') {
      aboutCards.push(card);
    }
  }
  const skillsCategories = Array.isArray(translations.skills.categories)
    ? translations.skills.categories.map((category) =>
        category && typeof category === 'object' ? { ...category } : category,
      )
    : [];
  const timeline = Array.isArray(translations.experience.timeline)
    ? (translations.experience.timeline.map((item) =>
        item && typeof item === 'object' ? { ...item } : item,
      ) as Achievement[])
    : [];
  const projectCards = Array.isArray(translations.projects.list)
    ? translations.projects.list.map((project) => ({
        ...project,
        caseStudyData: project.caseStudyKey
          ? CASE_STUDY_MAP[project.caseStudyKey as CaseStudyKey]
          : undefined,
      }))
    : [];
  const testimonialsData = Array.isArray(translations.testimonials.items)
    ? translations.testimonials.items.map((item) =>
        item && typeof item === 'object' ? { ...item } : item,
      )
    : [];

  // --- РЕНДЕР ЭЛЕМЕНТОВ "Обо мне" С ИКОНКАМИ ---
  const aboutCardElements: React.ReactNode[] = [];
  for (const card of aboutCards) {
    const Icon = ABOUT_ICON_MAP[card.icon as keyof typeof ABOUT_ICON_MAP] ?? Code;
    aboutCardElements.push(
      <div key={card.title} className="flex items-start gap-4">
        <div className="rounded-lg bg-primary/10 p-2 mt-1">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
          <p className="text-body text-muted-foreground">{card.description}</p>
        </div>
      </div>,
    );
  }

  // --- ЭФФЕКТЫ ---

  /**
   * Инициализация состояний после гидратации (чтобы не было ошибок SSR).
   */
  React.useEffect(() => {
    setIsHydrated(true);
    const saved =
      typeof window !== 'undefined' ? localStorage.getItem('testimonials-visible') : null;
    if (saved !== null) {
      setIsTestimonialsVisible(saved === 'true');
    } else {
      setIsTestimonialsVisible(false);
    }
  }, []);

  /**
   * Сохранение видимости отзывов в localStorage.
   */
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('testimonials-visible', String(isTestimonialsVisible));
    }
  }, [isTestimonialsVisible]);

  /**
   * Настройка анимаций появления для каждой секции.
   */
  const aboutReveal = useScrollReveal({ threshold: 0.2 });
  const skillsReveal = useScrollReveal({ threshold: 0.2 });
  const experienceReveal = useScrollReveal({ threshold: 0.2 });
  const projectsReveal = useScrollReveal({ threshold: 0.2 });
  const testimonialsReveal = useScrollReveal({ threshold: 0.2 });
  const contactReveal = useScrollReveal({ threshold: 0.2 });

  /**
   * Параллакс-эффект для фона (только если пользователь не предпочитает reduced motion).
   */
  React.useEffect(() => {
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const handleParallax = () => {
      const scrollY = window.scrollY;
      setParallaxOffset({ x: scrollY * 0.3, y: scrollY * 0.2 });
    };

    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  /**
   * Обработчик клика по карточкам проектов для открытия модального окна с кейсом.
   */
  const handleCaseStudyClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const card = target.closest('[data-case-study="true"]') as HTMLElement | null;
    if (card) {
      const key = card.getAttribute('data-project-key') as CaseStudyKey | null;
      if (key && CASE_STUDY_MAP[key]) {
        setCurrentCaseStudy(CASE_STUDY_MAP[key]);
        setIsCaseStudyOpen(true);
      }
    }
  };

  /**
   * Обновление прогресса скролла для анимированной линии в шапке.
   */
  React.useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Анимация счётчиков при попадании в поле зрения.
   */
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

  /**
   * Обработка отправки формы обратной связи.
   */
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
      toast({
        title: translations.contact.toast.missingFieldsTitle,
        description: translations.contact.toast.missingFieldsDescription,
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mailtoLink = `mailto:quimpik@yandex.ru?subject=${
        translations.contact.mailSubjectPrefix
      } ${encodeURIComponent(name)}&body=${encodeURIComponent(
        `${message}\n\n${translations.contact.mailSubjectPrefix}: ${email}`,
      )}`;
      window.location.href = mailtoLink;

      toast({
        title: translations.contact.toast.successTitle,
        description: translations.contact.toast.successDescription,
      });

      form.reset();
    } catch (error) {
      toast({
        title: translations.contact.toast.errorTitle,
        description: translations.contact.toast.errorDescription,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Глобальные горячие клавиши:
   * - Ctrl/Cmd + 1..5: навигация по секциям
   * - Ctrl/Cmd + h: вверх
   * - Ctrl/Cmd + e: открыть редактор CV
   * - Ctrl/Cmd + d: скачать CV
   * - Стрелки вверх/вниз: переход между секциями
   */
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            break;
          case '2':
            e.preventDefault();
            document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
            break;
          case '3':
            e.preventDefault();
            document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
            break;
          case '4':
            e.preventDefault();
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            break;
          case '5':
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            break;
          case 'h':
          case 'Home':
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            break;
          case 'e':
            e.preventDefault();
            setIsCVEditorOpen(true);
            break;
          case 'd':
            e.preventDefault();
            const cvButton = document.querySelector('[data-cv-download]') as HTMLButtonElement;
            cvButton?.click();
            break;
        }
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const sections = ['about', 'skills', 'experience', 'projects', 'contact'];
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

          if (e.key === 'ArrowDown') {
            nextIndex = Math.min(currentIndex + 1, sections.length - 1);
          } else {
            nextIndex = Math.max(currentIndex - 1, 0);
          }

          document.getElementById(sections[nextIndex])?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  /**
   * Вспомогательная функция для рендеринга значений в блоке "Ключевые показатели".
   */
  const renderSummaryValue = (key: string) => {
    const card = translations.summary.cards.find((item) => item.key === key);
    if (!card) return '';
    if (card.value) return card.value;

    let value = '';
    switch (key) {
      case 'years':
        value = `${counters.years}`;
        break;
      case 'projects':
        value = `${counters.projects}`;
        break;
      case 'technologies':
        value = `${counters.technologies}`;
        break;
      default:
        value = '';
    }

    return `${value}${card.suffix ?? ''}`;
  };

  // --- ОСНОВНОЙ РЕНДЕР ---

  return (
    <div className="min-h-screen bg-background" onClick={handleCaseStudyClick}>
      {/* Скрытые ссылки для скринридеров (skip links) */}
      <div className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-0 focus-within:left-0 focus-within:z-50">
        {skipLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md m-2 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* ШАПКА САЙТА */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* Анимированная линия прогресса */}
        <div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
        <div className="container flex h-16 items-center">
          {/* Логотип и навигация (только на десктопе) */}
          <div className="mr-4 hidden md:flex">
            <a className="mr-6 flex items-center space-x-2 font-bold" href="/">
              <Code className="h-6 w-6" />
              <span>{translations.header.logo}</span>
            </a>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  className={`transition-all hover:text-foreground/80 hover:border-b-2 min-h-[44px] px-3 py-2 flex items-center touch-manipulation ${
                    activeSection === item.id
                      ? 'text-primary border-b-2 border-primary font-medium'
                      : ''
                  }`}
                  href={`#${item.id}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Правый блок: язык/тема + бургер (моб) + кнопки (десктоп) */}
          <div className="flex flex-1 items-center justify-end space-x-2">
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>

            {/* Бургер только на мобилке */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10"
                    aria-label={translations.header.mobileMenuLabel}
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                {/* Мобильное меню: исправлено для доступности и адаптивности */}
                <SheetContent
                  side="top"
                  className="w-full max-w-full flex flex-col gap-4 pt-6 pb-6 px-6 bg-background/95"
                  aria-describedby={undefined} // Отключает предупреждение об отсутствии Description
                >
                  <SheetHeader>
                    <SheetTitle>{translations.header.mobileMenuLabel}</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-4 text-lg">
                    {navItems.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="min-h-[44px] flex items-center rounded-md px-3 py-2 hover:bg-accent"
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            {/* Правые кнопки только на десктопе */}
            <div className="hidden md:flex items-center gap-2">
              {(process.env.NODE_ENV === 'development' ||
                process.env.NEXT_PUBLIC_LIVE_DEV === '1') && (
                <LiveDev inline buttonClassName="h-10 w-10" />
              )}
              <Button variant="outline" size="icon" className="h-10 w-10">
                <a href="https://github.com/gtompel" target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <a href="https://t.me/gtompel" target="_blank" rel="noreferrer">
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Telegram</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <main className="flex-1 pt-16" id="main">
        {/* Герой-секция */}
        <section className="overflow-hidden relative pt-24 pb-32 md:pt-32 md:pb-40">

          {/* Яркое свечение за иконкой (видно в обеих темах) */}
          <div aria-hidden="true"
       className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 z-10 w-[520px] h-[520px] blur-3xl opacity-90"
       style={{
         background:
           'radial-gradient(circle at center, rgba(59,130,246,0.85) 0%, rgba(59,130,246,0.35) 25%, rgba(15,23,42,0) 55%)',
         mixBlendMode: 'screen'
       }}
  />
          <div className="container relative z-10 space-y-8">
            <div className="flex flex-col items-center text-center space-y-4 relative z-10">
              <div className="inline-block rounded-full bg-gradient-to-r from-primary to-primary/60 p-1 mb-4 animate-fade-in">
                <div className="rounded-full bg-background p-2">
                  <Code className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h1 className="text-hero bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent animate-fade-in">
                {translations.hero.title}
              </h1>
              <p className="text-subtitle max-w-[700px] animate-fade-in animation-delay-200">
                {translations.hero.subtitle}
              </p>
              <p className="text-muted-foreground max-w-[600px] animate-fade-in animation-delay-400">
                {translations.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 pt-4 animate-fade-in animation-delay-600">
                <Button
                  asChild
                  className="hover:scale-105 transition-transform duration-200 min-h-[44px] px-6 py-3 bg-gradient-to-r from-primary to-primary/80 shadow-lg hover:shadow-xl"
                >
                  <a href="#contact">{translations.hero.primaryCta}</a>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="hover:scale-105 transition-transform duration-200 min-h-[44px] px-6 py-3 border-2"
                >
                  <a href="#projects">{translations.hero.secondaryCta}</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Ключевые показатели */}
        <section className="container py-12 space-y-8" ref={statsRef}>
          <Card className="max-w-4xl mx-auto border-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl md:text-3xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {translations.summary.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 text-center">
                {translations.summary.cards.map((card) => (
                  <div
                    key={card.key}
                    className="space-y-2 p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 transition-all duration-300 group"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-brand group-hover:scale-110 transition-transform duration-300">
                      {renderSummaryValue(card.key)}
                    </div>
                    <div className="text-sm text-muted-foreground">{card.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t">
                <div className="flex flex-wrap justify-center gap-2">
                  {topTechnologies.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Обо мне */}
        <section
          id="about"
          ref={aboutReveal.ref as React.RefObject<HTMLElement>}
          className={`container py-8 md:py-24 transition-all duration-1000 ${
            aboutReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <CollapsibleSection title={translations.about.sectionTitle} className="space-y-8">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="relative">
                <div className="inline-block rounded-full bg-gradient-to-r from-primary to-primary/60 p-1 mb-4 animate-pulse">
                  <div className="rounded-full bg-background p-3">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {translations.about.sectionTitle}
              </h2>
              <div className="max-w-3xl prose-spacing">
                <Card className="p-6 md:p-8 bg-gradient-to-br from-card to-card/50 border-2 shadow-lg">
                  <div className="space-y-4 text-left">{aboutCardElements}</div>
                </Card>
              </div>
            </div>
          </CollapsibleSection>
        </section>

        {/* Навыки */}
        <section
          id="skills"
          ref={skillsReveal.ref as React.RefObject<HTMLElement>}
          className={`container py-8 md:py-24 transition-all duration-1000 ${
            skillsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <CollapsibleSection title={translations.skills.sectionTitle} className="space-y-8">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <GradientIcon className="mb-4" size={48} padding={8}>
                <Code className="h-5 w-5 text-primary" />
              </GradientIcon>
              <h2 className="text-3xl font-bold">{translations.skills.sectionTitle}</h2>
              <p className="text-muted-foreground md:text-xl max-w-[700px]">
                {translations.skills.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {skillsCategories.map((category) => (
                <Card
                  key={category.title}
                  className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      {category.title === 'Frontend' && (
                        <Globe className="h-5 w-5 text-brand group-hover:scale-110 transition-transform duration-200" />
                      )}
                      {category.title === 'Backend' && (
                        <Server className="h-5 w-5 text-brand group-hover:scale-110 transition-transform duration-200" />
                      )}
                      {category.title === 'DevOps' && (
                        <Database className="h-5 w-5 text-brand group-hover:scale-110 transition-transform duration-200" />
                      )}
                      <h3 className="text-xl font-semibold">{category.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((item) => (
                        <Badge key={item}>{item}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12">
              <SkillsProgressionChart />
            </div>
          </CollapsibleSection>
        </section>

        {/* Опыт */}
        <section
          id="experience"
          ref={experienceReveal.ref as React.RefObject<HTMLElement>}
          className={`container py-8 md:py-24 transition-all duration-1000 ${
            experienceReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <CollapsibleSection title={translations.experience.sectionTitle} className="space-y-8">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <GradientIcon className="mb-4" size={48} padding={8}>
                <Briefcase className="h-5 w-5 text-primary" />
              </GradientIcon>
              <h2 className="text-3xl font-bold">{translations.experience.sectionTitle}</h2>
              <p className="text-muted-foreground md:text-xl max-w-[700px]">
                {translations.experience.description}
              </p>
            </div>

            <AchievementTimeline achievements={timeline} />
          </CollapsibleSection>
        </section>

        {/* Проекты */}
        <section
          id="projects"
          ref={projectsReveal.ref as React.RefObject<HTMLElement>}
          className={`container py-8 md:py-24 transition-all duration-1000 ${
            projectsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <GradientIcon className="mb-4" size={48} padding={8}>
              <FileCode className="h-5 w-5 text-primary" />
            </GradientIcon>
            <h2 className="text-3xl font-bold">{translations.projects.sectionTitle}</h2>
            <p className="text-muted-foreground md:text-xl max-w-[700px]">
              {translations.projects.description}
            </p>
          </div>

          <SwipeableProjects projects={projectCards as Project[]} />
        </section>

        {/* Отзывы (условный рендер) */}
        {isHydrated && isTestimonialsVisible && (
          <section
            id="testimonials"
            ref={testimonialsReveal.ref as React.RefObject<HTMLElement>}
            className={`container py-8 md:py-24 transition-all duration-1000 ${
              testimonialsReveal.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <GradientIcon className="mb-4" size={48} padding={8}>
                <Star className="h-5 w-5 text-primary" />
              </GradientIcon>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {translations.testimonials.sectionTitle}
              </h2>
              <p className="text-muted-foreground md:text-xl max-w-[700px]">
                {translations.testimonials.description}
              </p>
            </div>

            <Testimonials testimonials={testimonialsData} />
          </section>
        )}

        {/* Контакты */}
        <section
          id="contact"
          ref={contactReveal.ref as React.RefObject<HTMLElement>}
          className={`container py-8 md:py-24 transition-all duration-1000 ${
            contactReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <CollapsibleSection title={translations.contact.sectionTitle} className="space-y-8">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <GradientIcon className="mb-4" size={48} padding={8}>
                <MessageSquare className="h-5 w-5 text-primary" />
              </GradientIcon>
              <h2 className="text-3xl font-bold">{translations.contact.sectionTitle}</h2>
              <p className="text-muted-foreground md:text-xl max-w-[700px]">
                {translations.contact.description}
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
                        href="https://t.me/gtompel"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors duration-200 hover:underline"
                      >
                        @gtompel
                      </a>
                    </div>
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
                        {translations.contact.form.nameLabel}
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                        placeholder={translations.contact.form.namePlaceholder}
                        autoComplete="name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        {translations.contact.form.emailLabel}
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                        placeholder={translations.contact.form.emailPlaceholder}
                        autoComplete="email"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        {translations.contact.form.messageLabel}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-none"
                        placeholder={translations.contact.form.messagePlaceholder}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="mr-2">{translations.contact.form.buttonLoading}</span>
                          <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                        </>
                      ) : (
                        translations.contact.form.buttonIdle
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </CollapsibleSection>
        </section>
      </main>

      {/* ФУТЕР */}
      <footer className="border-t py-6 md:py-0 bg-muted/50">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            {translations.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/gtompel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground hover:scale-110 transition-all duration-200 p-2 rounded-md min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">{translations.footer.githubLabel}</span>
            </a>
            <a
              href="mailto:quimpik@yandex.ru"
              className="text-muted-foreground hover:text-foreground hover:scale-110 transition-all duration-200 p-2 rounded-md min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">{translations.footer.emailLabel}</span>
            </a>
          </div>
        </div>
      </footer>

      {/* БЫСТРЫЕ ДЕЙСТВИЯ (всплывающая панель) */}
      <QuickActionsBar
        onCVEdit={() => setIsCVEditorOpen(true)}
        onToggleTestimonials={() => setIsTestimonialsVisible(!isTestimonialsVisible)}
        isTestimonialsVisible={isTestimonialsVisible}
      />

      {/* МОДАЛЬНЫЕ ОКНА */}
      <CVEditorModal isOpen={isCVEditorOpen} onClose={() => setIsCVEditorOpen(false)} />
      <CaseStudyModal
        isOpen={isCaseStudyOpen}
        onClose={() => setIsCaseStudyOpen(false)}
        projectName={currentCaseStudy?.title || ''}
        caseStudyData={currentCaseStudy}
      />
    </div>
  );
}
