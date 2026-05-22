export const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&family=Outfit:wght@300;400;600;700;800;900&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  ::-webkit-scrollbar{width:5px;} ::-webkit-scrollbar-track{background:#06060F;} ::-webkit-scrollbar-thumb{background:#7C3AED;border-radius:3px;}
  .hov{transition:transform .3s,box-shadow .3s;} .hov:hover{transform:translateY(-5px);box-shadow:0 18px 40px rgba(124,58,237,.22);}
  .navbtn:hover{color:#C084FC!important;}
  .ftab:hover{border-color:#8B5CF6!important;color:#8B5CF6!important;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.45}}
  @keyframes notifIn{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes typing1{0%,100%{transform:translateY(0);opacity:.4}33%{transform:translateY(-5px);opacity:1}}
  @keyframes typing2{0%,100%{transform:translateY(0);opacity:.4}50%{transform:translateY(-5px);opacity:1}}
  @keyframes typing3{0%,100%{transform:translateY(0);opacity:.4}66%{transform:translateY(-5px);opacity:1}}
  @keyframes successPop{0%{transform:scale(.5);opacity:0}70%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
  .anim{animation:fadeUp .5s ease both;}
  .glow{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;}
  input[type=date]{color-scheme:dark;} input:focus,textarea:focus{outline:none!important;border-color:rgba(139,92,246,.65)!important;}
  select{background:#0D0D1E!important;color:#F1F5F9!important;-webkit-appearance:none;appearance:none;} select option{background:#0D0D1E!important;color:#F1F5F9!important;} select:focus{outline:none!important;border-color:rgba(139,92,246,.65)!important;}
  .dd{max-height:260px;overflow-y:auto;} .dd::-webkit-scrollbar{width:3px;} .dd::-webkit-scrollbar-thumb{background:#7C3AED;}
  .bu{background:linear-gradient(135deg,#7C3AED,#6366F1);border-radius:18px 4px 18px 18px;}
  .ba{background:rgba(255,255,255,.07);border-radius:4px 18px 18px 18px;}
  .iz{transition:transform .4s;} .iz:hover{transform:scale(1.06);}
  /* Mobile first */
  .dko{display:none!important;}
  .mob-show{display:flex!important;}
  .mob-hide{display:none!important;}
  .dg{grid-template-columns:1fr!important;}
  .mob-grid{grid-template-columns:1fr!important;}
  .mob-col{flex-direction:column!important;}
  .mob-full{width:100%!important;max-width:100%!important;}
  .mob-p{padding:16px!important;}
  .mob-text-sm{font-size:12px!important;}
  .mob-text-xs{font-size:11px!important;}
  .mob-stack{flex-direction:column!important;align-items:stretch!important;}
  .mob-center{text-align:center!important;justify-content:center!important;}
  .mob-2col{grid-template-columns:1fr 1fr!important;}
  .mob-wrap{flex-wrap:wrap!important;}
  .mob-scroll-x{overflow-x:auto!important;-webkit-overflow-scrolling:touch;}
  .bottom-nav{display:flex!important;}
  .fab-msg{bottom:80px!important;}
  @media(max-width:640px){.hov:hover{transform:none!important;box-shadow:none!important;}}
  @media(min-width:481px){
    .dko{display:flex!important;}
    .mob-show{display:none!important;}
    .mob-hide{display:flex!important;}
    .mob-col{flex-direction:row!important;}
    .mob-p{padding:20px!important;}
    .mob-text-sm{font-size:13px!important;}
    .mob-text-xs{font-size:12px!important;}
    .mob-stack{flex-direction:row!important;align-items:center!important;}
    .mob-center{text-align:right!important;}
    .mob-2col{grid-template-columns:1fr 1fr!important;}
    .bottom-nav{display:none!important;}
    .fab-msg{bottom:28px!important;}
  }
  @media(min-width:769px){
    .mob-full{width:auto!important;max-width:none!important;}
    .mob-grid{grid-template-columns:repeat(auto-fill,minmax(280px,1fr))!important;}
    .dg{grid-template-columns:1fr 330px!important;}
    .mob-p{padding:28px!important;}
    .mob-text-sm{font-size:14px!important;}
    .mob-text-xs{font-size:13px!important;}
    .mob-hide{display:flex!important;}
  }
  .bottom-nav{
    position:fixed;bottom:0;left:0;right:0;
    background:rgba(6,6,15,.97);
    backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
    border-top:1px solid rgba(124,58,237,.18);
    display:none;
    align-items:center;justify-content:space-around;
    padding:8px 0 max(8px,env(safe-area-inset-bottom));
    z-index:150;
  }
  .bnav-btn{
    display:flex;flex-direction:column;align-items:center;gap:3px;
    background:none;border:none;cursor:pointer;
    padding:4px 8px;border-radius:10px;
    color:rgba(255,255,255,.38);font-size:10px;font-weight:700;
    transition:color .2s;min-width:52px;
  }
  .bnav-btn.active{color:#C084FC;}
  .bnav-btn svg{width:22px;height:22px;}
  .has-bottom-nav{padding-bottom:72px!important;}
  @media(max-width:480px){button{min-height:40px;} input,select,textarea{font-size:16px!important;}}
  @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
  #langDd.open{display:block!important;}
  .lang-btn:hover{background:rgba(124,58,237,.1)!important;}
  @keyframes splashIn{0%{opacity:0;transform:scale(.88) translateY(18px)}100%{opacity:1;transform:scale(1) translateY(0)}}
  @keyframes splashOut{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.06)}}
  @keyframes splashBar{0%{width:0%}100%{width:100%}}
  @keyframes splashRing{0%{transform:scale(.7);opacity:0}60%{opacity:1}100%{transform:scale(1.18);opacity:0}}
  @keyframes splashTagline{0%{opacity:0;transform:translateY(10px)}100%{opacity:1;transform:translateY(0)}}
`;
