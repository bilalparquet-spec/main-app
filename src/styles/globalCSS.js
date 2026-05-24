const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:#07080F;font-family:'Cairo',sans-serif;direction:rtl;overflow-x:hidden;}
  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-thumb{background:#3B3F6B;border-radius:4px;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @keyframes glow{0%,100%{opacity:.5}50%{opacity:1}}
  @keyframes shimmer{0%{background-position:-500px 0}100%{background-position:500px 0}}
  @keyframes barFill{from{width:0}to{width:100%}}
  @keyframes heartPop{0%{transform:scale(1)}40%{transform:scale(1.4)}70%{transform:scale(.88)}100%{transform:scale(1)}}
  @keyframes starPop{0%{transform:scale(0) rotate(-20deg);opacity:0}65%{transform:scale(1.3)}100%{transform:scale(1);opacity:1}}
  @keyframes cardIn{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:scale(1)}}
  .skel{background:linear-gradient(90deg,rgba(255,255,255,.04) 25%,rgba(255,255,255,.09) 50%,rgba(255,255,255,.04) 75%);background-size:500px 100%;animation:shimmer 1.5s infinite linear;border-radius:8px;}
  .car-img{transition:transform .5s ease;}
  .hov:hover .car-img{transform:scale(1.07);}
  .hov{transition:transform .25s ease,box-shadow .25s ease;}
  .hov:hover{transform:translateY(-4px);}
  .btn{transition:all .2s ease;}
  .btn:hover{filter:brightness(1.1);transform:scale(1.02);}
  .btn:active{transform:scale(.97);}
  .sug:hover{background:rgba(124,58,237,.18)!important;}
  @keyframes springIn{0%{opacity:0;transform:scale(.82) translateY(18px)}70%{transform:scale(1.03) translateY(-3px)}100%{opacity:1;transform:scale(1) translateY(0)}}
  @keyframes sectionIn{from{opacity:0;transform:translateX(28px)}to{opacity:1;transform:translateX(0)}}
  @keyframes badgePop{0%{transform:scale(0)}70%{transform:scale(1.12)}100%{transform:scale(1)}}
  .btn-press{transition:transform .15s ease,filter .15s ease;}
  .btn-press:active{transform:scale(.94);filter:brightness(.88);}
`;

export default CSS;
