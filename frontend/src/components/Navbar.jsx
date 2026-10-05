import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LayoutDashboard } from 'lucide-react';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Testimonials', href: '#testimonials' },
];

/**
 * Sticky, responsive navigation bar for the public landing page.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled ? 'bg-white/90 shadow-soft backdrop-blur-md' : 'bg-white/60 backdrop-blur-sm'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-slate-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
            <LayoutDashboard className="h-5 w-5" />
          </span>
          LeadDesk <span className="text-primary-600">Mini</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-slate-600 hover:text-primary-600">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            to="/login"
            className="rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-700"
          >
            Admin Login
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-slate-700 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-slate-600 hover:text-primary-600"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/login"
              className="rounded-xl bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white"
            >
              Admin Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
