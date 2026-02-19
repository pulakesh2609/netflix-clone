import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, LogIn, UserPlus, Film } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        user_id: '',
        username: '',
        password: '',
        email: '',
        phone: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [transitioning, setTransitioning] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
        setSuccess('');
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const endpoint = isLogin ? '/api/login' : '/api/register';
            const body = isLogin
                ? { user_id: formData.user_id, password: formData.password }
                : formData;

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            if (isLogin) {
                login(data.token, data.user);
                setTransitioning(true);
                setTimeout(() => {
                    navigate('/dashboard', { replace: true });
                }, 1200);
            } else {
                setSuccess('Registration successful! Please login.');
                setIsLogin(true);
                setFormData({ ...formData, password: '' });
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    function toggleMode() {
        setIsLogin(!isLogin);
        setError('');
        setSuccess('');
    }

    return (
        <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 relative overflow-hidden">
            {/* ─── Animated Wave / Mesh Gradient Background ─── */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a0014] via-[#0a0a0f] to-[#001a1a]" />

                {/* Crimson blobs */}
                <motion.div
                    className="absolute w-[600px] h-[600px] bg-[#D0001B]/30 rounded-full blur-[100px] -top-40 -left-20"
                    animate={{ x: [0, 120, 60, 0], y: [0, 80, -40, 0], scale: [1, 1.2, 0.9, 1] }}
                    transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute w-[500px] h-[500px] bg-[#D0001B]/20 rounded-full blur-[100px] bottom-0 right-0"
                    animate={{ x: [0, -100, -50, 0], y: [0, -120, 60, 0], scale: [1, 0.8, 1.1, 1] }}
                    transition={{ duration: 14, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                />

                {/* Cyan blobs */}
                <motion.div
                    className="absolute w-[500px] h-[500px] bg-[#00E5FF]/20 rounded-full blur-[100px] top-1/3 right-1/4"
                    animate={{ x: [0, -80, 100, 0], y: [0, 100, -60, 0], scale: [1, 1.15, 0.85, 1] }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute w-[400px] h-[400px] bg-[#00E5FF]/15 rounded-full blur-[100px] bottom-1/4 left-1/3"
                    animate={{ x: [0, 60, -80, 0], y: [0, -60, 80, 0], scale: [0.9, 1.1, 1, 0.9] }}
                    transition={{ duration: 11, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                />

                {/* Indigo accent */}
                <motion.div
                    className="absolute w-[700px] h-[700px] bg-indigo-900/25 rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    animate={{ scale: [1, 1.2, 0.95, 1], rotate: [0, 45, -20, 0] }}
                    transition={{ duration: 16, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                />
            </div>

            {/* Glassmorphic Transition Overlay */}
            <AnimatePresence>
                {transitioning && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center"
                    >
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl" />
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl shadow-red-600/10 flex flex-col items-center gap-5"
                        >
                            <div className="w-12 h-12 border-3 border-red-500 border-t-transparent rounded-full animate-spin" />
                            <h2 className="text-xl font-bold text-white tracking-wide">
                                <span className="text-red-500">GLASS</span>FLIX
                            </h2>
                            <p className="text-gray-400 text-sm">Entering your world...</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Glass Card */}
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/50">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Film className="w-8 h-8 text-red-500" />
                            <h1 className="text-3xl font-extrabold tracking-tighter">
                                <span className="text-red-600">GLASS</span>
                                <span className="text-white">FLIX</span>
                            </h1>
                        </div>
                        <p className="text-gray-400 text-sm">
                            {isLogin ? 'Sign in to continue' : 'Create your account'}
                        </p>
                    </div>

                    {/* Error / Success Messages */}
                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-5"
                            >
                                {error}
                            </motion.div>
                        )}
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm rounded-lg px-4 py-3 mb-5"
                            >
                                {success}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* User ID */}
                        <div>
                            <label className="text-gray-300 text-xs font-medium uppercase tracking-wider mb-1.5 block">
                                User ID
                            </label>
                            <input
                                type="text"
                                name="user_id"
                                value={formData.user_id}
                                onChange={handleChange}
                                required
                                placeholder="Enter your User ID"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm outline-none transition-all duration-300 focus:border-red-500/50 focus:bg-white/8 focus:shadow-[0_0_20px_rgba(229,9,20,0.15)]"
                            />
                        </div>

                        {/* Username (Register only) */}
                        <AnimatePresence>
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <label className="text-gray-300 text-xs font-medium uppercase tracking-wider mb-1.5 block">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required={!isLogin}
                                        placeholder="Your display name"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm outline-none transition-all duration-300 focus:border-red-500/50 focus:bg-white/8 focus:shadow-[0_0_20px_rgba(229,9,20,0.15)]"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Password */}
                        <div>
                            <label className="text-gray-300 text-xs font-medium uppercase tracking-wider mb-1.5 block">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-500 text-sm outline-none transition-all duration-300 focus:border-red-500/50 focus:bg-white/8 focus:shadow-[0_0_20px_rgba(229,9,20,0.15)]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Email (Register only) */}
                        <AnimatePresence>
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-4"
                                >
                                    <div>
                                        <label className="text-gray-300 text-xs font-medium uppercase tracking-wider mb-1.5 block">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required={!isLogin}
                                            placeholder="you@example.com"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm outline-none transition-all duration-300 focus:border-red-500/50 focus:bg-white/8 focus:shadow-[0_0_20px_rgba(229,9,20,0.15)]"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-gray-300 text-xs font-medium uppercase tracking-wider mb-1.5 block">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Optional"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm outline-none transition-all duration-300 focus:border-red-500/50 focus:bg-white/8 focus:shadow-[0_0_20px_rgba(229,9,20,0.15)]"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 mt-6 cursor-pointer shadow-lg shadow-red-600/20 hover:shadow-red-600/40"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : isLogin ? (
                                <>
                                    <LogIn className="w-4 h-4" />
                                    Sign In
                                </>
                            ) : (
                                <>
                                    <UserPlus className="w-4 h-4" />
                                    Create Account
                                </>
                            )}
                        </button>
                    </form>

                    {/* Toggle Login/Register */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            {isLogin ? "Don't have an account?" : 'Already have an account?'}
                            <button
                                onClick={toggleMode}
                                className="text-red-500 hover:text-red-400 font-semibold ml-1 transition-colors cursor-pointer"
                            >
                                {isLogin ? 'Register' : 'Sign In'}
                            </button>
                        </p>
                    </div>

                </div>
            </motion.div>
        </div>
    );
}

export default Auth;
