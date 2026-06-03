const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }

  :root {
    --clr-bg: #060711;
    --clr-surface: rgba(255,255,255,.042);
    --clr-surface2: rgba(255,255,255,.07);
    --clr-border: rgba(255,255,255,.08);
    --clr-border2: rgba(255,255,255,.13);
    --clr-primary: #7C3AED;
    --clr-primary2: #4F46E5;
    --clr-accent: #A78BFA;
    --clr-accent2: #C4B5FD;
    --clr-text: #F1F5F9;
    --clr-text2: rgba(255,255,255,.62);
    --clr-text3: rgba(255,255,255,.38);
    --clr-green: #34D399;
    --clr-gold: #F59E0B;
    --card-radius: 20px;
    --sheet-radius: 28px;
    --btn-radius: 16px;
    --nav-h: 62px;
    --top-h: 58px;
    --font: 'Cairo', system-ui, sans-serif;
  }

  html, body { 
    margin: 0; padding: 0; 
    background: var(--clr-bg); 
    color: var(--clr-text);
    font-family: var(--font);
    overscroll-behavior: none;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  button { font-family: var(--font); cursor: pointer; }
  input, select, textarea { font-family: var(--font); }
  a { text-decoration: none; }
  img { display: block; }

  ::-webkit-scrollbar { display: none; }
  * { scrollbar-width: none; -ms-overflow-style: none; }

  @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(18px) } to { opacity: 1; transform: translateY(0) } }
  @keyframes slideRight { from { transform: translateX(100%) } to { transform: translateX(0) } }
  @keyframes slideLeft { from { transform: translateX(-100%) } to { transform: translateX(0) } }
  @keyframes scaleIn { from { opacity: 0; transform: scale(.92) } to { opacity: 1; transform: scale(1) } }
  @keyframes spin { to { transform: rotate(360deg) } }
  @keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
  @keyframes pulse1 { 0% { transform: scale(.8); opacity: .8 } 100% { transform: scale(1.5); opacity: 0 } }
  @keyframes pulse2 { 0% { transform: scale(.7); opacity: .6 } 100% { transform: scale(1.8); opacity: 0 } }
  @keyframes pulse3 { 0% { transform: scale(.6); opacity: .4 } 100% { transform: scale(2.1); opacity: 0 } }
  @keyframes glow { 0%,100% { opacity: .4; transform: scale(1) } 50% { opacity: .7; transform: scale(1.03) } }
  @keyframes heartPop { 0% { transform: scale(1) } 40% { transform: scale(1.38) } 70% { transform: scale(.9) } 100% { transform: scale(1) } }
  @keyframes cardIn { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
  @keyframes sectionIn { from { opacity: 0; transform: translateX(12px) } to { opacity: 1; transform: translateX(0) } }
  @keyframes authSheetUp { from { transform: translateY(100%) } to { transform: translateY(0) } }
  @keyframes authBackdropIn { from { opacity: 0 } to { opacity: 1 } }
  @keyframes pageSlideIn { from { opacity: 0; transform: translateX(24px) } to { opacity: 1; transform: translateX(0) } }
  @keyframes shimmer { 0% { background-position: -400px 0 } 100% { background-position: 400px 0 } }
  @keyframes bounceIn { 0% { transform: scale(.5); opacity: 0 } 60% { transform: scale(1.1) } 100% { transform: scale(1); opacity: 1 } }
  @keyframes slideR { from { transform: translateX(100%) } to { transform: translateX(0) } }
  @keyframes slideL { from { transform: translateX(-100%) } to { transform: translateX(0) } }
  @keyframes notifBounce { 0%,100% { transform: scale(1) } 50% { transform: scale(1.2) } }

  .skel {
    background: linear-gradient(90deg, rgba(255,255,255,.04) 25%, rgba(255,255,255,.09) 50%, rgba(255,255,255,.04) 75%);
    background-size: 400px 100%;
    animation: shimmer 1.6s infinite;
    border-radius: 12px;
  }

  .btn-press { transition: transform .12s, filter .15s; }
  .btn-press:active { transform: scale(.95) !important; filter: brightness(.92); }
  .btn { transition: filter .18s, transform .12s; }
  .btn:active { transform: scale(.97); }

  .hov { transition: transform .22s ease, box-shadow .22s ease; }
  .hov:hover { transform: translateY(-3px); box-shadow: 0 18px 40px rgba(0,0,0,.3); }
  .hov:active { transform: scale(.98) !important; }

  .car-img { transition: transform .36s ease; }
  .hov:hover .car-img { transform: scale(1.04); }

  .sug { transition: background .16s; }
  .sug:hover { background: rgba(124,58,237,.12); }

  .nav-label { user-select: none; letter-spacing: .2px; }

  .bottom-nav { box-shadow: 0 -1px 0 rgba(255,255,255,.06), 0 -12px 36px rgba(0,0,0,.38); }

  .momentum-scroll { -webkit-overflow-scrolling: touch; }

  :root {
    --card-img-h: 192px;
    --font-card-title: 15.5px;
    --font-card-price: 18px;
    --app-padding: 16px;
    --app-max-width: 900px;
    --grid-cols: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
    --nav-height: 58px;
    --top-nav-total: 58px;
    --bottom-nav-h: 64px;
    --hero-padding: 24px 12px 20px;
    --standalone-extra-top: 0px;
  }

  input:focus, textarea:focus, select:focus {
    outline: none;
    border-color: rgba(124,58,237,.65) !important;
    box-shadow: 0 0 0 3px rgba(124,58,237,.15) !important;
  }
`;

export default CSS;
