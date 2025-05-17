/* src/index.tsx */
import { render } from 'preact';
import { useLayoutEffect, useState } from 'preact/hooks';
import Morph from './components/Morph';
import './style.css';

export function App() {
  // Determine initial theme based on localStorage or system preference
  const getInitialTheme = () =>
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  const [dark, setDark] = useState(getInitialTheme);

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

  return (
    <div class="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Navbar */}
      <nav class="fixed top-0 w-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-sm z-20">
        <div class="max-w-4xl mx-auto flex items-center justify-between p-4">
          <a href="#intro" class="text-2xl font-bold">
            j1-dev
          </a>
          <ul class="hidden md:flex space-x-6">
            {['Home', 'Projects', 'Contact'].map((section) => (
              <li key={section}>
                <a
                  href={`#${section.toLowerCase()}`}
                  class="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  {section}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setDark(!dark)}
            class="p-2 rounded-full focus:outline-none"
            aria-label="Toggle dark mode">
            {dark ? '☀️' : '🌙'}
          </button>
          {/* Mobile menu placeholder */}
        </div>
      </nav>

      <main class="flex-grow container mx-auto px-4 pt-28 pb-16 space-y-16">
        {/* Intro Section */}
        <section id="intro" class="text-center py-12">
          <h1 class="text-5xl mb-4">
            Hi, I'm{' '}
            <span class="font-sans font-semibold hover:font-black hover:text-6xl transition-all">
              Juan García Marín
            </span>
          </h1>
          <div class="text-xl mb-6">
            <p>I'm a full-stack developer specializing in </p>
            <div class="text-7xl relative h-24">
              <Morph texts={['React', 'Java', 'Docker', 'Integration']} />
            </div>
            <p>
              I'm foccused on building fast, modern web experiences with clean,
              modular code.
            </p>
          </div>
          <div class="flex justify-center space-x-4 mb-6">
            <a
              href="https://github.com/j1-dev"
              target="_blank"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/juan-garcia-marin/"
              target="_blank"
              class="px-4 py-2 border border-gray-500 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              LinkedIn
            </a>
          </div>
          <div class="justify-center flex-wrap grid gap-y-2 gap-x-7 grid-cols-3">
            {skills.map((skill) => (
              <span
                key={skill}
                class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <h2 class="text-3xl md:text-4xl font-bold text-center mb-8">
            Featured Projects
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectList.map((p) => (
              <div
                key={p.title}
                class="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col justify-between">
                <div>
                  <h3 class="text-2xl font-semibold mb-2">
                    <a
                      href={p.url}
                      target="_blank"
                      class="hover:text-blue-600 dark:hover:text-blue-400 transition">
                      {p.title}
                    </a>
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-300">
                    {p.desc}
                  </p>
                </div>
                <a
                  href={p.url}
                  target="_blank"
                  class="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  View Project →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" class="max-w-md mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-center mb-6">
            Get in Touch
          </h2>
          <form
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
            class="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            {['Name', 'Email', 'Message'].map((field, idx) => (
              <label class="block" key={field}>
                <span class="font-medium">{field}</span>
                {field !== 'Message' ? (
                  <input
                    type={field === 'Email' ? 'email' : 'text'}
                    name={field.toLowerCase()}
                    required
                    class="mt-1 block w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
                  />
                ) : (
                  <textarea
                    name="message"
                    rows={5}
                    required
                    class="mt-1 block w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
                  />
                )}
              </label>
            ))}
            <button
              type="submit"
              class="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Send Message
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer class="text-center py-6 text-sm text-gray-500 dark:text-gray-400">
        © 2025 Juan García Marín.
      </footer>
    </div>
  );
}

// Mount the app client-side only
const root = document.getElementById('app');
if (root) render(<App />, root);
