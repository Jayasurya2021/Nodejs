import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { login, reset } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessText, setShowSuccessText] = useState(false);
  const [showBgText, setShowBgText] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowBgText(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  
  const { email, password } = formData;
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
      setShowSuccessText(true);
      setTimeout(() => {
        if (user && user.role === 'pending') {
          navigate('/complete-profile');
        } else if (user && user.role === 'seller') {
          navigate('/seller/dashboard');
        } else {
          navigate(redirect);
        }
      }, 1000);
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch, redirect]);

  const onChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  const handleGoogleLogin = () => {
    toast.error('Google login not fully implemented in this demo');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#F4F4F6] p-4 md:p-8 text-black overflow-hidden font-sans">
      
      {/* Massive Background Text */}
      <div className={`absolute inset-0 pointer-events-none z-0 flex flex-col justify-center items-center overflow-hidden transition-opacity duration-1000 ease-out ${showBgText ? 'opacity-60' : 'opacity-0'}`}>
        <h1 className="text-[18vw] font-black text-gray-300 tracking-[0.05em] uppercase leading-none select-none whitespace-nowrap">
          LOGIN
        </h1>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[1000px] h-full max-h-[600px] flex bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] relative z-10"
      >
        {/* Left Side - Image */}
        <div className="w-1/2 relative bg-gray-100 overflow-hidden hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop"
            alt="Classic Fashion"
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 hover:scale-105 transition-transform duration-[15s] ease-out"
          />
          <div className="absolute inset-0 bg-black/15" />
          
          <div className="absolute top-12 left-12 text-white z-20">
            <h1 className="font-serif text-2xl tracking-widest uppercase">
              LookFashion<span className="text-gray-300">.</span>
            </h1>
          </div>

          <div className="absolute bottom-12 left-12 text-white z-20 max-w-[80%]">
            <div className="w-8 h-0.5 bg-white mb-6"></div>
            <h3 className="font-serif text-4xl tracking-wide uppercase mb-3">Timeless <br />Elegance</h3>
            <p className="text-xs font-light tracking-[0.2em] uppercase opacity-80 leading-relaxed">
              Discover the new classic collection.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center relative bg-white">
          
          {/* Header */}
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="font-serif text-4xl tracking-wide text-black mb-2">Sign In</h2>
              <p className="text-xs text-gray-500 uppercase tracking-widest">Welcome back</p>
            </div>
            <Link to={redirect ? `/signup?redirect=${redirect}` : '/signup'} className="text-xs uppercase tracking-[0.15em] font-medium text-gray-400 hover:text-black transition-colors pb-1 border-b border-transparent hover:border-black">
              Create Account
            </Link>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-8 flex-1">
            {/* Email Field with Floating Label */}
            <div className="relative group">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={onChange}
                required
                className="block w-full py-3 px-0 text-sm text-black bg-transparent border-0 border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer transition-colors"
                placeholder=" "
              />
              <label htmlFor="email" className="absolute text-xs uppercase tracking-widest text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-85 peer-focus:-translate-y-6">
                Email Address
              </label>
            </div>

            {/* Password Field with Floating Label */}
            <div className="relative group flex items-end">
              <div className="flex-1 relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  value={password}
                  onChange={onChange}
                  required
                  className="block w-full py-3 px-0 text-sm text-black bg-transparent border-0 border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer transition-colors"
                  placeholder=" "
                />
                <label htmlFor="password" className="absolute text-xs uppercase tracking-widest text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-85 peer-focus:-translate-y-6">
                  Password
                </label>
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-black transition-colors absolute right-0 bottom-3"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>

            {/* Checkbox and Forgot Password */}
            <div className="flex items-center justify-between text-[11px] pt-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="w-4 h-4 border border-gray-300 flex items-center justify-center group-hover:border-black transition-colors relative bg-white">
                  <input type="checkbox" className="opacity-0 absolute inset-0 cursor-pointer peer" />
                  <div className="text-black opacity-0 peer-checked:opacity-100 transition-opacity">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span className="text-gray-500 uppercase tracking-widest group-hover:text-black transition-colors">Remember Me</span>
              </label>
              <Link to="/forgot-password" className="text-gray-500 hover:text-black uppercase tracking-widest transition-colors pb-0.5 border-b border-transparent hover:border-black">
                Recover
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || showSuccessText}
              className="w-full mt-10 px-8 py-4 bg-black text-white text-[11px] uppercase tracking-[0.25em] font-bold hover:bg-gray-800 active:scale-[0.99] transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {showSuccessText ? 'Login Successful!' : isLoading ? 'Logging in...' : 'Sign In'}
            </button>
          </form>

          {/* Social Links */}
          <div className="mt-12 flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6 relative before:content-[''] before:w-10 before:h-[1px] before:bg-gray-200 before:absolute before:right-full before:top-1/2 before:-translate-y-1/2 before:mr-4 after:content-[''] after:w-10 after:h-[1px] after:bg-gray-200 after:absolute after:left-full after:top-1/2 after:-translate-y-1/2 after:ml-4">
              Or Connect With
            </span>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-black hover:text-black hover:bg-gray-50 transition-all">
                <FaFacebookF size={14} />
              </button>
              <button onClick={handleGoogleLogin} type="button" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-black hover:text-black hover:bg-gray-50 transition-all">
                <FaGoogle size={14} />
              </button>
            </div>
          </div>

        </div>
      </motion.div>
      
    </div>
  );
};

export default Login;
