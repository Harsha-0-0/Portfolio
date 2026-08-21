import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CustomCursor from './CustomCursor';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* First tab stop on every page — lets keyboard and screen-reader users
          jump the navigation instead of walking through it on each route. */}
      <a href="#main" className="sr-only-focusable">
        Skip to main content
      </a>

      <CustomCursor />
      <Navbar />

      <main id="main" tabIndex={-1} className="relative z-10 pt-20 focus:outline-none">
        {children}
      </main>

      <Footer />
    </>
  );
}
