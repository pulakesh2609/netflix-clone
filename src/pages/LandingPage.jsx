import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Film } from 'lucide-react';

// Animated blob component
function FloatingBlob({ className, animate, transition }) {
    return (
        <motion.div
            className={`absolute rounded-full blur-[100px] ${className}`}
            animate={animate}
            transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                ...transition,
            }}
        />
    );
}

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">

            {/* ─── Animated Wave / Mesh Gradient Background ─── */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Deep base gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a0014] via-[#0a0a0f] to-[#001a1a]" />

                {/* Crimson blobs */}
                <FloatingBlob
                    className="w-[600px] h-[600px] bg-[#D0001B]/30 -top-40 -left-20"
                    animate={{
                        x: [0, 120, 60, 0],
                        y: [0, 80, -40, 0],
                        scale: [1, 1.2, 0.9, 1],
                    }}
                    transition={{ duration: 12 }}
                />
                <FloatingBlob
                    className="w-[500px] h-[500px] bg-[#D0001B]/20 bottom-0 right-0"
                    animate={{
                        x: [0, -100, -50, 0],
                        y: [0, -120, 60, 0],
                        scale: [1, 0.8, 1.1, 1],
                    }}
                    transition={{ duration: 14 }}
                />

                {/* Cyan blobs */}
                <FloatingBlob
                    className="w-[500px] h-[500px] bg-[#00E5FF]/20 top-1/3 right-1/4"
                    animate={{
                        x: [0, -80, 100, 0],
                        y: [0, 100, -60, 0],
                        scale: [1, 1.15, 0.85, 1],
                    }}
                    transition={{ duration: 10 }}
                />
                <FloatingBlob
                    className="w-[400px] h-[400px] bg-[#00E5FF]/15 bottom-1/4 left-1/3"
                    animate={{
                        x: [0, 60, -80, 0],
                        y: [0, -60, 80, 0],
                        scale: [0.9, 1.1, 1, 0.9],
                    }}
                    transition={{ duration: 11 }}
                />

                {/* Indigo / purple accent */}
                <FloatingBlob
                    className="w-[700px] h-[700px] bg-indigo-900/25 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    animate={{
                        scale: [1, 1.2, 0.95, 1],
                        rotate: [0, 45, -20, 0],
                    }}
                    transition={{ duration: 16 }}
                />

                {/* Subtle noise-like grain overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_0%,transparent_70%)]" />
            </div>

            {/* ─── Header / Navbar ─── */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative z-20 flex items-center justify-between px-8 md:px-16 py-6"
            >
                <div className="flex items-center gap-2">
                    <Film className="w-7 h-7 text-red-500" />
                    <h1 className="text-2xl font-extrabold tracking-tighter">
                        <span className="text-red-500">GLASS</span>
                        <span className="text-white">FLIX</span>
                    </h1>
                </div>

                <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
                    {['Home', 'About Us', 'Features', 'Pricing', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="hover:text-white transition-colors duration-300 relative group"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D0001B] to-[#00E5FF] group-hover:w-full transition-all duration-300" />
                        </a>
                    ))}
                </nav>

                <button
                    onClick={() => navigate('/login')}
                    className="px-5 py-2 text-sm font-semibold bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer"
                >
                    Sign In
                </button>
            </motion.header>

            {/* ─── Hero Section ─── */}
            <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-88px)] px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                    className="w-full max-w-2xl"
                >
                    {/* Glassmorphic Container */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-14 shadow-2xl shadow-black/40 text-center relative overflow-hidden">

                        {/* Inner glow accents */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#D0001B]/15 rounded-full blur-[80px]" />
                        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#00E5FF]/15 rounded-full blur-[80px]" />

                        {/* Subtitle */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            <span className="inline-block bg-gradient-to-r from-[#D0001B]/20 to-[#00E5FF]/20 border border-white/5 text-gray-300 text-xs font-medium uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-8">
                                Premium Streaming Experience
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.7 }}
                            className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6"
                        >
                            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
                                GLASS
                            </span>
                            <span className="bg-gradient-to-r from-[#D0001B] to-[#ff4d6a] bg-clip-text text-transparent">
                                FLIX
                            </span>
                            <br />
                            <span className="text-2xl md:text-3xl font-light text-gray-400 tracking-wide">
                                Landing Page
                            </span>
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.7 }}
                            className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md mx-auto mb-10"
                        >
                            Discover a world of premium TV shows with our stunning glassmorphic interface.
                            Built with cutting-edge design for an immersive experience.
                        </motion.p>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.6 }}
                        >
                            <button
                                onClick={() => navigate('/login')}
                                className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-[#D0001B] to-[#ff1a3a] text-white font-bold px-8 py-4 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-red-600/30 hover:scale-105"
                            >
                                GET STARTED
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />

                                {/* Button glow */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#D0001B] to-[#ff1a3a] rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10" />
                            </button>
                        </motion.div>

                        {/* Stats row */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 0.6 }}
                            className="flex items-center justify-center gap-8 mt-10 pt-8 border-t border-white/5"
                        >
                            {[
                                { value: '1000+', label: 'Shows' },
                                { value: '4K', label: 'Quality' },
                                { value: 'Free', label: 'Access' },
                            ].map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <p className="text-lg md:text-xl font-bold bg-gradient-to-r from-[#D0001B] to-[#00E5FF] bg-clip-text text-transparent">
                                        {stat.value}
                                    </p>
                                    <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}

export default LandingPage;
