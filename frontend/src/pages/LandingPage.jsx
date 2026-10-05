import {
  Rocket,
  ShieldCheck,
  BarChart3,
  Search,
  Zap,
  Users,
  ArrowRight,
  Star,
  ClipboardList,
  KanbanSquare,
  TrendingUp,
} from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import LeadForm from '../components/LeadForm.jsx';

const features = [
  { icon: ClipboardList, title: 'Effortless Lead Capture', desc: 'A beautifully simple form that visitors actually complete, feeding leads straight into your dashboard.' },
  { icon: KanbanSquare, title: 'Organized Pipeline', desc: 'Track every lead through New, Contacted, and Closed stages without losing context.' },
  { icon: Search, title: 'Instant Search', desc: 'Find any lead by name or email in milliseconds, even with thousands of records.' },
  { icon: ShieldCheck, title: 'Secure by Design', desc: 'JWT authentication, hashed passwords, and httpOnly cookies keep your data locked down.' },
  { icon: BarChart3, title: 'Live Statistics', desc: 'See total, new, contacted, and closed counts at a glance on your dashboard.' },
  { icon: Zap, title: 'Fast & Lightweight', desc: 'Built on a modern React + Express stack for a snappy experience on any device.' },
];

const whyUs = [
  { icon: Rocket, title: 'Ship Faster', desc: 'A ready-made lead pipeline so your team can focus on selling, not building tools.' },
  { icon: Users, title: 'Built for Teams', desc: 'Simple enough for solo founders, robust enough for growing sales teams.' },
  { icon: TrendingUp, title: 'Grows With You', desc: 'Clean architecture makes it easy to extend as your requirements evolve.' },
];

const steps = [
  { step: '01', title: 'Visitor Submits a Lead', desc: 'A prospect fills out your landing page form with their name, email, budget, and message.' },
  { step: '02', title: 'Lead Lands in Your Dashboard', desc: 'The submission is validated and instantly appears in your secure admin dashboard.' },
  { step: '03', title: 'You Take Action', desc: 'Search, filter, and update lead status as you move prospects through your pipeline.' },
];

const testimonials = [
  { name: 'Amelia Chen', role: 'Founder, Studio Nine', quote: 'LeadDesk Mini replaced three spreadsheets and a sticky-note wall. Our follow-up time dropped dramatically.' },
  { name: 'Marcus Reid', role: 'Sales Lead, Northwind', quote: 'Simple, fast, and exactly what a small team needs to stay on top of inbound leads.' },
  { name: 'Priya Nair', role: 'Operations Manager, Fenwick Co.', quote: 'The dashboard is clean and the status pipeline just makes sense. No onboarding needed.' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-20 pt-16 sm:pt-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700">
              <Zap className="h-4 w-4" /> Lead management, simplified
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Capture, track, and close every lead —{' '}
              <span className="text-primary-600">without the chaos.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-slate-600">
              LeadDesk Mini gives your team a beautiful landing page to capture leads and a
              secure dashboard to manage them, from first contact to closed deal.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#lead-form"
                className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-primary-700"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-50"
              >
                Learn More
              </a>
            </div>
          </div>

          <div id="lead-form" className="animate-fade-in-up rounded-2xl border border-slate-100 bg-white p-8 shadow-soft">
            <h2 className="mb-1 text-xl font-semibold text-slate-900">Get in touch</h2>
            <p className="mb-6 text-sm text-slate-500">Tell us about your project and we'll follow up shortly.</p>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Everything you need to manage leads</h2>
            <p className="mt-4 text-slate-600">Purpose-built features that help you never miss a follow-up.</p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft transition-transform hover:-translate-y-1">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Why choose LeadDesk Mini</h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {whyUs.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-soft">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">How it works</h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="relative rounded-2xl bg-white p-6 shadow-soft">
                <span className="text-4xl font-bold text-primary-100">{step}</span>
                <h3 className="mt-3 font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Loved by early teams</h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {testimonials.map(({ name, role, quote }) => (
              <div key={name} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm italic text-slate-600">"{quote}"</p>
                <p className="mt-4 text-sm font-semibold text-slate-900">{name}</p>
                <p className="text-xs text-slate-500">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-primary-600 px-8 py-16 text-center shadow-soft">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to organize your leads?</h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-100">
            Submit the form above to see LeadDesk Mini in action, or log in as an admin to explore the dashboard.
          </p>
          <a
            href="#lead-form"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-primary-700 shadow-sm hover:bg-primary-50"
          >
            Submit a Lead <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
