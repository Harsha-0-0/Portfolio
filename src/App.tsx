import { useEffect } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Skills from '@/pages/Skills';
import Projects from '@/pages/Projects';
import Education from '@/pages/Education';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import { profile } from '@/data/content';

/** Per-route document titles — an SPA that never updates <title> leaves screen
 *  readers and browser history announcing the same page name everywhere. */
const TITLES: Record<string, string> = {
  '/': `${profile.name} — ${profile.title}, Sydney`,
  '/about': `About — ${profile.name}`,
  '/skills': `Skills — ${profile.name}`,
  '/projects': `Projects — ${profile.name}`,
  '/education': `Education & Experience — ${profile.name}`,
  '/contact': `Contact — ${profile.name}`,
};

function RouteEffects() {
  const [location] = useLocation();

  useEffect(() => {
    document.title = TITLES[location] ?? `Page not found — ${profile.name}`;
    // Wouter keeps the scroll position across route changes; reset it so a new
    // page starts at the top rather than mid-way down the previous one.
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location]);

  return null;
}

export default function App() {
  return (
    <Layout>
      <RouteEffects />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/skills" component={Skills} />
        <Route path="/projects" component={Projects} />
        <Route path="/education" component={Education} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}
