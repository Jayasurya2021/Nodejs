import { useAuth } from '../../hooks/useAuth';
import { HERO_CONTENT } from '../../utils/constants';

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10 dark:opacity-5"></div>

      {/* Floating elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 dark:bg-primary-900/30 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200 dark:bg-accent-900/30 rounded-full blur-3xl opacity-20"></div>

      <div className="section-container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            {HERO_CONTENT.title}
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
            {HERO_CONTENT.subtitle}
          </p>

          {user && (
            <div className="mb-8 p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg">
              <p className="text-primary-700 dark:text-primary-300 font-medium">
                Welcome, <span className="font-bold">{user.fullName}!</span>
              </p>
              <p className="text-sm text-primary-600 dark:text-primary-400 mt-1">
                You're successfully logged in. Explore our premium features below.
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="btn-primary">
              {HERO_CONTENT.cta_primary}
            </button>
            <button className="btn-secondary">
              {HERO_CONTENT.cta_secondary}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
