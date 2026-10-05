import { LayoutDashboard, Twitter, Linkedin, Github } from 'lucide-react';

/**
 * Footer for the public landing page.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
                <LayoutDashboard className="h-5 w-5" />
              </span>
              LeadDesk <span className="text-primary-600">Mini</span>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              A lightweight lead management system for modern sales teams.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-900">Product</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#features" className="hover:text-primary-600">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-primary-600">How It Works</a></li>
              <li><a href="#testimonials" className="hover:text-primary-600">Testimonials</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-900">Company</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-primary-600">About</a></li>
              <li><a href="#" className="hover:text-primary-600">Contact</a></li>
              <li><a href="#" className="hover:text-primary-600">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-900">Follow Us</h4>
            <div className="flex gap-3">
              <a href="#" aria-label="Twitter" className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-primary-50 hover:text-primary-600">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-primary-50 hover:text-primary-600">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" aria-label="GitHub" className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-primary-50 hover:text-primary-600">
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6 text-center text-sm text-slate-400">
          © {year} LeadDesk Mini. Built as an internship qualification project.
        </div>
      </div>
    </footer>
  );
}
