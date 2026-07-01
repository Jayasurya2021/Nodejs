import { useTheme } from '../../hooks/useTheme';

const AuthLayout = ({ children, title, subtitle }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-8 ${
      isDarkMode
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
        : 'bg-gradient-auth'
    }`}>
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-white'
          }`}>
            AuthHub
          </h1>
          {title && (
            <h2 className={`text-xl font-semibold mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-white/90'
            }`}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-white/70'
            }`}>
              {subtitle}
            </p>
          )}
        </div>

        <div className="glass-card p-8 animate-slide-up">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
