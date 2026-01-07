

import { Link } from "react-router-dom";

function LandingPage() {
  const features = [
    {
      title: "Report Issues",
      description: "Easily report community problems with photos and precise location data.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    {
      title: "Track Progress",
      description: "Monitor the status of your reports in real-time from submission to resolution.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      title: "Community Driven",
      description: "Join forces with neighbors to prioritize and solve local issues together.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: "Official Response",
      description: "Receive direct updates and feedback from local authorities.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">

      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-slate-50 to-slate-50"></div>
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="animate-fade-in-up">
            <span className="rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600 ring-1 ring-blue-100">
              Build a Better Neighborhood
            </span>
            <h1 className="mt-8 text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl font-display">
              Report Problems. <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                See Them Fixed.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 leading-relaxed">
              Empowering citizens to report distinct community issues like potholes, broken lights, and maintenance needs directly to local authorities.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/report-problem"
                className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-bold text-white transition hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Start Reporting Now
              </Link>
              <a
                href="#features"
                className="rounded-xl border border-slate-200 bg-white px-8 py-4 text-lg font-bold text-slate-700 transition hover:-translate-y-1 hover:border-slate-300 hover:bg-slate-50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2 block"
              >
                Learn How It Works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl font-display">
              Simplified Community Management
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Everything you need to keep your community running smoothly.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className="mb-6 inline-flex items-center justify-center rounded-2xl bg-blue-50 p-4 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-20 text-center shadow-2xl shadow-blue-900/20 sm:px-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h2 className="relative text-3xl font-bold tracking-tight text-white sm:text-5xl font-display">
            Ready to make a difference?
          </h2>
          <p className="relative mx-auto mt-6 max-w-2xl text-blue-100 text-lg">
            Join thousands of active citizens who are already improving their neighborhoods one report at a time.
          </p>
          <div className="relative mt-10">
            <Link
              to="/register"
              className="inline-block rounded-xl bg-white px-10 py-4 text-lg font-bold text-blue-700 transition hover:bg-blue-50 hover:shadow-xl hover:-translate-y-1"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">C</div>
            <span className="text-lg font-bold text-blue-600 font-display">MyCommunity</span>
          </div>
          <p className="text-sm text-slate-500 font-medium">
            © {new Date().getFullYear()} MyCommunity. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors font-medium text-sm">Privacy</a>
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors font-medium text-sm">Terms</a>
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors font-medium text-sm">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;

