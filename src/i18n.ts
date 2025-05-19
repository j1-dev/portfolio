import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navbar
      home: 'Home',
      projects: 'Projects',
      contact: 'Contact',
      // Intro
      greeting: "Hi, I'm ",
      tagline: 'I build fast, modern web experiences with clean, modular code.',
      specializations: ['React', 'Java', 'Docker', 'Integration'],
      // Projects and skills
      projectList: [
        {
          title: 'j1.wtf',
          desc: 'Realtime twitter-like web app made with React & Firebase.',
          url: 'https://j1-old.vercel.app/Login',
        },
        {
          title: 'Intellipic',
          desc: 'AI-powered image generator with fine-tuning.',
          url: 'https://intellipic.vercel.app/',
        },
        {
          title: 'Erasmus Project at CGI',
          desc: 'Full-stack app with Spring Boot, Angular, PostgreSQL, Docker.',
          url: 'https://github.com/j1-dev/erasmus',
        },
        {
          title: 'Leelo',
          desc: 'Reddit-like mobile app using React Native & Supabase.',
          url: 'https://github.com/j1-dev/leelo',
        },
        {
          title: 'Seal',
          desc: 'Next.js 15 & Supabase remake of my first project.',
          url: 'https://the-seal.vercel.app/',
        },
      ],
      skills: [
        'TypeScript',
        'React',
        'Next.js',
        'Angular',
        'TailwindCSS',
        'Java',
        'Spring Framework',
        'PostgreSQL',
        'MySQL',
        'Docker',
        'Microservices Integration',
      ],
      // Buttons
      github: 'GitHub',
      linkedin: 'LinkedIn',
      viewProject: 'View Project →',
      visitProject: 'Visit project →',
      // Section titles
      featuredProjects: 'Featured Projects',
      getInTouch: 'Get in Touch',
      sendMessage: 'Send Message',
      // Form fields
      name: 'Name',
      email: 'Email',
      message: 'Message',
      // Footer
      footerText: '© 2025 {{author}}.',
    },
  },
  es: {
    translation: {
      // Navbar
      home: 'Inicio',
      projects: 'Proyectos',
      contact: 'Contacto',
      // Intro
      greeting: 'Hola, soy ',
      tagline:
        'Construyo experiencias web rápidas y modernas con código limpio y modular.',
      specializations: ['React', 'Java', 'Docker', 'Integración'],
      // Projects and skills
      projectList: [
        {
          title: 'j1.wtf',
          desc: 'Aplicación web en tiempo real similar a Twitter con React y Firebase.',
          url: 'https://j1-old.vercel.app/Login',
        },
        {
          title: 'Intellipic',
          desc: 'Generador de imágenes con IA y fine-tuning.',
          url: 'https://intellipic.vercel.app/',
        },
        {
          title: 'Proyecto Erasmus en CGI',
          desc: 'Aplicación full-stack con Spring Boot, Angular, PostgreSQL y Docker.',
          url: 'https://github.com/j1-dev/erasmus',
        },
        {
          title: 'Leelo',
          desc: 'App móvil tipo Reddit usando React Native y Supabase.',
          url: 'https://github.com/j1-dev/leelo',
        },
        {
          title: 'Seal',
          desc: 'Remake con Next.js 15 y Supabase de mi primer proyecto.',
          url: 'https://the-seal.vercel.app/',
        },
      ],
      skills: [
        'TypeScript',
        'React',
        'Next.js',
        'Angular',
        'TailwindCSS',
        'Java',
        'Spring Framework',
        'PostgreSQL',
        'MySQL',
        'Docker',
        'Integración de Microservicios',
      ],
      // Buttons
      github: 'GitHub',
      linkedin: 'LinkedIn',
      viewProject: 'Ver Proyecto →',
      visitProject: 'Visitar proyecto →',
      // Section titles
      featuredProjects: 'Proyectos Destacados',
      getInTouch: 'Contáctame',
      sendMessage: 'Enviar Mensaje',
      // Form fields
      name: 'Nombre',
      email: 'Correo',
      message: 'Mensaje',
      // Footer
      footerText: '© 2025 {{author}}.',
    },
  },
};

// Initialize i18next
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en', // fallback when translation key is missing
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
