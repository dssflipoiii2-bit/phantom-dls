/* ════════════════════════════════════════
   PHANTOM SOFTWARE — Main JavaScript
   ════════════════════════════════════════ */

// ── Scroll Reveal ─────────────────────────────
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── Language ──────────────────────────────────
let currentLang = 'ru';

const i18n = {
    ru: {
        'nav-features': 'Особенности',
        'nav-pricing': 'Тарифы',
        'nav-start': 'Запуск',
        'nav-support': 'Поддержка',
        'nav-cabinet': 'Кабинет',
        'hero-line1': 'Знай больше.',
        'hero-line2': 'Побеждай с <span class="highlight">Phantom.</span>',
        'hero-sub': 'Поднимите свой игровой процесс на новый уровень.<br>Контроль, скорость и точность — всё уже внутри.',
        'hero-btn1': 'Создать аккаунт',
        'hero-btn2': 'Смотреть тарифы',
        'feat-title': 'ПРЕИМУЩЕСТВА PHANTOM',
        'feat1-title': 'Улучшение FPS',
        'feat1-desc': 'Продвинутая оптимизация рендеринга, выжимающая максимум кадров без потери качества.',
        'feat2-title': 'Визуальные функции',
        'feat2-desc': 'Кристально чистый ESP, настраиваемый HUD и эстетические модификации мира под ваш стиль.',
        'feat3-title': 'Обход Античитов',
        'feat3-desc': 'Современные модули для обхода серверных защит. Играйте уверенно с постоянными обновлениями.',
        'feat4-title': 'Удобный интерфейс',
        'feat4-desc': 'Интуитивный HUD, полностью настраиваемый под ваши задачи. Без лишних кликов — сразу к игре.',
        'feat5-title': 'Антилаг',
        'feat5-desc': 'Умная система снижения пинга и стабилизации соединения для максимального комфорта.',
        'feat6-title': '24/7 Поддержка',
        'feat6-desc': 'Команда специалистов всегда на связи. Быстрые ответы в Telegram и Discord в любое время.',
        'price-title': 'ТАРИФЫ',
        'price-sub': 'Доведите свою игру до совершенства. Выберите подходящий тариф.',
        'c1-tag': 'ТАРИФ · 1 МЕСЯЦ',
        'c1-name': 'Phantom Месяц',
        'c1-desc': 'Вы получаете ранний доступ к новым модулям, обновлениям клиента и эксклюзивным функциям.',
        'c2-tag': 'ТАРИФ · 1 ГОД',
        'c2-name': 'Phantom Год',
        'c2-desc': 'Полный доступ ко всем функциям на 365 дней. Выгодное решение для активных игроков.',
        'c2-badge': 'ПОПУЛЯРНОЕ',
        'c3-tag': 'РАЗОВАЯ УСЛУГА',
        'c3-name': 'Phantom Навсегда',
        'c3-desc': 'Вы получаете клиент абсолютно навсегда, так же все последующие обновления.',
        'c4-tag': 'РАЗОВАЯ УСЛУГА',
        'c4-name': 'Сброс HWID',
        'c4-desc': 'Сброс привязки устройства. Если сменили ПК или переустановили систему — мы развяжем аккаунт.',
        'btn-buy': 'Купить',
        'how-title': 'Запуск за<br>несколько минут',
        'how-sub': 'От регистрации до первой игры — без сложной настройки.<br>Скачай лаунчер, войди в аккаунт и играй.',
        'step1-title': 'Создайте аккаунт',
        'step1-desc': 'Быстрая регистрация за минуту. Один аккаунт — доступ ко всем продуктам и функционалу.',
        'step2-title': 'Скачайте клиент',
        'step2-desc': 'Загрузите лаунчер через личный кабинет на сайте. Он автоматически подтянет последнюю версию.',
        'step3-title': 'Играйте и побеждайте',
        'step3-desc': 'Выберите сервер и запустите. Контроль, скорость и точность — с первой секунды.',
        'cta-title': 'Начни побеждать <span class="highlight">сегодня</span>',
        'cta-sub': 'Присоединяйся к тысячам игроков, которые уже выбрали Phantom.',
        'cta-btn': 'Создать аккаунт →',
        'sup-title': 'Нужна помощь?',
        'sup-desc': 'Наша команда поддержки готова помочь вам 24/7. Пишите в наш Telegram или Discord.',
        'footer-tagline': 'Клиент, который делает тебя непобедимым.',
        'footer-col1': 'ПЛАТФОРМА',
        'footer-l1': 'Создать аккаунт',
        'footer-l2': 'Войти в аккаунт',
        'footer-l3': 'Личный кабинет',
        'footer-l4': 'Тарифы',
        'footer-col2': 'НАВИГАЦИЯ',
        'footer-l5': 'Особенности',
        'footer-l6': 'Запуск',
        'footer-l7': 'Поддержка',
        'footer-l8': 'Обновления',
        'footer-col3': 'ДОКУМЕНТЫ',
        'footer-l9': 'Политика конфиденциальности',
        'footer-l10': 'Условия пользования',
        'footer-l11': 'Возврат средств',
        'footer-l12': 'Обработка данных',
        'footer-copy': '© 2026 Phantom. Все права защищены.',
        'modal-desc': 'Вы получаете клиент, все функции и последующие обновления.',
        'modal-period': 'ПЕРИОД ТАРИФА',
        'modal-method': 'СПОСОБ ОПЛАТЫ',
        'region-ru': 'Россия',
        'region-eu': 'Европа / Украина',
        'modal-promo': 'ПРОМОКОД',
        'promo-placeholder': 'Введите промокод',
        'modal-terms': 'Я согласен с <a href="#">условиями использования</a> и понимаю, что покупка не подлежит возврату.',
        'modal-funpay': 'Оплатить через FunPay →',
    },
    en: {
        'nav-features': 'Features',
        'nav-pricing': 'Pricing',
        'nav-start': 'Get Started',
        'nav-support': 'Support',
        'nav-cabinet': 'Cabinet',
        'hero-line1': 'Know more.',
        'hero-line2': 'Win with <span class="highlight">Phantom.</span>',
        'hero-sub': 'Elevate your gameplay to a new level.<br>Control, speed, and precision — everything inside.',
        'hero-btn1': 'Create Account',
        'hero-btn2': 'View Pricing',
        'feat-title': 'PHANTOM FEATURES',
        'feat1-title': 'FPS Boost',
        'feat1-desc': 'Advanced rendering optimization pushing your FPS to the absolute max without sacrificing quality.',
        'feat2-title': 'Visuals',
        'feat2-desc': 'Crystal clear ESP, customizable HUDs and aesthetic world modifications tailored to your style.',
        'feat3-title': 'Bypass Modules',
        'feat3-desc': 'State-of-the-art anticheat evasion. Play confidently with constantly updated security modules.',
        'feat4-title': 'Clean Interface',
        'feat4-desc': 'Intuitive HUD, fully customizable for your needs. No extra clicks — straight to the game.',
        'feat5-title': 'Anti-Lag',
        'feat5-desc': 'Smart ping reduction and connection stabilization system for maximum comfort.',
        'feat6-title': '24/7 Support',
        'feat6-desc': 'Our team is always available. Fast responses on Telegram and Discord at any time.',
        'price-title': 'PRICING',
        'price-sub': 'Take your gameplay to the next level. Choose your plan.',
        'c1-tag': 'PLAN · 1 MONTH',
        'c1-name': 'Phantom Month',
        'c1-desc': 'Early access to new modules, client updates and exclusive features.',
        'c2-tag': 'PLAN · 1 YEAR',
        'c2-name': 'Phantom Year',
        'c2-desc': 'Full access to all features for 365 days. The smart choice for dedicated players.',
        'c2-badge': 'POPULAR',
        'c3-tag': 'ONE-TIME',
        'c3-name': 'Phantom Forever',
        'c3-desc': 'Lifetime access to the client and all future updates. Pay once, play forever.',
        'c4-tag': 'ONE-TIME SERVICE',
        'c4-name': 'HWID Reset',
        'c4-desc': 'Device binding reset. Changed your PC or reinstalled Windows — we will unbind your account.',
        'btn-buy': 'Buy',
        'how-title': 'Up and running<br>in minutes',
        'how-sub': 'From registration to your first match — no complex setup.<br>Download the launcher, log in, and play.',
        'step1-title': 'Create an Account',
        'step1-desc': 'Quick registration in one minute. One account — access to all products and features.',
        'step2-title': 'Download the Client',
        'step2-desc': 'Download the launcher from your dashboard. It automatically pulls the latest version.',
        'step3-title': 'Play and Win',
        'step3-desc': 'Select a server and launch. Control, speed and precision — from the first second.',
        'cta-title': 'Start winning <span class="highlight">today</span>',
        'cta-sub': 'Join thousands of players who have already chosen Phantom.',
        'cta-btn': 'Create Account →',
        'sup-title': 'Need Help?',
        'sup-desc': 'Our support team is ready to help you 24/7. Write to our Telegram or Discord.',
        'footer-tagline': 'The client that makes you unbeatable.',
        'footer-col1': 'PLATFORM',
        'footer-l1': 'Create Account',
        'footer-l2': 'Sign In',
        'footer-l3': 'Dashboard',
        'footer-l4': 'Pricing',
        'footer-col2': 'NAVIGATION',
        'footer-l5': 'Features',
        'footer-l6': 'Get Started',
        'footer-l7': 'Support',
        'footer-l8': 'Updates',
        'footer-col3': 'DOCUMENTS',
        'footer-l9': 'Privacy Policy',
        'footer-l10': 'Terms of Service',
        'footer-l11': 'Refund Policy',
        'footer-l12': 'Data Processing',
        'footer-copy': '© 2026 Phantom. All rights reserved.',
        'modal-desc': 'You get the client, all features and future updates.',
        'modal-period': 'BILLING PERIOD',
        'modal-method': 'PAYMENT METHOD',
        'region-ru': 'Russia',
        'region-eu': 'Europe / Ukraine',
        'modal-promo': 'PROMO CODE',
        'promo-placeholder': 'Enter promo code',
        'modal-terms': 'I agree to the <a href="#">terms of use</a> and understand that all purchases are final.',
        'modal-funpay': 'Pay via FunPay →',
    }
};

function applyTranslations(lang) {
    const dict = i18n[lang];
    if (!dict) return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key] !== undefined) el.innerHTML = dict[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key] !== undefined) el.placeholder = dict[key];
    });
}

function changeLanguage(lang) {
    if (currentLang === lang) return;
    currentLang = lang;
    document.querySelectorAll('.lang-selector span').forEach(s => s.classList.remove('active'));
    const btn = document.getElementById('lang-' + lang);
    if (btn) btn.classList.add('active');
    applyTranslations(lang);
}

// ── Mobile Menu ───────────────────────────────
function toggleMobileMenu() {
    const links = document.getElementById('nav-links');
    const burger = document.getElementById('burger-btn');
    if (!links) return;
    links.classList.toggle('mobile-open');
    burger.classList.toggle('open');
}

// ── Animated Price Counter (odometer style) ──
let priceAnimFrame = null;
let displayedPrice = 0;

function animatePrice(targetVal) {
    if (priceAnimFrame) cancelAnimationFrame(priceAnimFrame);
    const priceEl = document.getElementById('modal-product-price');
    const btnPriceEl = document.getElementById('modal-btn-price');
    if (!priceEl) return;

    const startVal = displayedPrice;
    const diff     = targetVal - startVal;
    const duration = Math.min(600, Math.abs(diff) * 2.5); // faster for small changes
    const startTime = performance.now();

    function step(now) {
        const elapsed  = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const ease     = 1 - Math.pow(1 - progress, 3);
        const current  = Math.round(startVal + diff * ease);
        displayedPrice = current;
        priceEl.textContent    = current + ' ₽';
        if (btnPriceEl) btnPriceEl.textContent = current;
        if (progress < 1) {
            priceAnimFrame = requestAnimationFrame(step);
        } else {
            displayedPrice = targetVal;
            priceEl.textContent    = targetVal + ' ₽';
            if (btnPriceEl) btnPriceEl.textContent = targetVal;
        }
    }
    priceAnimFrame = requestAnimationFrame(step);
}

// ── Payment Modal ─────────────────────────────
let currentModalPrice = 0;

const periodData = {
    purple: [
        { label: '30 дней', price: 100 }
    ],
    blue: [
        { label: '90 дней', price: 300 },
        { label: '30 дней', price: 100 }
    ],
    green: [
        { label: 'Навсегда', price: 500 },
        { label: '90 дней', price: 300 },
        { label: '30 дней', price: 100 }
    ],
    orange: [
        { label: 'Разово', price: 449 }
    ]
};

function openPaymentModal(productName, basePrice, cardType) {
    const modal = document.getElementById('payment-modal');
    const priceEl = document.getElementById('modal-product-price');
    const leftTitle = document.getElementById('modal-left-title');

    leftTitle.textContent = productName;
    priceEl.textContent = basePrice + ' ₽';
    displayedPrice = basePrice;
    currentModalPrice = basePrice;

    const btnPrice = document.getElementById('modal-btn-price');
    if (btnPrice) btnPrice.textContent = basePrice;

    // Build period buttons
    const selector = document.getElementById('period-selector');
    selector.innerHTML = '';
    const periods = periodData[cardType] || periodData.green;
    periods.forEach((p, i) => {
        const btn = document.createElement('button');
        btn.className = 'period-btn' + (i === 0 ? ' active' : '');
        btn.textContent = p.label + ' — ' + p.price + ' ₽';
        btn.onclick = () => selectPeriod(btn, p.price, p.label);
        selector.appendChild(btn);
    });

    // Reset terms checkbox
    const terms = document.getElementById('terms-check');
    if (terms) terms.checked = false;

    // Reset payment buttons
    document.querySelectorAll('.pay-btn').forEach((b, i) => b.classList.toggle('active', i === 0));

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closePaymentModal() {
    document.getElementById('payment-modal').classList.remove('open');
    document.body.style.overflow = '';
}

function handleModalOverlayClick(e) {
    if (e.target === document.getElementById('payment-modal')) closePaymentModal();
}

function selectPeriod(btn, price, label) {
    document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentModalPrice = price;
    animatePrice(price);
}

function selectPayBtn(btn) {
    document.querySelectorAll('.pay-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

function handlePayment() {
    const terms = document.getElementById('terms-check');
    if (!terms || !terms.checked) {
        alert('Пожалуйста, примите условия использования');
        return;
    }
    alert('Оплата в разработке. Свяжитесь с поддержкой для приобретения лицензии.');
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closePaymentModal(); });

// ── Auth Page ─────────────────────────────────
function toggleAuth() {
    const login = document.getElementById('login-form');
    const reg   = document.getElementById('register-form');
    if (!login || !reg) return;
    const showingLogin = login.style.display !== 'none';
    login.style.display = showingLogin ? 'none' : 'block';
    reg.style.display   = showingLogin ? 'block' : 'none';
    ['login-error','register-error'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.style.display='none'; el.textContent=''; }
    });
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

async function handleAuth(event, type) {
    event.preventDefault();
    const errorDiv = document.getElementById(`${type}-error`);
    const email    = document.getElementById(`${type}-email`).value.trim();
    const password = document.getElementById(`${type}-password`).value;

    if (!validateEmail(email)) {
        showError(errorDiv, 'Введите корректный email (например: user@gmail.com)');
        return;
    }
    if (type === 'register') {
        const repeat = document.getElementById('register-repeat-password').value;
        if (password.length < 8) { showError(errorDiv, 'Пароль должен быть не менее 8 символов'); return; }
        if (password !== repeat)  { showError(errorDiv, 'Пароли не совпадают'); return; }
    }

    const btn = event.target.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Загрузка...';

    try {
        const res  = await fetch(`/api/${type}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
            window.location.href = 'cabinet.html';
        } else {
            showError(errorDiv, data.error || 'Произошла ошибка. Попробуйте снова.');
        }
    } catch {
        showError(errorDiv, 'Ошибка соединения с сервером.');
    } finally {
        btn.disabled = false;
        btn.textContent = type === 'login' ? 'Войти' : 'Зарегистрироваться';
    }
}

function showError(el, msg) {
    if (!el) return;
    el.textContent = msg;
    el.style.display = 'block';
}

// ── Cabinet ───────────────────────────────────
async function fetchUserData() {
    const content = document.getElementById('cabinet-content');
    const loading = document.getElementById('loading');
    if (!content || !loading) return;

    try {
        const res  = await fetch('/api/user');
        if (!res.ok) { window.location.href = 'auth.html'; return; }
        const data = await res.json();

        document.getElementById('user-uid').textContent   = '#' + String(data.uid).padStart(6, '0');
        document.getElementById('user-email').textContent = data.email;

        const hwidEl = document.getElementById('user-hwid');
        if (hwidEl) {
            hwidEl.textContent = 'Привязывается при запуске клиента';
            hwidEl.style.color = 'var(--muted)';
            hwidEl.style.fontStyle = 'italic';
        }

        const statusEl = document.getElementById('sub-status');
        const dateEl   = document.getElementById('sub-date');
        const noSubBlock = document.getElementById('no-sub-block');

        if (data.subscription_end) {
            const end = new Date(data.subscription_end);
            if (end > new Date()) {
                if (statusEl) statusEl.innerHTML = 'Активна <span class="badge-active">Premium</span>';
                if (dateEl)   dateEl.textContent = end.toLocaleDateString('ru-RU', {day:'numeric',month:'long',year:'numeric'});
                if (noSubBlock) noSubBlock.style.display = 'none';
            } else {
                if (statusEl) statusEl.innerHTML = '<span style="color:#ff6b6b">Истекла</span>';
                if (dateEl)   dateEl.textContent = 'Подписка закончилась';
                if (noSubBlock) noSubBlock.style.display = 'block';
            }
        } else {
            if (statusEl) statusEl.innerHTML = '<span style="color:var(--muted)">Нет подписки</span>';
            if (dateEl)   dateEl.textContent = '—';
            if (noSubBlock) noSubBlock.style.display = 'block';
        }

        const statsContainer = document.getElementById('stats-container');
        if (statsContainer && data.playtime) {
            let html = '';
            for (const [server, hours] of Object.entries(data.playtime)) {
                html += `<div class="stat-row"><span class="stat-name">${server}</span><span class="stat-value">${hours} ч.</span></div>`;
            }
            statsContainer.innerHTML = html || '<div style="color:var(--muted);font-size:.9rem">Нет данных</div>';
        }

        loading.style.display   = 'none';
        content.style.display   = 'block';
    } catch {
        window.location.href = 'auth.html';
    }
}

async function handleLogout() {
    try { await fetch('/api/logout', { method: 'POST' }); } catch {}
    window.location.href = 'index.html';
}

if (document.getElementById('cabinet-content')) fetchUserData();
