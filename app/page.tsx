import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Github,
  Linkedin,
  Send,
  Mail,
  TextIcon as Telegram,
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

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string; // Этот параметр необязателен
}

export default function Home() {
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

        {/* About Section */}
        <section id="about" className="container py-12 md:py-24 space-y-8">
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
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="container py-12 md:py-24 space-y-8 bg-muted/50"
        >
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
        </section>

        {/* Experience Section */}
        <section id="experience" className="container py-12 md:py-24 space-y-8">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <div className="inline-block rounded-lg bg-muted p-1.5 mb-4">
              <Briefcase className="h-5 w-5" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Опыт работы
            </h2>
            <p className="text-muted-foreground md:text-xl max-w-[700px]">
              Мой профессиональный путь и достижения
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <div className="md:w-1/3">
                <h3 className="text-xl font-semibold">
                  ФГУП НИТИ им. А.П. Александрова
                </h3>
                <p className="text-muted-foreground">
                  Октябрь 2022 — настоящее время
                </p>
                <p className="font-medium">Инженер-программист</p>
              </div>
              <div className="md:w-2/3">
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Разработка веб-приложений с использованием React, Next.js
                  </li>
                  <li>
                    Создание и поддержка бэкенда на Node.js, Nest.js, Express
                  </li>
                  <li>Работа с базами данных PostgreSQL, SQLite</li>
                  <li>Настройка и поддержка CI/CD процессов</li>
                  <li>Контейнеризация приложений с использованием Docker</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <div className="md:w-1/3">
                <h3 className="text-xl font-semibold">
                  Индивидуальное предпринимательство / фриланс
                </h3>
                <p className="text-muted-foreground">
                  Май 2019 — Сентябрь 2022
                </p>
                <p className="font-medium">
                  Инженер-проектировщик слаботочных систем
                </p>
              </div>
              <div className="md:w-2/3">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Проектирование и внедрение систем контроля доступа</li>
                  <li>
                    Автоматизация мониторинга и управления системами
                    безопасности
                  </li>
                  <li>Проектирование систем видеонаблюдения</li>
                  <li>Разработка комплексных систем безопасности</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <div className="md:w-1/3">
                <h3 className="text-xl font-semibold">ООО "Трекон"</h3>
                <p className="text-muted-foreground">
                  Апрель 2018 — Январь 2019
                </p>
                <p className="font-medium">Руководитель проектного отдела</p>
              </div>
              <div className="md:w-2/3">
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Проектирование интегрированных комплексов безопасности
                  </li>
                  <li>Разработка индивидуальных решений под заказчика</li>
                  <li>Программирование на Python</li>
                  <li>Веб-разработка на JavaScript, HTML, CSS</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="container py-12 md:py-24 space-y-8 bg-muted/50"
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

          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="web">Веб-разработка</TabsTrigger>
                <TabsTrigger value="backend">Бэкенд</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProjectCard
                  title="Корпоративный портал"
                  description="Внутренний портал компании с системой управления задачами и документами"
                  tags={["Next.js", "React", "PostgreSQL"]}
                  imageUrl="/placeholder.svg?height=200&width=400"
                />
                <ProjectCard
                  title="Система мониторинга"
                  description="Приложение для мониторинга и визуализации данных в реальном времени"
                  tags={["React", "Node.js", "WebSockets"]}
                  imageUrl="/placeholder.svg?height=200&width=400"
                />
                <ProjectCard
                  title="API для интеграции"
                  description="REST API для интеграции различных систем и сервисов"
                  tags={["Express", "PostgreSQL", "Docker"]}
                  imageUrl="/placeholder.svg?height=200&width=400"
                />
              </div>
            </TabsContent>

            <TabsContent value="web" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProjectCard
                  title="Корпоративный портал"
                  description="Внутренний портал компании с системой управления задачами и документами"
                  tags={["Next.js", "React", "PostgreSQL"]}
                  imageUrl="/placeholder.svg?height=200&width=400"
                />
                <ProjectCard
                  title="Система мониторинга"
                  description="Приложение для мониторинга и визуализации данных в реальном времени"
                  tags={["React", "Node.js", "WebSockets"]}
                  imageUrl="/placeholder.svg?height=200&width=400"
                />
              </div>
            </TabsContent>

            <TabsContent value="backend" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProjectCard
                  title="API для интеграции"
                  description="REST API для интеграции различных систем и сервисов"
                  tags={["Express", "PostgreSQL", "Docker"]}
                  imageUrl="/placeholder.svg?height=200&width=400"
                />
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Contact Section */}
        <section id="contact" className="container py-12 md:py-24 space-y-8">
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
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
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
    </div>
  );
}

function ProjectCard({ title, description, tags, imageUrl }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover transition-all hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <Badge key={i} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
