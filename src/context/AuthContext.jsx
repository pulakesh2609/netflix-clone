import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('glassflix_token'));
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('glassflix_user');
        return saved ? JSON.parse(saved) : null;
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Verify token on mount
        if (token) {
            fetch('/api/verify', {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => {
                    if (!res.ok) throw new Error('Invalid token');
                    return res.json();
                })
                .then(() => setLoading(false))
                .catch(() => {
                    logout();
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    function login(newToken, userData) {
        setToken(newToken);
        setUser(userData);
        localStorage.setItem('glassflix_token', newToken);
        localStorage.setItem('glassflix_user', JSON.stringify(userData));
    }

    function logout() {
        setToken(null);
        setUser(null);
        localStorage.removeItem('glassflix_token');
        localStorage.removeItem('glassflix_user');
    }

    return (
        <AuthContext.Provider value={{ token, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

// Protected Route wrapper
export function ProtectedRoute({ children }) {
    const { token, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !token) {
            navigate('/login', { replace: true });
        }
    }, [token, loading, navigate]);

    if (loading) {
        return (
            <div className="h-screen bg-[#050505] flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return token ? children : null;
}
