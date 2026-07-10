import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { login, reset } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import GoogleLoginButton from '../components/GoogleLoginButton';

const FASHION_QUOTES = [
  { text: "Style is a way to say who you are without having to speak.", author: "Rachel Zoe" },
  { text: "Fashion is the armor to survive the reality of everyday life.", author: "Bill Cunningham" },
  { text: "Elegance is not about being noticed, it's about being remembered.", author: "Giorgio Armani" },
];

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [focusedField, setFocusedField] = useState(null);

  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
  const redirect = new URLSearchParams(search).get('redirect') || '/';

  // Rotate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % FASHION_QUOTES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      if (user && user.role === 'pending') {
        navigate('/complete-profile');
      } else if (user && user.role === 'seller') {
        navigate('/seller/dashboard');
      } else {
        navigate(redirect);
      }
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch, redirect]);

  const onChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  const currentQuote = FASHION_QUOTES[quoteIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex overflow-hidden bg-white"
    >
      {/* LEFT PANEL — Fashion Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop"
          alt="Fashion"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          style={{ animation: 'float 12s ease-in-out infinite' }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/60" />

        {/* Brand & Quote */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link to="/" className="text-white font-bold text-3xl tracking-widest uppercase">
              LUXE<span className="text-yellow-400">.</span>
            </Link>
          </motion.div>

          {/* Rotating Quote */}
          <div className="mb-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={quoteIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-12 h-0.5 bg-yellow-400 mb-6" />
                <p className="text-white text-xl font-light leading-relaxed italic mb-4 max-w-sm">
                  "{currentQuote.text}"
                </p>
                <p className="text-yellow-400 text-sm tracking-widest uppercase font-semibold">
                  — {currentQuote.author}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Quote dots */}
            <div className="flex gap-2 mt-6">
              {FASHION_QUOTES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setQuoteIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === quoteIndex ? 'bg-yellow-400 w-6' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${6 + i * 1.5}s`,
            }}
          />
        ))}
      </div>

      {/* RIGHT PANEL — Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-16 bg-white">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8">
            <Link to="/" className="font-bold text-2xl tracking-widest uppercase">
              LUXE<span className="text-yellow-500">.</span>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-10">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2"
            >
              Welcome back
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-bold text-black tracking-tight"
            >
              Sign In
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-500 mt-2 text-sm"
            >
              Don't have an account?{' '}
              <Link
                to={redirect ? `/signup?redirect=${redirect}` : '/signup'}
                className="text-black font-semibold hover:text-gray-600 transition-colors underline underline-offset-4"
              >
                Create one
              </Link>
            </motion.p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative"
            >
              <label className={`block text-xs uppercase tracking-widest font-bold mb-2 transition-colors ${focusedField === 'email' ? 'text-black' : 'text-gray-400'}`}>
                Email Address
              </label>
              <div className={`flex items-center border-b-2 transition-all duration-300 ${focusedField === 'email' ? 'border-black' : 'border-gray-200'}`}>
                <FiMail className={`mr-3 transition-colors ${focusedField === 'email' ? 'text-black' : 'text-gray-300'}`} size={18} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={onChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent py-3 text-sm text-black placeholder-gray-300 focus:outline-none"
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative"
            >
              <label className={`block text-xs uppercase tracking-widest font-bold mb-2 transition-colors ${focusedField === 'password' ? 'text-black' : 'text-gray-400'}`}>
                Password
              </label>
              <div className={`flex items-center border-b-2 transition-all duration-300 ${focusedField === 'password' ? 'border-black' : 'border-gray-200'}`}>
                <FiLock className={`mr-3 transition-colors ${focusedField === 'password' ? 'text-black' : 'text-gray-300'}`} size={18} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={onChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent py-3 text-sm text-black placeholder-gray-300 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-black transition-colors"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </motion.div>

            {/* Remember / Forgot */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-between"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" id="remember-me" name="remember-me" className="w-4 h-4 accent-black rounded" />
                <span className="text-sm text-gray-500">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-black font-medium hover:text-gray-500 transition-colors">
                Forgot your password?
              </Link>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-black text-white text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-900 active:scale-[0.98] transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  <>
                    Sign In
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                  </>
                )}
              </button>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="relative flex items-center gap-4"
            >
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 uppercase tracking-widest">or continue with</span>
              <div className="flex-1 h-px bg-gray-200" />
            </motion.div>

            {/* Social Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-1 gap-4"
            >
              <GoogleLoginButton
                redirectTo={redirect || '/'}
                label="Continue with Google"
              />

              <button
                type="button"
                className="flex items-center justify-center gap-2 py-3.5 border border-gray-200 hover:border-black hover:bg-gray-50 transition-all duration-300 text-sm font-medium text-gray-700"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Continue with Apple
              </button>
            </motion.div>
          </form>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-8 text-xs text-gray-400 text-center"
          >
            By signing in, you agree to our{' '}
            <Link to="/terms" className="underline hover:text-black transition-colors">Terms of Service</Link>{' '}
            and{' '}
            <Link to="/privacy-policy" className="underline hover:text-black transition-colors">Privacy Policy</Link>
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;
