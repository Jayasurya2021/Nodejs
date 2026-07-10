import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { register, reset } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiCheck } from 'react-icons/fi';
import GoogleLoginButton from '../components/GoogleLoginButton';

const BENEFITS = [
  "Exclusive member discounts up to 40%",
  "Early access to new collections",
  "Free shipping on all orders over $100",
  "Personal style recommendations",
];

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'buyer' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { name, email, password, confirmPassword, role } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
  const redirect = new URLSearchParams(search).get('redirect') || '/';

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      if (user && user.role === 'seller') {
        navigate('/seller/dashboard');
      } else {
        navigate(redirect);
      }
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch, redirect]);

  // Password strength calculation
  useEffect(() => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  }, [password]);

  const onChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    dispatch(register({ name, email, password, role }));
  };

  const strengthColors = ['bg-gray-200', 'bg-red-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-500'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex overflow-hidden bg-white"
    >
      {/* LEFT PANEL — Fashion Image with Benefits */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop"
          alt="Fashion Register"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ animation: 'float 14s ease-in-out infinite' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/50 to-black/65" />

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

          {/* Benefits */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="w-12 h-0.5 bg-yellow-400 mb-6" />
              <h2 className="text-white text-2xl font-bold mb-2">Join the LUXE family</h2>
              <p className="text-gray-300 text-sm font-light mb-8">
                Premium menswear, curated for the discerning gentleman.
              </p>
              <ul className="space-y-4">
                {BENEFITS.map((benefit, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.15 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                      <FiCheck size={10} className="text-black font-bold" strokeWidth={3} />
                    </div>
                    <span className="text-gray-200 text-sm">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              animationDelay: `${i * 1}s`,
              animationDuration: `${7 + i * 1.2}s`,
            }}
          />
        ))}
      </div>

      {/* RIGHT PANEL — Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12 bg-white overflow-y-auto">
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
          <div className="mb-8">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2"
            >
              Start your journey
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-bold text-black tracking-tight"
            >
              Create Account
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-500 mt-2 text-sm"
            >
              Already have an account?{' '}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : '/login'}
                className="text-black font-semibold hover:text-gray-600 transition-colors underline underline-offset-4"
              >
                Sign in
              </Link>
            </motion.p>
          </div>

          {/* Role Selection */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mb-6 flex p-1 bg-gray-100 rounded-lg">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'buyer' })}
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${role === 'buyer' ? 'bg-white text-black shadow' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Buyer Account
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'seller' })}
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${role === 'seller' ? 'bg-white text-black shadow' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Seller Account
            </button>
          </motion.div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Full Name */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <label className={`block text-xs uppercase tracking-widest font-bold mb-2 transition-colors ${focusedField === 'name' ? 'text-black' : 'text-gray-400'}`}>
                Full Name
              </label>
              <div className={`flex items-center border-b-2 transition-all duration-300 ${focusedField === 'name' ? 'border-black' : 'border-gray-200'}`}>
                <FiUser className={`mr-3 flex-shrink-0 transition-colors ${focusedField === 'name' ? 'text-black' : 'text-gray-300'}`} size={18} />
                <input
                  id="name" name="name" type="text" required
                  value={name} onChange={onChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="John Doe"
                  className="flex-1 bg-transparent py-3 text-sm text-black placeholder-gray-300 focus:outline-none"
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <label className={`block text-xs uppercase tracking-widest font-bold mb-2 transition-colors ${focusedField === 'email' ? 'text-black' : 'text-gray-400'}`}>
                Email Address
              </label>
              <div className={`flex items-center border-b-2 transition-all duration-300 ${focusedField === 'email' ? 'border-black' : 'border-gray-200'}`}>
                <FiMail className={`mr-3 flex-shrink-0 transition-colors ${focusedField === 'email' ? 'text-black' : 'text-gray-300'}`} size={18} />
                <input
                  id="email" name="email" type="email" autoComplete="email" required
                  value={email} onChange={onChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent py-3 text-sm text-black placeholder-gray-300 focus:outline-none"
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              <label className={`block text-xs uppercase tracking-widest font-bold mb-2 transition-colors ${focusedField === 'password' ? 'text-black' : 'text-gray-400'}`}>
                Password
              </label>
              <div className={`flex items-center border-b-2 transition-all duration-300 ${focusedField === 'password' ? 'border-black' : 'border-gray-200'}`}>
                <FiLock className={`mr-3 flex-shrink-0 transition-colors ${focusedField === 'password' ? 'text-black' : 'text-gray-300'}`} size={18} />
                <input
                  id="password" name="password" type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password" required
                  value={password} onChange={onChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent py-3 text-sm text-black placeholder-gray-300 focus:outline-none"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-black transition-colors">
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {/* Password strength bar */}
              {password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${passwordStrength >= level ? strengthColors[passwordStrength] : 'bg-gray-200'}`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs mt-1 font-medium transition-colors ${
                    passwordStrength <= 1 ? 'text-red-400' : passwordStrength <= 2 ? 'text-yellow-500' : passwordStrength <= 3 ? 'text-blue-500' : 'text-green-500'
                  }`}>
                    {strengthLabels[passwordStrength]} password
                  </p>
                </div>
              )}
            </motion.div>

            {/* Confirm Password */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <label className={`block text-xs uppercase tracking-widest font-bold mb-2 transition-colors ${focusedField === 'confirmPassword' ? 'text-black' : 'text-gray-400'}`}>
                Confirm Password
              </label>
              <div className={`flex items-center border-b-2 transition-all duration-300 ${
                focusedField === 'confirmPassword' ? 'border-black' : confirmPassword && password === confirmPassword ? 'border-green-400' : 'border-gray-200'
              }`}>
                <FiLock className={`mr-3 flex-shrink-0 transition-colors ${focusedField === 'confirmPassword' ? 'text-black' : 'text-gray-300'}`} size={18} />
                <input
                  id="confirmPassword" name="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  required
                  value={confirmPassword} onChange={onChange}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent py-3 text-sm text-black placeholder-gray-300 focus:outline-none"
                />
                {confirmPassword && password === confirmPassword && (
                  <FiCheck size={18} className="text-green-500" />
                )}
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-gray-400 hover:text-black transition-colors ml-2">
                  {showConfirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-black text-white text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-900 active:scale-[0.98] transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed group mt-4"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  <>
                    Create Account
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                  </>
                )}
              </button>
            </motion.div>

            {/* Divider */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="relative flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 uppercase tracking-widest">or sign up with</span>
              <div className="flex-1 h-px bg-gray-200" />
            </motion.div>

            {/* Social Buttons */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="grid grid-cols-1 gap-4">
              <GoogleLoginButton
                redirectTo={redirect || '/'}
                label="Sign up with Google"
                role={role}
              />

              <button type="button" className="flex items-center justify-center gap-2 py-3.5 border border-gray-200 hover:border-black hover:bg-gray-50 transition-all duration-300 text-sm font-medium text-gray-700">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Continue with Apple
              </button>
            </motion.div>
          </form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-6 text-xs text-gray-400 text-center"
          >
            By creating an account, you agree to our{' '}
            <Link to="/terms" className="underline hover:text-black transition-colors">Terms of Service</Link>{' '}
            and{' '}
            <Link to="/privacy-policy" className="underline hover:text-black transition-colors">Privacy Policy</Link>
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Signup;
