import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from '../api/tmdb';
import MovieCard from './MovieCard';

function Row({ title, fetchUrl, isLargeRow = false }) {
    const [movies, setMovies] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(fetchUrl);
                setMovies(response.data.results);
            } catch (error) {
                console.error(`Failed to fetch ${title}:`, error);
            }
        }
        fetchData();
    }, [fetchUrl, title]);

    const scroll = (direction) => {
        const container = scrollRef.current;
        if (!container) return;
        const scrollAmount = container.clientWidth * 0.75;
        container.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        });
    };

    return (
        <motion.section
            className="px-4 md:px-12 py-4 md:py-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            {/* Section Title */}
            <h2 className="text-lg md:text-xl font-bold text-white mb-4 tracking-wide">
                {title}
            </h2>

            {/* Scrollable Row */}
            <div className="relative group/row">
                {/* Left Chevron */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white rounded-full p-2 opacity-0 group-hover/row:opacity-100 transition-all duration-300 -translate-x-2 group-hover/row:translate-x-0 cursor-pointer"
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Movie Cards Container */}
                <div
                    ref={scrollRef}
                    className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth py-2"
                >
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            isLarge={isLargeRow}
                        />
                    ))}
                </div>

                {/* Right Chevron */}
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white rounded-full p-2 opacity-0 group-hover/row:opacity-100 transition-all duration-300 translate-x-2 group-hover/row:translate-x-0 cursor-pointer"
                    aria-label="Scroll right"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </motion.section>
    );
}

export default Row;
