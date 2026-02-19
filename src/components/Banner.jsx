import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Info } from 'lucide-react';
import axios, { requests, IMAGE_BASE } from '../api/tmdb';

function Banner() {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(requests.fetchNetflixOriginals);
                const results = response.data.results;
                const randomMovie = results[Math.floor(Math.random() * results.length)];
                setMovie(randomMovie);
            } catch (error) {
                console.error('Failed to fetch banner data:', error);
            }
        }
        fetchData();
    }, []);

    if (!movie) {
        return (
            <div className="h-screen bg-[#050505] flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const title = movie.title || movie.name || movie.original_name;
    const description = movie.overview
        ? movie.overview.length > 200
            ? movie.overview.substring(0, 200) + '...'
            : movie.overview
        : '';

    return (
        <header className="relative h-[85vh] md:h-screen w-full overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={`${IMAGE_BASE}${movie.backdrop_path}`}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/30" />
            </div>

            {/* Content */}
            <motion.div
                className="relative z-10 flex items-end md:items-center h-full px-6 md:px-16 pb-32 md:pb-0"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <div className="max-w-xl">
                    {/* Glassmorphic Content Box */}
                    <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/30">
                        <span className="inline-block bg-red-600/80 text-white text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-4">
                            GlassFlix Original
                        </span>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight">
                            {title}
                        </h1>
                        {description && (
                            <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-6">
                                {description}
                            </p>
                        )}

                        {/* Buttons */}
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-white/80 transition-all duration-300 cursor-pointer text-sm md:text-base">
                                <Play className="w-5 h-5" fill="black" />
                                Play
                            </button>
                            <button className="flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-lg border border-white/10 hover:bg-white/25 transition-all duration-300 cursor-pointer text-sm md:text-base">
                                <Info className="w-5 h-5" />
                                More Info
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </header>
    );
}

export default Banner;
