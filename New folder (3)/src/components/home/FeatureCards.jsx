import { FiShield, FiBell, FiBarChart2 } from 'react-icons/fi';
import { FEATURE_CARDS } from '../../utils/constants';

const iconMap = {
  FiShield: FiShield,
  FiBell: FiBell,
  FiBarChart2: FiBarChart2,
};

const FeatureCards = () => {
  return (
    <section className="py-20 md:py-28 bg-gray-50 dark:bg-gray-800/50">
      <div className="section-container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Premium Features
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to build secure and scalable authentication systems
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURE_CARDS.map((card, index) => {
            const IconComponent = iconMap[card.icon];
            return (
              <div
                key={card.id}
                className="group animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="card-gradient rounded-2xl p-8 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/20 dark:hover:shadow-primary-500/10 hover:-translate-y-2">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {card.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {card.description}
                  </p>

                  <div className="mt-6 h-1 w-0 bg-gradient-to-r from-primary-600 to-primary-700 group-hover:w-full transition-all duration-300"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
