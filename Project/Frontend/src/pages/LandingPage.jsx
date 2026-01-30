import { Link } from "react-router-dom";
import bgImage from "../assets/background-img/background.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function LandingPage() {
  const { user } = useContext(AuthContext);

  const features = [
    {
      title: "Effortless Reporting",
      description: "Snap a photo, tag the location, and report issues in seconds.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: "Live Status Tracking",
      description: "Stay informed with real-time updates from submission to resolution.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Community Impact",
      description: "Collaborate with neighbors to prioritize and solve local problems.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: "Direct Response",
      description: "Get verified responses and proof of resolution from authorities.",
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
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">

        {/* Background Image & Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>
        <div className="absolute inset-0 z-0 backdrop-blur-[7px]"></div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center text-white">
          <div className="animate-fade-in-up space-y-8">

            {/* Tagline */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 text-sm font-medium text-blue-200">
              <span className="w-2 h-2 rounded-full bg-blue-900 animate-pulse"></span>
              Reimagining Civic Engagement
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl font-black text-black tracking-tight sm:text-7xl lg:text-8xl drop-shadow-2xl">
              Fix Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400">
                Community.
              </span>
            </h1>

            {/* Subheading */}
            <p className="mx-auto max-w-2xl text-xl text-black/90 leading-relaxed font-light">
              The easiest way to report infrastructure issues, track resolutions, and collaborate with local authorities to build a better neighborhood.
            </p>

            {/* Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row pt-6">
              <Link
                to="/report-problem"
                className="group relative rounded-full bg-blue-600 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-blue-500 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] focus:outline-none ring-offset-2 ring-blue-600"
              >
                Start Reporting
              </Link>
              <a
                href="#features"
                className="rounded-full bg-black/10 backdrop-blur-sm border border-black/20 px-8 py-4 text-lg font-bold text-black transition-all hover:bg-black/20 hover:scale-105"
              >
                Learn More
              </a>
            </div>

            {/* Stats Bar */}
            {/* <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 mt-12 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold">5k+</div>
                <div className="text-xs uppercase tracking-widest text-blue-200/70 mt-1">Reports Filed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">98%</div>
                <div className="text-xs uppercase tracking-widest text-blue-200/70 mt-1">Resolution Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">24h</div>
                <div className="text-xs uppercase tracking-widest text-blue-200/70 mt-1">Avg Response</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">120+</div>
                <div className="text-xs uppercase tracking-widest text-blue-200/70 mt-1">Cities Active</div>
              </div>
            </div> */}

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3">
              How It Works
            </h2>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Empowerment in your pocket.
            </h2>
            <p className="mt-6 text-xl text-slate-500 leading-relaxed">
              We've streamlined the entire process from identifying a problem to getting it fixed, keeping you in the loop every step of the way.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative rounded-[2rem] bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/5 border border-slate-100"
              >
                <div className="mb-6 inline-flex items-center justify-center rounded-2xl bg-blue-50 p-4 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm font-medium">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 bg-white">
        <div className="mx-auto max-w-5xl rounded-[3rem] bg-slate-900 px-6 py-24 text-center shadow-2xl shadow-slate-900/20 relative overflow-hidden">

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <svg width="250" height="250" viewBox="0 0 100 100" fill="white">
              <circle cx="50" cy="50" r="40" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 p-12 opacity-5">
            <svg width="250" height="250" viewBox="0 0 100 100" fill="white">
              <rect x="10" y="10" width="80" height="80" />
            </svg>
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-6xl mb-8">
              Ready to improve <br /> your city?
            </h2>
            <p className="mx-auto max-w-lg text-slate-400 text-xl font-medium mb-12">
              Join thousands of active citizens who are making their voices heard.
            </p>

            {user ? (
              <Link
                to="/DashBoard"
                className="inline-flex items-center justify-center rounded-full bg-white px-10 py-5 text-lg font-bold text-slate-900 transition-all hover:bg-blue-50 hover:scale-105 active:scale-95 shadow-xl"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-10 py-5 text-lg font-bold text-white transition-all hover:bg-blue-500 hover:scale-105 active:scale-95 shadow-xl shadow-blue-900/50"
              >
                Create Free Account
              </Link>
            )}

            {!user && (
              <div className="mt-8 text-sm text-slate-500 font-medium">
                Already have an account? <Link to="/login" className="text-white underline hover:text-blue-400">Log in</Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-xl shadow-lg">C</div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">ResolveNow</span>
          </div>
          <p className="text-sm text-slate-500 font-bold">
            © {new Date().getFullYear()} ResolveNow.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm">Privacy</a>
            <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm">Terms</a>
            <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;

