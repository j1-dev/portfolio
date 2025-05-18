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
      greeting: "Hi, I'm {{name}}",
      tagline: 'I build fast, modern web experiences with clean, modular code.',
      specializations: ['React', 'Java', 'Docker', 'Integration'],
      // Buttons
      github: 'GitHub',
      linkedin: 'LinkedIn',
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
      greeting: 'Hola, soy {{name}}',
      tagline:
        'Construyo experiencias web rápidas y modernas con código limpio y modular.',
      specializations: ['React', 'Java', 'Docker', 'Integración'],
      // Buttons
      github: 'GitHub',
      linkedin: 'LinkedIn',
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
