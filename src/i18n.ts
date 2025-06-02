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
      downloadCV: 'Download CV',
      // Intro
      greeting: "Hi, I'm ",
      tagline: 'I build fast, modern web experiences with clean, modular code.',
      specializations: ['React', 'Java', 'Docker', 'Integration'],
      // Projects and skills
      projectList: [
        {
          title: 'j1.wtf',
          desc: 'Realtime twitter-like web app made with React & Firebase.',
          full_description:
            'This webapp was my first real coding project. I learned about the basics of react, hooks, the virtual DOM and different ways of routing. For the back-end I chose Firebase because it came with all I needed: Auth, storage and Database. Firebase uses it`s own non relational database called Firestore, which is a document based database similar to mongoDB.',
          url: 'https://j1-old.vercel.app/',
          pic_url: '/j1wtf.png',
        },
        {
          title: 'Intellipic',
          desc: 'AI-powered image generator with fine-tuning.',
          full_description:
            'Back when Text to Image AIs where starting to become a thing, a friend and I thought of this app idea, inspired by Lensa. We wanted to create AI avatars for social media. We used Next.js and Supabase and for the AI we ended up using Replicate, a SaaS that allows us to finetune and infere AI models that used a base image of Stable Diffusion XL.',
          url: 'https://intellipic.vercel.app/',
          pic_url: '/intellipic.png',
        },
        {
          title: 'Erasmus Project at CGI',
          desc: 'Full-stack app with Spring Boot, Angular, PostgreSQL, Docker.',
          full_description:
            'This was my Internship Project that I made along three other colleagues. The idea was to make an app that allowed HR employees to construct standardized job proposals for controlled salary estimation calculations. We used Angular for the front-end, Java Springboot for the back-end connected to postgress, all containerized with docker along another microservice to display the job proposals in a downloadable PDF.',
          url: 'https://github.com/j1-dev/erasmus',
          pic_url: '/CGI.png',
        },
        {
          title: 'Leelo',
          desc: 'Reddit-like mobile app using React Native & Supabase.',
          full_description:
            'Leelo was my degree`s final project. This app allowed the user to create forum boards for an specific theme (sports, nature, music) as well as post, comment and rate content on any forum. It was made using React Native for the front-end and Supabase for the back-end.',
          url: 'https://github.com/j1-dev/leelo',
          pic_url: 'leelo.png',
        },
        {
          title: 'Seal',
          desc: 'Next.js 15 & Supabase remake of my first project.',
          full_description:
            'Seal is my latest project and I decided to make it as a way to see what would happen if I was to implement my first project idea again. I used Next.js instead of React and Supabase instead of Firebase, because I wanted to use an SQL database this time. ',
          url: 'https://the-seal.vercel.app/',
          pic_url: 'seal.png',
        },
        {
          title: 'Intellipic-lite',
          desc: 'Lightweight version of Intellipic with Next.js and Supabase.',
          full_description:
            'Intellipic-lite is a simplified version of the original Intellipic app, built with Next.js and Supabase. It retains the core functionality of AI-generated avatars while streamlining the user experience and reducing resource consumption.',
          url: 'https://intellipic-lite.vercel.app/',
          pic_url: 'intellipic-lite.png',
        },
      ],
      skills: [
        'TypeScript',
        'Angular',
        'React',
        'Next.js',
        'TailwindCSS',
        'Java',
        'Spring Framework',
        'PostgreSQL',
        'MySQL',
        'Docker',
        'Microservices',
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
      downloadCV: 'Descargar CV',
      // Intro
      greeting: 'Hola, soy ',
      tagline:
        'Construyo experiencias web rápidas y modernas con código limpio y modular.',
      specializations: ['React', 'Java', 'Docker', 'Integración'],
      // Projects and skills
      projectList: [
        {
          title: 'j1.wtf',
          desc: 'Aplicación web en tiempo real tipo Twitter hecha con React y Firebase.',
          full_description:
            'Esta webapp fue mi primer proyecto de programación de verdad. Aprendí los conceptos básicos de React, los hooks, el Virtual DOM y distintas formas de enrutar la aplicación. Para el backend elegí Firebase porque ya incluía todo lo que necesitaba: autenticación, almacenamiento y base de datos. Firebase usa su propia base de datos no relacional llamada Firestore, que es una base de datos de documentos similar a MongoDB.',
          url: 'https://j1-old.vercel.app/',
          pic_url: '/j1wtf.png',
        },
        {
          title: 'Intellipic',
          desc: 'Generador de imágenes con IA y fine-tuning.',
          full_description:
            'Cuando las IA de texto a imagen empezaban a popularizarse, un amigo y yo pensamos en esta idea de app, inspirada en Lensa. Queríamos crear avatares generados por IA para redes sociales. Usamos Next.js y Supabase, y para la IA terminamos empleando Replicate, un servicio SaaS que nos permite afinar modelos y generar inferencias a partir de una base de Stable Diffusion XL.',
          url: 'https://intellipic.vercel.app/',
          pic_url: '/intellipic.png',
        },
        {
          title: 'Erasmus Project at CGI',
          desc: 'App full-stack con Spring Boot, Angular, PostgreSQL y Docker.',
          full_description:
            'Este fue mi proyecto de prácticas, realizado junto a tres compañeros. La idea era crear una aplicación que permitiera a RR. HH. construir propuestas de empleo estandarizadas para cálculos controlados de estimación salarial. Usamos Angular en el frontend, Java Spring Boot en el backend conectado a PostgreSQL, todo containerizado con Docker, y añadimos otro microservicio para generar las propuestas en PDF descargable.',
          url: 'https://github.com/j1-dev/erasmus',
          pic_url: '/CGI.png',
        },
        {
          title: 'Leelo',
          desc: 'App móvil tipo Reddit usando React Native y Supabase.',
          full_description:
            'Leelo fue mi proyecto final de grado. Esta app permitía al usuario crear foros temáticos (deportes, naturaleza, música), así como publicar, comentar y votarlo todo en cualquier foro. Se desarrolló con React Native en el frontend y Supabase en el backend.',
          url: 'https://github.com/j1-dev/leelo',
          pic_url: '/leelo.png',
        },
        {
          title: 'Seal',
          desc: 'Remake con Next.js 15 y Supabase de mi primer proyecto.',
          full_description:
            'Seal es mi proyecto más reciente y lo hice para ver qué pasaría si volviera a implementar la idea de mi primer proyecto. En lugar de React usé Next.js, y en vez de Firebase utilicé Supabase, porque esta vez quería trabajar con una base de datos SQL.',
          url: 'https://the-seal.vercel.app/',
          pic_url: '/seal.png',
        },
        {
          title: 'Intellipic-lite',
          desc: 'Versión ligera de Intellipic con Next.js y Supabase.',
          full_description:
            'Intellipic-lite es una versión simplificada de la aplicación original Intellipic, construida con Next.js y Supabase. Mantiene la funcionalidad principal de generación de avatares por IA mientras optimiza la experiencia del usuario y reduce el consumo de recursos.',
          url: 'https://intellipic-lite.vercel.app/',
          pic_url: '/intellipic-lite.png',
        },
      ],
      skills: [
        'TypeScript',
        'Angular',
        'React',
        'Next.js',
        'TailwindCSS',
        'Java',
        'Spring Framework',
        'PostgreSQL',
        'MySQL',
        'Docker',
        'Microservicios',
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
