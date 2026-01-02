import { useState } from "react";

function LandingPage() {
  const [isAuthenticated] = useState(false);

  const features = [
    {
      title: "Report Issues",
      description:
        "Easily report problems in your community with photos and location details.",
    },
    {
      title: "Track Progress",
      description:
        "Follow the status of your reports from submission to resolution.",
    },
    {
      title: "Community Driven",
      description:
        "Join your neighbors in making your community a better place.",
    },
    {
      title: "Official Response",
      description:
        "Get updates directly from officials handling your reports.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 text-center animate-fade-in">
        <h2 className="mx-auto max-w-4xl text-4xl font-bold text-gray-900 transition-all duration-700">
          Report Problems.{" "}
          <span className="text-blue-600">Track Progress.</span>{" "}
          Improve Your Community.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 opacity-90">
          CommunityFix helps citizens report and resolve issues like potholes,
          water leaks, and broken street lights.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button className="rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 hover:scale-105 transition-transform">
            Start Reporting
          </button>
          <button className="rounded-md border px-6 py-3 text-gray-700 hover:bg-gray-100 hover:scale-105 transition-transform">
            Sign In
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <h3 className="text-center text-3xl font-bold text-gray-900">
            How It Works
          </h3>
          <p className="mt-4 text-center text-gray-600">
            Simple steps to make your community better
          </p>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="rounded-lg border bg-gray-50 p-6 
                           transform transition-all duration-300
                           hover:-translate-y-2 hover:shadow-lg"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <h4 className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </h4>
                <p className="mt-2 text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-blue-50">
        <h3 className="text-3xl font-bold text-gray-900">
          Ready to improve your community?
        </h3>
        <p className="mt-4 text-gray-600">
          Join thousands of citizens making their neighborhoods better.
        </p>
        <button className="mt-8 rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 hover:scale-105 transition-transform">
          Create Free Account
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-gray-500">
        © 2024 CommunityFix. All rights reserved.
      </footer>
    </div>
  );
}

export default LandingPage;
