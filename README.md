# @project1 — Портфолио Full‑Stack разработчика (Next.js + App Router)

Современный сайт‑портфолио на Next.js (App Router), React 19, TypeScript и Tailwind CSS. Включает SEO‑метаданные, динамический Open Graph, a11y‑улучшения, аналитики и режим Live Dev Mode.

## Стек

- Next.js 15 / React 19 / TypeScript 5
- Tailwind CSS 3 + shadcn/ui (Radix UI)
- next-themes (тема light/dark)
- @vercel/analytics (по желанию)

## Возможности

- Готовые секции: Главная, Обо мне, Навыки, Опыт, Проекты, Контакты
- Доступность: skip‑links, видимые focus‑стили, поддержка prefers‑reduced‑motion
- SEO: metadata API, динамический OG‑изображение (`/opengraph-image`), `sitemap.xml`, `robots.txt`
- Перфоманс: адаптивные изображения, анимации с уважением к reduced motion, гладкий скролл
- Live Dev Mode: панель с версиями, env/commit, базовыми метриками (TTFB, FCP, DCL, Load)

## Структура

```
app/
  layout.tsx           — общий макет, ThemeProvider, метаданные
  page.tsx             — главная страница (все секции)
  globals.css          — дизайн‑токены, типографика, a11y, motion
  opengraph-image.tsx  — генератор OG (Edge)
  sitemap.ts           — карта сайта (MetadataRoute)
  robots.ts            — robots.txt (MetadataRoute)
  api/live/route.ts    — API для Live Dev Mode
components/
  live-dev.tsx         — клиентская панель Live Dev Mode
  structured-data.tsx  — JSON‑LD schema.org
  theme-provider.tsx   — провайдер темы (next-themes)
  theme-toggle.tsx     — переключатель темы
  ui/*                 — библиотека UI (shadcn/ui + утилиты)
lib/
  case-study-data.ts, cv-data.ts, utils.ts — данные и утилиты
```

## Скрипты

- `npm run dev` — локальная разработка
- `npm run build` — сборка
- `npm run start` — запуск прод‑сборки
- `npm run lint` — линтер

## Переменные окружения

Создайте `.env.local` и задайте:

```
# Базовый публичный URL (используется в sitemap/robots, OG)
NEXT_PUBLIC_SITE_URL=https://youchoice.vercel.app

# Включить Live Dev Mode в проде (по умолчанию включён только в dev)
NEXT_PUBLIC_LIVE_DEV=0
```

Примечание: если `NEXT_PUBLIC_SITE_URL` пустой, `sitemap.xml` и `robots.txt` будут генерироваться с пустыми URL.

## Запуск

```bash
npm i
npm run dev
# откройте http://localhost:3000
```

## Деплой

- Рекомендуется Vercel. Переменные окружения задаются в проекте Vercel.
- OG‑роут работает на Edge Runtime.

## Live Dev Mode

- Кнопка `</>` появляется справа снизу:
  - всегда в `NODE_ENV=development`
  - в проде при `NEXT_PUBLIC_LIVE_DEV=1`
- Источник данных: `GET /api/live` (версии Next/React, Vercel env, commit SHA, список используемых API по зависимостям, время ответа)
- Метрики: считываются из Performance API на клиенте

## SEO

- `app/layout.tsx` — `metadataBase`, `openGraph`, `twitter`
- `app/opengraph-image.tsx` — динамическая OG‑картинка
- `app/sitemap.ts` и `app/robots.ts` — используют `NEXT_PUBLIC_SITE_URL`
- `components/structured-data.tsx` — JSON‑LD (`Person`, проекты)

## A11y/UX

- `globals.css` — focus‑стили, типографика, `@media (prefers-reduced-motion: reduce)`
- В `page.tsx` параллакс отключается при reduced motion, skip‑links для быстрого перехода

## Почта/контакты

- Форма контактов по умолчанию не отправляет запросы на сервер, а предлагает открыть почтовый клиент (mailto). Это намеренно, чтобы избежать лишних бекенд‑зависимостей. Можно заменить на отправку через Route Handler/Server Action (SMTP/Resend) — при необходимости.

## Трюблшутинг

- Hydration mismatch: избегайте чтения `localStorage`/`window` до `useEffect`. В проекте для отзывов (`testimonials`) уже добавлен флаг гидратации.
- Пустой `sitemap`/`robots`: проверьте `NEXT_PUBLIC_SITE_URL`.
- Сообщение в консоли “Launched external handler for 'mailto:…'”: появляется при `mailto:` редиректе — это норма.

## Лицензия

MIT (если не указано иное).
