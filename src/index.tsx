import './i18n';
import { render } from 'preact';
import { useLayoutEffect, useState, useEffect } from 'preact/hooks';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './i18n';
import Morph from './components/Morph';
import './style.css';
import { TiltCard } from './components/TiltCard';

function App() {
  const { t, i18n } = useTranslation();
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  // Fade-in modal when selectedProject changes
  useEffect(() => {
    if (selectedProject) {
      // small timeout to trigger CSS transition
      requestAnimationFrame(() => setShowModal(true));
    }
  }, [selectedProject]);

  // Load translated lists or fall back
  const projectList =
    (t('projectList', { returnObjects: true }) as any[]) || [];
  const skills = (t('skills', { returnObjects: true }) as string[]) || [];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLang(lng);
  };

  const closeModal = () => {
    setShowModal(false);
    // wait for fade-out then clear selection
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <div class="flex flex-col min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav class="fixed top-0 w-full bg-popover/70 backdrop-blur-sm shadow-sm z-20">
        <div class="max-w-4xl mx-auto flex items-center justify-between p-4">
          <a href="#intro" class="text-4xl font-black">
            <img src={'/public/j1.png'} width={48} class="rounded-full"/>
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
            {t('greeting')}{' '}
            <span class="font-sans font-semibold hover:font-black hover:text-6xl transition-all text-primary">
              Juan García Marín
            </span>
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
                {t(skill, { defaultValue: skill })}
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
              <TiltCard key={p.title} options={{ max: 20, speed: 500 }}>
                <div
                  onClick={() => setSelectedProject(p)}
                  class="cursor-pointer p-6 flex flex-col justify-between rounded-xl shadow-lg transition hover:shadow-2xl bg-card text-card-foreground">
                  <h3 class="text-2xl font-semibold mb-2">
                    {t(p.title, { defaultValue: p.title })}
                  </h3>
                  <p class="text-secondary-foreground">
                    {t(p.desc, { defaultValue: p.desc })}
                  </p>
                  <span class="mt-4 text-sm transition text-accent hover:underline">
                    {t('viewProject')}
                  </span>
                </div>
              </TiltCard>
            ))}
          </div>

          {/* Modal with fade-in/out */}
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
                  showModal ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={closeModal}
              />
              <div
                className={`bg-card text-card-foreground p-6 rounded-xl max-w-lg w-full shadow-lg relative transform transition-all duration-300 ${
                  showModal ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}>
                <button
                  onClick={closeModal}
                  class="absolute top-3 right-3 text-xl font-bold text-foreground">
                  ✕
                </button>
                <h3 class="text-2xl font-bold mb-2">
                  {t(selectedProject.title)}
                </h3>
                <p class="mb-4 text-secondary-foreground">
                  {t(selectedProject.desc)}
                </p>
                <a
                  href={selectedProject.url}
                  target="_blank"
                  class="text-accent hover:underline">
                  {t('visitProject')}
                </a>
              </div>
            </div>
          )}
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
