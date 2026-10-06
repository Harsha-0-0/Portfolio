import { useEffect } from 'react';
import { Redirect, Route, Router, Switch, useLocation } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Skills from '@/pages/Skills';
import Projects from '@/pages/Projects';
import Experience from '@/pages/Experience';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import { profile } from '@/data/content';

/** Per-route document titles. An SPA that never updates <title> leaves screen
 *  readers and browser history announcing the same page name everywhere. */
const TITLES: Record<string, string> = {
  '/': `${profile.name} · ${profile.title}, Sydney`,
  '/about': `About · ${profile.name}`,
  '/skills': `Skills · ${profile.name}`,
  '/projects': `Projects · ${profile.name}`,
  '/experience': `Experience & Education · ${profile.name}`,
  '/contact': `Contact · ${profile.name}`,
};

function RouteEffects() {
  const [location] = useLocation();

  useEffect(() => {
    document.title = TITLES[location] ?? `Page not found · ${profile.name}`;
    // Wouter keeps the scroll position across route changes; reset it so a new
    // page starts at the top rather than mid-way down the previous one.
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location]);

  return null;
}

/** Vite's base ("/" or "/Portfolio/") minus the trailing slash, because wouter wants
 *  "/Portfolio", and an empty string when the site is served from the root. */
const routerBase = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Hash routing is opt-in for single-file preview builds, where there is no
 *  server to rewrite unknown paths back to index.html. */
const useHash = import.meta.env.VITE_HASH_ROUTING === 'true';

export default function App() {
  return (
    <Router base={useHash ? '' : routerBase} hook={useHash ? useHashLocation : undefined}>
      <Layout>
        <RouteEffects />
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/skills" component={Skills} />
          <Route path="/projects" component={Projects} />
          <Route path="/experience" component={Experience} />
          {/* The page was /education until it grew to cover the roles as well.
              Anything already linking to the old path still lands on it. */}
          <Route path="/education">
            <Redirect to="/experience" replace />
          </Route>
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
}
