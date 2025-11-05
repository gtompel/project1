export interface CVData {
  personal: {
    name: string;
    title: string;
    email: string;
    github: string;
    telegram: string;
  };
  skills: {
    frontend: string;
    backend: string;
    devops: string;
    additional: string;
  };
  experience: Array<{
    company: string;
    period: string;
    position: string;
    description: string;
  }>;
  projects: string[];
}

export const cvData: CVData = {
  personal: {
    name: 'Юрий Королёв',
    title: 'Full Stack Web Developer',
    email: 'quimpik@yandex.ru',
    github: 'github.com/gtompel',
    telegram: '@gtompel'
  },
  skills: {
    frontend: 'JavaScript, TypeScript, React, Next.js, Tailwind CSS',
    backend: 'Node.js, Nest.js, Express, PostgreSQL, SQLite',
    devops: 'Docker, Git, CI/CD, Nginx, Linux',
    additional: 'Python, HTML, CSS'
  },
  experience: [
    {
      company: 'ФГУП НИТИ им. А.П. Александрова',
      period: 'окт 2022 - наст. вр.',
      position: 'Инженер-программист',
      description: 'Разработка веб-приложений на React, Next.js'
    },
    {
      company: 'Индивидуальное предпринимательство',
      period: 'май 2019 - сен 2022',
      position: 'Инженер-проектировщик',
      description: 'Проектирование систем безопасности'
    },
    {
      company: 'ООО "Трекон"',
      period: 'апр 2018 - янв 2019',
      position: 'Руководитель проектного отдела',
      description: 'Управление проектами безопасности'
    }
  ],
  projects: [
    'Портал АРМ - Система управления автоматизированными рабочими местами',
    'HR Система - Управление человеческими ресурсами',
    'Duel2Hero - Игровое приложение для соревнований'
  ]
};
