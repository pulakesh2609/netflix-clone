import { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

function Nav() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-500 ease-in-out border-b ${scrolled
                    ? 'bg-black/80 backdrop-blur-xl border-white/10 shadow-2xl shadow-black/50'
                    : 'bg-black/30 backdrop-blur-md border-white/5'
                }`}
        >
            {/* Left Section */}
            <div className="flex items-center gap-8">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tighter">
                    <span className="text-red-600">GLASS</span>
                    <span className="text-white">FLIX</span>
                </h1>

                <ul className="hidden md:flex items-center gap-6 text-sm text-gray-300">
                    {['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List'].map(
                        (item) => (
                            <li
                                key={item}
                                className="hover:text-white transition-colors duration-300 cursor-pointer"
                            >
                                {item}
                            </li>
                        )
                    )}
                </ul>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-5">
                <Search className="w-5 h-5 text-gray-300 hover:text-white transition-colors cursor-pointer" />
                <Bell className="w-5 h-5 text-gray-300 hover:text-white transition-colors cursor-pointer" />
                <div className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-8 h-8 rounded-md bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-xs font-bold">
                        G
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 group-hover:rotate-180 transition-transform duration-300" />
                </div>
            </div>
        </nav>
    );
}

export default Nav;
