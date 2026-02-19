import { motion } from 'framer-motion';
import { POSTER_BASE } from '../api/tmdb';

function MovieCard({ movie, isLarge = false }) {
    const imagePath = isLarge ? movie.poster_path : movie.backdrop_path;
    const title = movie.title || movie.name || movie.original_name;

    if (!imagePath) return null;

    return (
        <motion.div
            className={`relative flex-shrink-0 cursor-pointer group ${isLarge ? 'w-[160px] md:w-[200px]' : 'w-[240px] md:w-[280px]'
                }`}
            whileHover={{ scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            {/* Card Image */}
            <div
                className={`relative overflow-hidden rounded-xl border border-white/5 group-hover:border-white/30 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-white/5 ${isLarge ? 'h-[240px] md:h-[300px]' : 'h-[140px] md:h-[160px]'
                    }`}
            >
                <img
                    src={`${POSTER_BASE}${imagePath}`}
                    alt={title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                        <p className="text-white text-xs md:text-sm font-semibold truncate">
                            {title}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default MovieCard;
