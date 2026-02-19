import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    function handleLogout() {
        logout();
        navigate('/login', { replace: true });
    }

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

                {/* User Menu */}
                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="flex items-center gap-2 cursor-pointer group"
                    >
                        <div className="w-8 h-8 rounded-md bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-xs font-bold">
                            {user?.username?.charAt(0)?.toUpperCase() || 'G'}
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${showMenu ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown */}
                    {showMenu && (
                        <div className="absolute right-0 top-12 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl p-3 min-w-48 shadow-2xl shadow-black/50">
                            <div className="px-3 py-2 border-b border-white/5 mb-2">
                                <p className="text-white text-sm font-semibold">{user?.username || 'User'}</p>
                                <p className="text-gray-500 text-xs">{user?.user_id}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all cursor-pointer"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Nav;
