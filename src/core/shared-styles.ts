// Shared CSS across admin, dashboard, config-editor pages
export const sharedStyles = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Outfit:wght@300;400;600;700&display=swap');

*{margin:0;padding:0;box-sizing:border-box}

:root{
  --bg:#0a0e14;
  --surface:#111720;
  --surface-2:#161d2a;
  --border:#1e2a3a;
  --border-glow:#2a3f5f;
  --green:#00e5a0;
  --green-dim:#00e5a033;
  --green-glow:#00e5a066;
  --amber:#f0a030;
  --amber-dim:#f0a03033;
  --red:#ff4060;
  --red-dim:#ff406033;
  --blue:#4da6ff;
  --blue-dim:#4da6ff33;
  --text:#c8d6e5;
  --text-dim:#5a6d82;
  --text-bright:#fff;
  --mono:'JetBrains Mono',monospace;
  --sans:'Outfit',sans-serif;
  /* 背景覆盖层透明度，用户自定义背景时可调整内容可读性 */
  --bg-overlay-opacity:0.85;
}

[data-theme="light"]{
  --bg:#f4f6f9;
  --surface:#ffffff;
  --surface-2:#eef1f5;
  --border:#d4dae3;
  --border-glow:#b8c2d0;
  --green:#008c63;
  --green-dim:#008c6320;
  --green-glow:#008c6340;
  --amber:#b87a10;
  --amber-dim:#b87a1020;
  --red:#d02040;
  --red-dim:#d0204020;
  --blue:#2d7cd6;
  --blue-dim:#2d7cd620;
  --text:#2c3e50;
  --text-dim:#6b7d8f;
  --text-bright:#1a202c;
  --bg-overlay-opacity:0.88;
}

[data-theme="light"] body::before,
[data-theme="light"] body::after{
  opacity:0;
}
[data-theme="light"] body{
  background:linear-gradient(180deg, #f4f6f9 0%, #eaeff5 40%, #f4f6f9 100%);
}

/* ─── 日落/暖色 ─────────────────────────────────────── */
[data-theme="sunset"]{
  --bg:#1a1208;
  --surface:#241a0e;
  --surface-2:#2e2214;
  --border:#3a2e1e;
  --border-glow:#5a4428;
  --green:#e8a040;
  --green-dim:#e8a04025;
  --green-glow:#e8a04050;
  --amber:#f0c060;
  --amber-dim:#f0c06025;
  --red:#e05030;
  --red-dim:#e0503025;
  --blue:#60b0d0;
  --blue-dim:#60b0d025;
  --text:#e0cbb0;
  --text-dim:#8a7560;
  --text-bright:#fff5e6;
  --bg-overlay-opacity:0.85;
}
[data-theme="sunset"] body::before,
[data-theme="sunset"] body::after{opacity:0}
[data-theme="sunset"] body{
  background:linear-gradient(180deg, #1a1208 0%, #201508 40%, #1a1208 100%);
}

/* ─── 赛博朋克 ─────────────────────────────────────── */
[data-theme="cyber"]{
  --bg:#08000f;
  --surface:#12001e;
  --surface-2:#1a0a2e;
  --border:#2a1050;
  --border-glow:#4a1890;
  --green:#ff2d7b;
  --green-dim:#ff2d7b22;
  --green-glow:#ff2d7b44;
  --amber:#ffcc00;
  --amber-dim:#ffcc0022;
  --red:#ff4444;
  --red-dim:#ff444422;
  --blue:#00d4ff;
  --blue-dim:#00d4ff22;
  --text:#e0d0f0;
  --text-dim:#7a60a0;
  --text-bright:#f0eaff;
  --bg-overlay-opacity:0.82;
}
[data-theme="cyber"] body::before,
[data-theme="cyber"] body::after{opacity:0}
[data-theme="cyber"] body{
  background:linear-gradient(180deg, #08000f 0%, #0e0520 40%, #08000f 100%);
}

/* ─── 护眼/低蓝光 ──────────────────────────────────── */
[data-theme="eyecare"]{
  --bg:#0d1a0d;
  --surface:#142014;
  --surface-2:#1a2818;
  --border:#253822;
  --border-glow:#3a5830;
  --green:#70c070;
  --green-dim:#70c07020;
  --green-glow:#70c07040;
  --amber:#b8c060;
  --amber-dim:#b8c06020;
  --red:#c05050;
  --red-dim:#c0505020;
  --blue:#50a080;
  --blue-dim:#50a08020;
  --text:#b0c8a8;
  --text-dim:#5a7050;
  --text-bright:#d0e8c8;
  --bg-overlay-opacity:0.85;
}
[data-theme="eyecare"] body::before,
[data-theme="eyecare"] body::after{opacity:0}
[data-theme="eyecare"] body{
  background:linear-gradient(180deg, #0d1a0d 0%, #101e10 40%, #0d1a0d 100%);
}

/* ─── 紫罗兰 ───────────────────────────────────────── */
[data-theme="violet"]{
  --bg:#140a20;
  --surface:#1e1230;
  --surface-2:#28183e;
  --border:#3a2458;
  --border-glow:#5a3880;
  --green:#c084fc;
  --green-dim:#c084fc22;
  --green-glow:#c084fc44;
  --amber:#f0a0d0;
  --amber-dim:#f0a0d022;
  --red:#ff6090;
  --red-dim:#ff609022;
  --blue:#80b0ff;
  --blue-dim:#80b0ff22;
  --text:#d0c0e8;
  --text-dim:#8068a0;
  --text-bright:#f0e8ff;
  --bg-overlay-opacity:0.84;
}
[data-theme="violet"] body::before,
[data-theme="violet"] body::after{opacity:0}
[data-theme="violet"] body{
  background:linear-gradient(180deg, #140a20 0%, #180e28 40%, #140a20 100%);
}

/* 自定义背景图支持：当 body 有 data-bg-image 属性时启用 */
body[data-bg-image]{
  background-size:cover !important;
  background-position:center center !important;
  background-attachment:fixed !important;
  background-repeat:no-repeat !important;
}

body[data-bg-image]::before{
  content:'';
  position:fixed;
  inset:0;
  background:var(--bg);
  opacity:var(--bg-overlay-opacity);
  pointer-events:none;
  z-index:0;
}

html{font-size:16px}
body{
  background:
    linear-gradient(180deg, #0a0e14 0%, #0d1420 40%, #0a0e14 100%);
  color:var(--text);
  font-family:var(--sans);
  font-size:0.95rem;
  min-height:100vh;
  overflow-x:hidden;
  position:relative;
}

body::after{
  content:'';
  position:fixed;
  inset:0;
  background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.03) 2px,rgba(0,0,0,0.03) 4px);
  pointer-events:none;
  z-index:1000;
}

body::before{
  content:'';
  position:fixed;
  inset:0;
  background:
    radial-gradient(ellipse 60% 50% at 20% 10%, rgba(0,229,160,0.08) 0%, transparent 60%),
    radial-gradient(ellipse 50% 40% at 80% 20%, rgba(77,166,255,0.06) 0%, transparent 60%),
    radial-gradient(ellipse 40% 30% at 50% 90%, rgba(240,160,48,0.04) 0%, transparent 60%),
    linear-gradient(rgba(30,42,58,0.15) 1px, transparent 1px),
    linear-gradient(90deg, rgba(30,42,58,0.15) 1px, transparent 1px);
  background-size:100% 100%, 100% 100%, 100% 100%, 60px 60px, 60px 60px;
  pointer-events:none;
  z-index:0;
  animation:bgShift 20s ease-in-out infinite alternate;
}

@keyframes bgShift{
  0%{
    background:
      radial-gradient(ellipse 60% 50% at 20% 10%, rgba(0,229,160,0.08) 0%, transparent 60%),
      radial-gradient(ellipse 50% 40% at 80% 20%, rgba(77,166,255,0.06) 0%, transparent 60%),
      radial-gradient(ellipse 40% 30% at 50% 90%, rgba(240,160,48,0.04) 0%, transparent 60%),
      linear-gradient(rgba(30,42,58,0.15) 1px, transparent 1px),
      linear-gradient(90deg, rgba(30,42,58,0.15) 1px, transparent 1px);
    background-size:100% 100%, 100% 100%, 100% 100%, 60px 60px, 60px 60px;
  }
  100%{
    background:
      radial-gradient(ellipse 50% 40% at 70% 15%, rgba(0,229,160,0.06) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 30% 30%, rgba(77,166,255,0.08) 0%, transparent 60%),
      radial-gradient(ellipse 50% 40% at 80% 80%, rgba(240,160,48,0.05) 0%, transparent 60%),
      linear-gradient(rgba(30,42,58,0.15) 1px, transparent 1px),
      linear-gradient(90deg, rgba(30,42,58,0.15) 1px, transparent 1px);
    background-size:100% 100%, 100% 100%, 100% 100%, 60px 60px, 60px 60px;
  }
}

.container{
  max-width:860px;
  margin:0 auto;
  padding:40px 24px 80px;
  position:relative;
  z-index:1;
}

/* Header */
.header{
  margin-bottom:24px;
  animation:fadeSlideDown 0.6s ease-out;
}

.header-top{
  display:flex;
  align-items:center;
  justify-content:space-between;
}

.header-label{
  font-family:var(--mono);
  font-size:0.9rem;
  letter-spacing:0.2em;
  text-transform:uppercase;
  color:var(--green);
  opacity:0.7;
  margin-bottom:8px;
  display:flex;
  align-items:center;
  gap:8px;
}

.header-label::before{
  content:'';
  display:inline-block;
  width:8px;height:8px;
  background:var(--green);
  border-radius:50%;
  animation:pulse 2s ease-in-out infinite;
}

.header-title{
  font-family:var(--sans);
  font-size:2rem;
  font-weight:700;
  letter-spacing:-0.02em;
  color:var(--text-bright);
  line-height:1.2;
}

.header-title span{color:var(--green)}

.header-nav{
  display:flex;
  gap:12px;
  margin-top:16px;
}

.header-nav a{
  font-family:var(--mono);
  font-size:0.9rem;
  letter-spacing:0.1em;
  text-transform:uppercase;
  color:var(--text-dim);
  text-decoration:none;
  padding:4px 10px;
  border:1px solid var(--border);
  border-radius:4px;
  transition:all 0.2s;
}

.header-nav a:hover{
  border-color:var(--text-dim);
  color:var(--text);
}

/* Language toggle */
.lang-toggle{
  font-family:var(--mono);
  font-size:1rem;
  font-weight:500;
  padding:4px 10px;
  border:1px solid var(--border);
  border-radius:4px;
  background:transparent;
  color:var(--text-dim);
  cursor:pointer;
  transition:all 0.2s;
  letter-spacing:0.05em;
}

.lang-toggle:hover{
  border-color:var(--text-dim);
  color:var(--text);
}

.theme-toggle{
  font-family:var(--mono);
  font-size:1rem;
  font-weight:500;
  padding:4px 10px;
  border:1px solid var(--border);
  border-radius:4px;
  background:transparent;
  color:var(--text-dim);
  cursor:pointer;
  transition:all 0.2s;
  line-height:1;
}
.theme-toggle:hover{
  border-color:var(--text-dim);
  color:var(--text);
}

/* 主题下拉菜单 */
.theme-dropdown{
  position:relative;
  display:inline-block;
}
.theme-dropdown-menu{
  display:none;
  position:absolute;
  top:calc(100% + 6px);
  right:0;
  min-width:150px;
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:6px;
  box-shadow:0 8px 24px rgba(0,0,0,0.4);
  z-index:100;
  overflow:hidden;
  animation:fadeSlideDown 0.15s ease-out;
}
.theme-dropdown-menu.open{display:block}
.theme-dropdown-item{
  display:flex;
  align-items:center;
  gap:8px;
  padding:8px 14px;
  cursor:pointer;
  transition:background 0.15s;
  font-family:var(--mono);
  font-size:0.85rem;
  color:var(--text);
  white-space:nowrap;
}
.theme-dropdown-item:hover{background:var(--surface-2)}
.theme-dropdown-item.active{color:var(--green);font-weight:600}
.theme-dropdown-item .theme-dot{
  width:14px;height:14px;
  border-radius:50%;
  flex-shrink:0;
  border:1px solid var(--border);
}
.theme-dropdown-item.active .theme-dot{
  border-color:var(--green);
  box-shadow:0 0 6px var(--green-glow);
}

/* Login overlay */
.login-overlay{
  position:fixed;
  inset:0;
  background:var(--bg);
  z-index:900;
  display:flex;
  align-items:center;
  justify-content:center;
}

.login-box{
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:8px;
  padding:40px;
  width:360px;
  max-width:90vw;
  animation:fadeSlideUp 0.4s ease-out;
}

.login-box h2{
  font-family:var(--sans);
  font-size:1.4rem;
  font-weight:700;
  color:var(--text-bright);
  margin-bottom:8px;
}

.login-box p{
  font-family:var(--mono);
  font-size:0.9rem;
  color:var(--text-dim);
  letter-spacing:0.1em;
  text-transform:uppercase;
  margin-bottom:24px;
}

.login-box input{
  width:100%;
  font-family:var(--mono);
  font-size:1rem;
  padding:12px 16px;
  background:var(--bg);
  border:1px solid var(--border);
  border-radius:4px;
  color:var(--text-bright);
  outline:none;
  margin-bottom:16px;
  transition:border-color 0.2s;
}

.login-box input:focus{border-color:var(--green)}

.login-box .error-msg{
  font-family:var(--mono);
  font-size:0.9rem;
  color:var(--red);
  margin-bottom:12px;
  display:none;
}

/* Buttons */
.btn{
  font-family:var(--mono);
  font-size:0.9rem;
  font-weight:600;
  letter-spacing:0.1em;
  text-transform:uppercase;
  padding:10px 20px;
  background:transparent;
  border:1px solid var(--green);
  color:var(--green);
  border-radius:4px;
  cursor:pointer;
  transition:all 0.3s;
  white-space:nowrap;
}

.btn:hover{
  background:var(--green-dim);
  box-shadow:0 0 20px var(--green-dim);
}

.btn:active{transform:scale(0.97)}

.btn.loading{
  color:var(--amber);
  border-color:var(--amber);
  pointer-events:none;
}

.btn-danger, .btn.danger{
  border-color:var(--red);
  color:var(--red);
}

.btn-danger:hover, .btn.danger:hover{
  background:var(--red-dim);
  box-shadow:0 0 20px var(--red-dim);
}

.btn.secondary{
  border-color:var(--amber);
  color:var(--amber);
}

.btn.secondary:hover{
  background:var(--amber-dim);
  box-shadow:0 0 20px var(--amber-dim);
}

.btn-sm, .btn.sm{
  padding:6px 12px;
  font-size:1rem;
}

/* Tabs */
.tabs{
  display:flex;
  gap:0;
  margin-bottom:20px;
  border-bottom:1px solid var(--border);
}

.tab{
  font-family:var(--mono);
  font-size:0.9rem;
  font-weight:500;
  letter-spacing:0.1em;
  text-transform:uppercase;
  padding:12px 20px;
  color:var(--text-dim);
  cursor:pointer;
  border-bottom:2px solid transparent;
  transition:all 0.2s;
  user-select:none;
}

.tab:hover{color:var(--text)}

.tab.active{
  color:var(--green);
  border-bottom-color:var(--green);
}

.tab .badge{
  display:inline-block;
  font-size:0.95rem;
  padding:1px 6px;
  border-radius:8px;
  margin-left:6px;
  background:var(--surface-2);
  color:var(--text-dim);
}

.tab.active .badge{
  background:var(--green-dim);
  color:var(--green);
}

.tab-panel{display:none}
.tab-panel.active{display:block}

/* Search bar */
.search-bar{
  margin-bottom:16px;
  display:flex;
  gap:10px;
}

.search-bar input{
  flex:1;
  font-family:var(--mono);
  font-size:0.95rem;
  padding:10px 14px;
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:4px;
  color:var(--text-bright);
  outline:none;
  transition:border-color 0.2s;
}

.search-bar input:focus{border-color:var(--green)}
.search-bar input::placeholder{color:var(--text-dim)}

/* Section cards */
.section{
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:8px;
  padding:24px;
  margin-bottom:20px;
  position:relative;
  overflow:hidden;
}

.section::before{
  content:'';
  position:absolute;
  top:0;left:0;right:0;
  height:1px;
  background:linear-gradient(90deg, transparent, var(--green-dim), transparent);
}

.section-title{
  font-family:var(--mono);
  font-size:0.9rem;
  letter-spacing:0.15em;
  text-transform:uppercase;
  color:var(--text-dim);
  margin-bottom:16px;
  display:flex;
  align-items:center;
  justify-content:space-between;
}

.section-title .count{
  font-size:0.9rem;
  color:var(--green);
  font-weight:600;
}

/* Source list */
.source-list{
  display:flex;
  flex-direction:column;
  gap:8px;
}

.source-item{
  display:flex;
  align-items:center;
  gap:12px;
  padding:12px 16px;
  background:var(--bg);
  border:1px solid var(--border);
  border-radius:4px;
  transition:border-color 0.2s;
}

.source-item:hover{border-color:var(--border-glow)}

.source-tag{
  font-family:var(--mono);
  font-size:0.95rem;
  font-weight:600;
  letter-spacing:0.08em;
  text-transform:uppercase;
  padding:3px 8px;
  border-radius:3px;
  flex-shrink:0;
}

.source-tag.scraped{
  background:var(--blue-dim);
  color:var(--blue);
  border:1px solid var(--blue);
}

.source-tag.manual{
  background:var(--green-dim);
  color:var(--green);
  border:1px solid var(--green);
}

.source-info{
  flex:1;
  min-width:0;
  overflow:hidden;
}

.source-name{
  font-family:var(--sans);
  font-size:1rem;
  color:var(--text-bright);
  font-weight:500;
  margin-bottom:2px;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

.source-url{
  font-family:var(--mono);
  font-size:0.9rem;
  color:var(--text-dim);
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

.source-actions{flex-shrink:0}

/* Add form */
.add-form{
  display:flex;
  gap:10px;
  margin-bottom:8px;
}

.add-form input{
  flex:1;
  font-family:var(--mono);
  font-size:0.95rem;
  padding:10px 14px;
  background:var(--bg);
  border:1px solid var(--border);
  border-radius:4px;
  color:var(--text-bright);
  outline:none;
  transition:border-color 0.2s;
}

.add-form input:focus{border-color:var(--green)}
.add-form input::placeholder{color:var(--text-dim);opacity:0.6}
.add-form .name-input{max-width:160px}

@media(max-width:560px){
  .add-form{flex-wrap:wrap}
  .add-form .name-input{max-width:100%}
}

/* Status bar (header inline) */
.status-bar{
  display:flex;
  align-items:center;
  gap:12px;
  margin-top:16px;
  font-family:var(--mono);
  font-size:0.9rem;
  color:var(--text-dim);
}

.status-indicator{
  display:flex;align-items:center;gap:6px;
  padding:4px 10px;
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:4px;
}

.status-dot{
  width:6px;height:6px;
  border-radius:50%;
  background:var(--green);
  box-shadow:0 0 6px var(--green-glow);
  animation:pulse 2s ease-in-out infinite;
}

.status-dot.offline{
  background:var(--red);
  box-shadow:0 0 6px var(--red-dim);
  animation:none;
}

/* Empty state */
.empty{
  text-align:center;
  padding:32px 16px;
  font-family:var(--mono);
  font-size:0.95rem;
  color:var(--text-dim);
}

/* Toast */
.toast{
  position:fixed;
  bottom:24px;
  right:24px;
  font-family:var(--mono);
  font-size:0.9rem;
  padding:12px 20px;
  border-radius:4px;
  z-index:999;
  animation:fadeSlideUp 0.3s ease-out;
  transition:opacity 0.3s;
}

.toast.success{
  background:var(--green-dim);
  border:1px solid var(--green);
  color:var(--green);
}

.toast.error{
  background:var(--red-dim);
  border:1px solid var(--red);
  color:var(--red);
}

/* Collapsible */
.collapsible-toggle{
  font-family:var(--mono);
  font-size:1rem;
  letter-spacing:0.08em;
  color:var(--text-dim);
  cursor:pointer;
  padding:6px 0;
  user-select:none;
  transition:color 0.2s;
}

.collapsible-toggle:hover{color:var(--text)}

.collapsible-toggle::before{
  content:'\\25B6';
  display:inline-block;
  margin-right:6px;
  font-size:0.75rem;
  transition:transform 0.2s;
}

.collapsible-toggle.open::before{transform:rotate(90deg)}

.collapsible-body{
  display:none;
  margin-top:8px;
}

.collapsible-body.open{display:block}

/* Footer */
.footer{
  margin-top:36px;
  padding-top:20px;
  border-top:1px solid var(--border);
  font-family:var(--mono);
  font-size:1rem;
  color:var(--text-dim);
  text-align:center;
  letter-spacing:0.05em;
}

/* Loading skeleton */
.skeleton{
  background:linear-gradient(90deg, var(--surface-2) 25%, var(--border) 50%, var(--surface-2) 75%);
  background-size:200% 100%;
  animation:shimmer 1.5s infinite;
  border-radius:4px;
  color:transparent !important;
}

/* API 地址展示卡片 */
.api-url-card{
  display:flex;
  align-items:center;
  gap:10px;
  padding:10px 14px;
  background:var(--bg);
  border:1px solid var(--border);
  border-radius:4px;
  margin-bottom:8px;
  flex-wrap:wrap;
}

.api-url-label{
  font-family:var(--mono);
  font-size:0.9rem;
  color:var(--text-dim);
  min-width:80px;
  flex-shrink:0;
}

.api-url-text{
  font-family:var(--mono);
  font-size:0.9rem;
  color:var(--green);
  flex:1;
  word-break:break-all;
  user-select:all;
}

.api-copy-btn{
  font-family:var(--mono);
  font-size:0.85rem;
  padding:4px 10px;
  border:1px solid var(--green);
  color:var(--green);
  background:transparent;
  border-radius:3px;
  cursor:pointer;
  white-space:nowrap;
  transition:all 0.2s;
  flex-shrink:0;
}

.api-copy-btn:hover{
  background:var(--green-dim);
}

.api-copy-btn.copied{
  color:var(--amber);
  border-color:var(--amber);
}

/* 预设颜色圆点 */
.preset-color-dot{
  width:32px;
  height:32px;
  border-radius:50%;
  cursor:pointer;
  border:2px solid transparent;
  transition:border-color 0.2s, transform 0.15s;
  flex-shrink:0;
  box-sizing:border-box;
}
.preset-color-dot:hover{
  transform:scale(1.15);
  border-color:var(--text-dim);
}
.preset-color-dot.active{
  border-color:var(--green) !important;
  box-shadow:0 0 0 2px var(--green-glow);
}
.preset-color-dot.custom-dot{
  background:conic-gradient(red,yellow,lime,aqua,blue,magenta,red) !important;
  position:relative;
  overflow:hidden;
}
.preset-color-dot.custom-dot span{
  text-shadow:0 1px 2px rgba(0,0,0,0.6);
}

/* Animations */
@keyframes fadeSlideDown{
  from{opacity:0;transform:translateY(-12px)}
  to{opacity:1;transform:translateY(0)}
}

@keyframes fadeSlideUp{
  from{opacity:0;transform:translateY(12px)}
  to{opacity:1;transform:translateY(0)}
}

@keyframes pulse{
  0%,100%{opacity:1}
  50%{opacity:0.4}
}

@keyframes loading{
  0%{width:0;left:0}
  50%{width:100%;left:0}
  100%{width:0;left:100%}
}

@keyframes shimmer{
  0%{background-position:200% 0}
  100%{background-position:-200% 0}
}
`;