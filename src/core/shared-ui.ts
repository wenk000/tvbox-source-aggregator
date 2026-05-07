// Shared JS utilities embedded into page <script> tags
export const sharedUi = `
const $ = id => document.getElementById(id);

function esc(s) {
  if (!s) return '';
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function getLang() {
  const s = localStorage.getItem('lang');
  if (s === 'en' || s === 'zh') return s;
  return navigator.language?.startsWith('zh') ? 'zh' : 'en';
}

function applyLang(translations, lang) {
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.dataset.i18n;
    const v = translations[lang]?.[k];
    if (v) el.innerHTML = v;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const k = el.dataset.i18nPlaceholder;
    const v = translations[lang]?.[k];
    if (v) el.placeholder = v;
  });
  document.querySelectorAll('[data-i18n-text]').forEach(el => {
    const k = el.dataset.i18nText;
    const v = translations[lang]?.[k];
    if (v) el.textContent = v;
  });
  const toggle = $('langToggle');
  if (toggle) toggle.textContent = lang === 'zh' ? 'EN' : '中文';
  document.body.style.opacity = '1';
}

function toast(msg, type) {
  type = type || 'success';
  const el = document.createElement('div');
  el.className = 'toast ' + type;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 300); }, 2500);
}

function initAuth(tokenInputId, errorId, overlayId, contentId, verifyUrl, onSuccess) {
  let token = '';
  const tokenInput = $(tokenInputId);
  const overlay = $(overlayId);
  const content = $(contentId);
  const errorEl = $(errorId);

  function getToken() { return token; }

  function authFetch(url, opts) {
    opts = opts || {};
    opts.headers = Object.assign({}, opts.headers, { 'Authorization': 'Bearer ' + token });
    return fetch(url, opts);
  }

  function doLogin() {
    token = tokenInput.value.trim();
    if (!token) return;
    fetch(verifyUrl, {
      headers: { 'Authorization': 'Bearer ' + token }
    }).then(r => {
      if (r.ok) {
        overlay.style.display = 'none';
        content.style.display = 'block';
        sessionStorage.setItem('admin_token', token);
        onSuccess();
      } else {
        errorEl.style.display = 'block';
        tokenInput.value = '';
        tokenInput.focus();
      }
    }).catch(() => {
      errorEl.style.display = 'block';
    });
  }

  tokenInput.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });

  // Auto-login from session
  const saved = sessionStorage.getItem('admin_token');
  if (saved) {
    token = saved;
    fetch(verifyUrl, {
      headers: { 'Authorization': 'Bearer ' + token }
    }).then(r => {
      if (r.ok) {
        overlay.style.display = 'none';
        content.style.display = 'block';
        onSuccess();
      }
    });
  }

  return { doLogin, authFetch, getToken };
}

function toggleCollapsible(toggleEl) {
  toggleEl.classList.toggle('open');
  const body = toggleEl.nextElementSibling;
  if (body) body.classList.toggle('open');
}

function getTheme() {
  return localStorage.getItem('theme') || 'dark';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  var btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  var next = getTheme() === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);
}

// 从服务端加载背景设置并应用（所有页面共享）
function loadBgFromServer() {
  fetch('/api/bg-settings').then(function(r) {
    if (!r.ok) return;
    return r.json();
  }).then(function(cfg) {
    if (!cfg) return;
    var overlay = typeof cfg.overlay === 'number' ? cfg.overlay : 85;
    document.documentElement.style.setProperty('--bg-overlay-opacity', (overlay / 100).toFixed(2));
    if (cfg.type === 'image' && cfg.imageUrl) {
      document.body.setAttribute('data-bg-image', cfg.imageUrl);
      document.body.style.backgroundImage = 'url(' + CSS.escape(cfg.imageUrl) + ')';
    } else if (cfg.type === 'solid' && cfg.solidColor) {
      document.body.removeAttribute('data-bg-image');
      document.body.style.background = cfg.solidColor;
    } else if (cfg.type === 'gradient' && cfg.gradient) {
      document.body.removeAttribute('data-bg-image');
      document.body.style.background = cfg.gradient;
    } else {
      document.body.removeAttribute('data-bg-image');
      document.body.style.background = '';
    }
  }).catch(function() {});
}
`;
