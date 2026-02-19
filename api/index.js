import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import axios from 'axios';

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'glassflix_secret_jwt_key_2024_secure';

app.use(cors());
app.use(express.json());

// ─── Lazy MySQL Pool ───
let pool;
function getPool() {
    if (!pool) {
        pool = mysql.createPool({
            uri: process.env.DB_URI,
            ssl: { rejectUnauthorized: false },
            waitForConnections: true,
            connectionLimit: 5,
        });
    }
    return pool;
}

// ─── Ensure Table Exists (runs once per cold start) ───
let tableReady = false;
async function ensureTable() {
    if (tableReady) return;
    const db = getPool();
    await db.execute(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id VARCHAR(50) UNIQUE NOT NULL,
            username VARCHAR(100) NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            phone VARCHAR(20),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
    tableReady = true;
}

// ─── Auth Middleware ───
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
}

// ─── ROUTES ───

app.post('/api/register', async (req, res) => {
    try {
        await ensureTable();
        const db = getPool();
        const { user_id, username, password, email, phone } = req.body;

        if (!user_id || !username || !password || !email) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const [existing] = await db.execute(
            'SELECT id FROM users WHERE user_id = ? OR email = ?',
            [user_id, email]
        );
        if (existing.length > 0) {
            return res.status(409).json({ error: 'User ID or email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.execute(
            'INSERT INTO users (user_id, username, password, email, phone) VALUES (?, ?, ?, ?, ?)',
            [user_id, username, hashedPassword, email, phone || null]
        );

        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        await ensureTable();
        const db = getPool();
        const { user_id, password } = req.body;

        if (!user_id || !password) {
            return res.status(400).json({ error: 'User ID and password are required' });
        }

        const [users] = await db.execute(
            'SELECT * FROM users WHERE user_id = ?',
            [user_id]
        );

        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = users[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, user_id: user.user_id, username: user.username },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                user_id: user.user_id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

app.get('/api/shows', authenticateToken, async (req, res) => {
    try {
        const query = req.query.q || 'netflix';
        const response = await axios.get(
            `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`
        );
        res.json(response.data);
    } catch (error) {
        console.error('Shows API error:', error.message);
        res.status(500).json({ error: 'Failed to fetch shows' });
    }
});

app.get('/api/verify', authenticateToken, (req, res) => {
    res.json({ valid: true, user: req.user });
});

export default app;
