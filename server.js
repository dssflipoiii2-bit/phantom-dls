const express      = require('express');
const session      = require('express-session');
const bcrypt       = require('bcrypt');
const path         = require('path');
const helmet       = require('helmet');
const rateLimit    = require('express-rate-limit');
const db           = require('./database');

const app  = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// ─── Security: Helmet (HTTP headers) ────────────────────────────────
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc:     ["'self'"],
            scriptSrc:      ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
            styleSrc:       ["'self'", "'unsafe-inline'", "fonts.googleapis.com", "fonts.gstatic.com"],
            fontSrc:        ["'self'", "fonts.gstatic.com", "fonts.googleapis.com"],
            imgSrc:         ["'self'", "data:", "blob:"],
            connectSrc:     ["'self'"],
        }
    },
    crossOriginEmbedderPolicy: false
}));

// ─── Security: Rate Limiting ─────────────────────────────────────────
// Global: 200 req/min per IP
const globalLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Слишком много запросов. Попробуйте через минуту.' }
});

// Auth endpoints: 10 attempts per 15 min per IP (brute-force protection)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Слишком много попыток входа. Попробуйте через 15 минут.' },
    skipSuccessfulRequests: true
});

app.use(globalLimiter);
app.set('trust proxy', 1); // Trust Cloudflare/Railway proxy

// ─── Middleware ───────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));           // Payload size limit
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ─── Session ──────────────────────────────────────────────────────────
const SESSION_SECRET = process.env.SESSION_SECRET || 'phantom-secret-key-change-in-prod-2026!@#';
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: 'phantom.sid',   // Don't reveal we use express-session
    cookie: {
        secure:   isProduction,  // HTTPS only in prod
        httpOnly: true,          // No JS access to cookie
        sameSite: 'lax',
        maxAge:   1000 * 60 * 60 * 24 * 7  // 7 days
    }
}));

// ─── HTTPS redirect in production ────────────────────────────────────
if (isProduction) {
    app.use((req, res, next) => {
        if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect(301, 'https://' + req.headers.host + req.url);
        }
        next();
    });
}

// ─── Helpers ──────────────────────────────────────────────────────────
function isValidEmail(email) {
    return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email);
}

function sanitize(str) {
    if (typeof str !== 'string') return '';
    return str.trim().slice(0, 254);
}

// ─── Routes ───────────────────────────────────────────────────────────

// Register
app.post('/api/register', authLimiter, async (req, res) => {
    const email    = sanitize(req.body.email || '');
    const password = req.body.password || '';

    if (!email || !password)
        return res.status(400).json({ error: 'Введите email и пароль' });
    if (!isValidEmail(email))
        return res.status(400).json({ error: 'Введите корректный email адрес' });
    if (password.length < 8)
        return res.status(400).json({ error: 'Пароль должен содержать не менее 8 символов' });
    if (password.length > 128)
        return res.status(400).json({ error: 'Пароль слишком длинный' });

    try {
        const hashedPassword = await bcrypt.hash(password, 12); // rounds: 12 (stronger)
        const defaultPlaytime = JSON.stringify({ FunTime: 0, SpookyTime: 0, ReallyWorld: 0 });

        db.run(
            `INSERT INTO users (email, password, hwid, subscription_end, playtime) VALUES (?, ?, NULL, NULL, ?)`,
            [email.toLowerCase(), hashedPassword, defaultPlaytime],
            function(err) {
                if (err) {
                    if (err.message.includes('UNIQUE constraint failed'))
                        return res.status(400).json({ error: 'Этот email уже зарегистрирован' });
                    return res.status(500).json({ error: 'Ошибка базы данных' });
                }
                req.session.userId = this.lastID;
                req.session.save(() => {
                    res.json({ message: 'Регистрация успешна', uid: this.lastID });
                });
            }
        );
    } catch (err) {
        console.error('Register error:', err.message);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Login
app.post('/api/login', authLimiter, (req, res) => {
    const email    = sanitize(req.body.email || '').toLowerCase();
    const password = req.body.password || '';

    if (!email || !password)
        return res.status(400).json({ error: 'Введите email и пароль' });

    db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
        if (err) return res.status(500).json({ error: 'Ошибка базы данных' });

        // Same error for wrong email or wrong password (prevents user enumeration)
        if (!user) {
            await bcrypt.hash('dummy', 10); // timing attack prevention
            return res.status(400).json({ error: 'Неверный email или пароль' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: 'Неверный email или пароль' });

        req.session.userId = user.uid;
        req.session.save(() => {
            res.json({ message: 'Вход выполнен успешно' });
        });
    });
});

// Logout
app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ error: 'Ошибка выхода' });
        res.clearCookie('phantom.sid');
        res.json({ message: 'Выход выполнен' });
    });
});

// Get current user
app.get('/api/user', (req, res) => {
    if (!req.session.userId)
        return res.status(401).json({ error: 'Не авторизован' });

    db.get(
        `SELECT uid, email, hwid, subscription_end, playtime FROM users WHERE uid = ?`,
        [req.session.userId],
        (err, user) => {
            if (err)  return res.status(500).json({ error: 'Ошибка базы данных' });
            if (!user) return res.status(404).json({ error: 'Пользователь не найден' });
            if (user.playtime) {
                try { user.playtime = JSON.parse(user.playtime); } catch(e) {}
            }
            res.json(user);
        }
    );
});

// ─── 404 handler ──────────────────────────────────────────────────────
app.use((req, res) => {
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: 'Эндпоинт не найден' });
    }
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─── Error handler ────────────────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error('Server error:', err.message);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// ─── Start ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`Phantom server running on http://localhost:${PORT}`);
    console.log(`Mode: ${isProduction ? 'PRODUCTION 🔒' : 'development'}`);
});
