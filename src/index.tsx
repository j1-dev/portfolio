import './i18n';
import { render } from 'preact';
import { useLayoutEffect, useState } from 'preact/hooks';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './i18n';
import Morph from './components/Morph';
import './style.css';

function App() {
  const { t, i18n } = useTranslation();

  // Determine initial theme based on localStorage or system preference
  const getInitialTheme = () =>
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  const [dark, setDark] = useState(getInitialTheme);
  const [lang, setLang] = useState(i18n.language);

  // Apply theme class and save to localStorage on change
  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.theme = dark ? 'dark' : 'light';
  }, [dark]);

  const projectList = [
    {
      title: 'j1.wtf',
      desc: 'Realtime twitter-like web app made with React & Firebase.',
      url: '#',
    },
    {
      title: 'Intellipic',
      desc: 'AI-powered image generator with fine-tuning.',
      url: 'https://github.com/j1-dev/intellipic',
    },
    {
      title: 'Erasmus Project at CGI',
      desc: 'Full-stack app with Spring Boot, Angular, PostgreSQL, Docker.',
      url: '#',
    },
    {
      title: 'Leelo',
      desc: 'Reddit-like mobile app using React Native & Supabase.',
      url: 'https://github.com/j1-dev/leelo',
    },
    {
      title: 'Seal',
      desc: 'Next.js 15 & Supabase remake of my first project.',
      url: 'https://github.com/j1-dev/seal',
    },
  ];

  const skills = [
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
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLang(lng);
  };

  return (
    <div class="flex flex-col min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav class="fixed top-0 w-full bg-popover/70 backdrop-blur-sm shadow-sm z-20">
        <div class="max-w-4xl mx-auto flex items-center justify-between p-4">
          <a href="#intro" class="text-4xl font-black">
            J1
          </a>
          <ul class="hidden md:flex space-x-6">
            {['home', 'projects', 'contact'].map((key) => (
              <li key={key}>
                <a
                  href={`#${key}`}
                  class="transition text-secondary-foreground hover:text-accent">
                  {t(key)}
                </a>
              </li>
            ))}
          </ul>
          <div class="flex items-center space-x-2">
            <button
              onClick={() => setDark(!dark)}
              class="p-2 rounded-full focus:outline-none text-primary"
              aria-label="Toggle dark mode">
              {dark ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => changeLanguage(lang === 'en' ? 'es' : 'en')}
              class="px-2 py-1 border rounded">
              {lang.toUpperCase()}
            </button>
          </div>
        </div>
      </nav>

      <main class="flex-grow container mx-auto px-4 pt-28 pb-16 space-y-16">
        {/* Intro Section */}
        <section id="intro" class="text-center py-12">
          <h1 class="text-5xl mb-4">
            {t('greeting', { name: 'Juan García Marín' })}
          </h1>
          <div class="text-xl mb-6">
            <p>{t('tagline')}</p>
            <div class="text-7xl relative h-24">
              <Morph
                texts={
                  t('specializations', { returnObjects: true }) as string[]
                }
              />
            </div>
          </div>
          <div class="flex justify-center space-x-4 mb-6">
            <a
              href="https://github.com/j1-dev"
              target="_blank"
              class="px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-accent transition">
              {t('github')}
            </a>
            <a
              href="https://www.linkedin.com/in/juan-garcia-marin/"
              target="_blank"
              class="px-4 py-2 rounded border border-border text-secondary-foreground hover:bg-secondary transition">
              {t('linkedin')}
            </a>
          </div>
          <div class="grid grid-cols-3 gap-x-7 gap-y-2 justify-center">
            {skills.map((skill) => (
              <span
                key={skill}
                class="px-3 py-1 rounded text-sm bg-muted text-muted-foreground">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <h2 class="text-3xl md:text-4xl font-bold text-center mb-8">
            {t('featuredProjects')}
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectList.map((p) => (
              <div
                key={p.title}
                class="p-6 flex flex-col justify-between rounded-xl shadow hover:shadow-lg transition bg-card text-card-foreground">
                <div>
                  <h3 class="text-2xl font-semibold mb-2">
                    <a
                      href={p.url}
                      target="_blank"
                      class="transition text-primary hover:text-accent">
                      {p.title}
                    </a>
                  </h3>
                  <p class="text-secondary-foreground">{p.desc}</p>
                </div>
                <a
                  href={p.url}
                  target="_blank"
                  class="mt-4 inline-block text-sm transition text-accent hover:underline">
                  {t('viewProject', { defaultValue: 'View Project →' })}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" class="max-w-md mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-center mb-6">
            {t('getInTouch')}
          </h2>
          <form
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
            class="space-y-4 p-6 rounded-xl shadow-lg bg-card text-card-foreground">
            {['name', 'email', 'message'].map((field) => (
              <label class="block" key={field}>
                <span class="font-medium">{t(field)}</span>
                {field !== 'message' ? (
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    required
                    class="mt-1 block w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground"
                  />
                ) : (
                  <textarea
                    name="message"
                    rows={5}
                    required
                    class="mt-1 block w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground"
                  />
                )}
              </label>
            ))}
            <button class="w-full py-3 rounded-lg bg-primary text-primary-foreground hover:bg-accent transition">
              {t('sendMessage')}
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer class="text-center py-6 text-sm text-secondary-foreground">
        {t('footerText', { author: 'Juan García Marín' })}
      </footer>
    </div>
  );
}

// Mount the app client-side only
const root = document.getElementById('app');
if (root)
  render(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>,
    root
  );
