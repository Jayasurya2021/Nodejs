import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { googleLogin } from '../redux/slices/authSlice';

/**
 * Official Google brand-colors icon
 */
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

/**
 * Spinner for loading state
 */
const Spinner = () => (
  <svg className="animate-spin w-[18px] h-[18px] text-gray-400" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

/**
 * A premium, reusable Google Sign-In button.
 *
 * @param {string} redirectTo - Path to navigate to after successful authentication
 * @param {string} label     - Button text label (default: "Continue with Google")
 * @param {string} role      - Role chosen if registering (default: 'buyer')
 */
const GoogleLoginButton = ({ redirectTo = '/', label = 'Continue with Google', role = 'buyer' }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  /**
   * Called by useGoogleLogin on success.
   * tokenResponse.access_token is an opaque access token.
   * We forward it to our backend which calls the Google UserInfo API to verify it.
   */
  const handleSuccess = async (tokenResponse) => {
    if (!tokenResponse?.access_token) {
      toast.error('Failed to receive Google token. Please try again.');
      setIsAuthenticating(false);
      return;
    }

    try {
      const resultAction = await dispatch(googleLogin({ token: tokenResponse.access_token, role }));

      if (googleLogin.fulfilled.match(resultAction)) {
        toast.success('Welcome to LUXE! 🎉', {
          icon: '✨',
          style: { fontWeight: '600' }
        });
        navigate(redirectTo, { replace: true });
      } else {
        toast.error(resultAction.payload || 'Sign-In failed. Please try again.', {
          icon: '❌'
        });
      }
    } catch {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  /**
   * Called when the Google OAuth popup is closed by the user or encounters an OAuth error.
   */
  const handleError = () => {
    setIsAuthenticating(false);
    toast.error('Google Sign-In failed. Please try again.');
  };

  /**
   * Called for non-OAuth errors (popup_closed, popup_blocked, etc.)
   */
  const handleNonOAuthError = (err) => {
    setIsAuthenticating(false);
    if (err?.type === 'popup_closed') {
      // Silent — user intentionally closed the popup
      return;
    }
    if (err?.type === 'popup_failed_to_open') {
      toast.error('Popup was blocked. Please allow popups in your browser and try again.', {
        duration: 5000
      });
      return;
    }
    toast.error('An error occurred. Please try again.');
  };

  const googleSignIn = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: handleError,
    onNonOAuthError: handleNonOAuthError
  });

  const handleClick = () => {
    if (isAuthenticating) return;
    setIsAuthenticating(true);
    googleSignIn();
  };

  return (
    <motion.button
      type="button"
      id="google-signin-btn"
      onClick={handleClick}
      disabled={isAuthenticating}
      whileTap={{ scale: isAuthenticating ? 1 : 0.97 }}
      className={`
        group relative w-full flex items-center justify-center gap-3
        py-3.5 px-6
        bg-white
        border border-gray-200
        hover:border-gray-800 hover:bg-gray-50
        text-gray-700
        font-medium text-sm tracking-wide
        transition-all duration-300 ease-in-out
        disabled:opacity-60 disabled:cursor-not-allowed
        overflow-hidden shadow-sm hover:shadow
        rounded-none
      `}
    >
      {/* Shimmer sweep animation on hover */}
      <span
        aria-hidden="true"
        className="
          absolute inset-0
          bg-gradient-to-r from-transparent via-black/[0.03] to-transparent
          -translate-x-full group-hover:translate-x-full
          transition-transform duration-700 ease-in-out pointer-events-none
        "
      />

      {/* Icon */}
      <span className="relative flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
        {isAuthenticating ? <Spinner /> : <GoogleIcon />}
      </span>

      {/* Label */}
      <span className="relative">
        {isAuthenticating ? 'Authenticating...' : label}
      </span>
    </motion.button>
  );
};

export default GoogleLoginButton;
