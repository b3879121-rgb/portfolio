/* 林伯諺 作品集網站 — 互動功能
 * 依資料產生作品與技能、分類篩選、作品詳情視窗、導覽列與捲動淡入
 */

// ===== 資料 =====


const CAT_NAMES = { dev: '產品開發', pm: '專案與行銷', media: '影音製作', design: '平面設計' };

const drive = (id) => `https://drive.google.com/file/d/${id}/view`;

// 順序就是畫面上的順序；第一件會放大成精選
const PROJECTS = [
  {
    id: 'bank', cat: 'dev', title: '幸福銀行 金融任務 Bank Quest', img: 'assets/img/bank.jpg',
    tags: ['Python', 'Flask', 'SQLite', 'RAG', 'Render'],
    desc: '以 Flask 開發金融防詐網頁 RPG，5 章 25 關劇情，導入 RAG 檢索 64 條法規附出處回答，並建置排行榜與管理後台。',
    points: [
      '從企劃、劇本到開發上線一手包辦',
      '5 章 25 關劇情，把金融法規轉成遊戲任務',
      'RAG 檢索 64 條法規，回答時附上法規出處',
      '排行榜與管理後台，用數據找出玩家卡關點',
      '部署在 Render（免費主機閒置會休眠，第一次開啟約需 30–60 秒）'
    ],
    links: [{ label: '線上試玩（首次開啟約 30 秒）', url: 'https://bank-quest.onrender.com/' }],
    badge: 'LIVE'
  },
  {
    id: 'snq', cat: 'pm', title: '三總北投分院 SNQ 國家品質標章專案', img: 'assets/img/snq.jpg', imgPos: 'center 20%',
    tags: ['專案經理', '跨部門整合', '醫療品質'],
    desc: '擔任社區精神醫療 SNQ 申請專案經理，整合跨單位資料與成果影片，帶領團隊獲得 2025 國家生技醫療品質獎銅獎。',
    points: ['擔任 SNQ 申請專案經理', '整合跨單位資料與成果影片', '獲得 2025 國家生技醫療品質獎銅獎'],
    links: []
  },
  {
    id: 'stock', cat: 'dev', title: '台股盤後自動化儀表板', img: 'assets/img/stock.jpg',
    tags: ['Python', '資料抓取', '排程', 'GitHub'],
    desc: '以 Python 自動抓取台美股盤後資料，產生互動式 HTML 儀表板，搭配排程每日自動更新並發布至 GitHub。',
    points: ['自動抓取台股、美股盤後資料', '互動式儀表板：總覽、自選股、排行、融資圖表', '排程每日自動更新並發布到 GitHub'],
    links: [{ label: 'GitHub 原始碼', url: 'https://github.com/b3879121-rgb/-automarket' }],
    badge: 'GitHub'
  },
  {
    id: 'order', cat: 'dev', title: '楓葉小吃線上訂餐系統', img: 'assets/img/order.jpg',
    tags: ['HTML/CSS', 'JavaScript', 'n8n', 'GitHub Pages'],
    desc: '為在地小吃店規劃點餐流程並開發上線，顧客選餐、填資料即可送單，正式版串接 n8n 即時通知店家。',
    points: ['顧客選餐、填資料即可送出訂單', '正式版串接 n8n，有新訂單即時通知店家', '附展示用後台，部署在 GitHub Pages'],
    links: [
      { label: '線上點餐', url: 'https://b3879121-rgb.github.io/order-system/' },
      { label: 'GitHub 原始碼', url: 'https://github.com/b3879121-rgb/order-system' }
    ],
    badge: 'LIVE'
  },
  {
    id: 'linebot', cat: 'dev', title: '金融知識 AI 聊天機器人（LINE）', img: 'assets/img/linebot.jpg',
    tags: ['LINE API', 'n8n', 'AI Agent', 'Prompt'],
    desc: '串接 LINE Messaging API 與 n8n 工作流程，整合 AI Agent 並以系統提示詞限定金融範圍，即時解答理財問題。',
    points: ['LINE Messaging API 接收訊息，n8n 工作流程處理', '整合 AI Agent 回答理財問題', '用系統提示詞把回答範圍限定在金融知識'],
    links: []
  },
  {
    id: 'headphone', cat: 'media', title: '程式化 3D 產品動畫：耳機爆炸分解', img: 'assets/img/headphone.jpg',
    tags: ['Three.js', 'Playwright', 'ffmpeg'],
    desc: '45 秒產品動畫，以 Three.js 程式建模耳機並做出爆炸分解效果，Playwright 逐格擷取、ffmpeg 合成影片。',
    points: ['耳機模型全部用程式建立', 'Playwright 逐格擷取畫面，畫質穩定不掉格', 'ffmpeg 合成 45 秒成品'],
    links: [{ label: '觀看影片', url: drive('10HHGjyvx22nMLkdA8TlsaqdkVhK-IR6h') }],
    badge: 'VIDEO'
  },
  {
    id: 'blender', cat: 'media', title: 'Blender 3D 動畫：賽博龐克短片', img: 'assets/img/blender.jpg',
    tags: ['Python', 'Blender', 'ffmpeg'],
    desc: '30 秒 Blender 動畫（雨夜街頭 → 地鐵車廂 → 小公寓），場景全部以 Python 腳本產生，ffmpeg 合成並加上配樂。',
    points: ['三個場景全部用 Python 腳本產生', '渲染可中斷接續，閃退時自動重啟', 'ffmpeg 合成 1080p 成品並加上配樂'],
    links: [{ label: '觀看影片', url: drive('1y7OIzaYmXu9smWtn4ZUj87JGm0i7gFgv') }],
    badge: 'VIDEO'
  },
  {
    id: 'aiproduct', cat: 'media', title: 'AI 產品短影音', img: 'assets/img/aiproduct.jpg',
    tags: ['Kling AI', 'Google Pomelli', 'AI 影像'],
    desc: '用 AI 工具把平面產品圖做成產品影片：口紅影片以 Kling AI 生成，rosa 機器手臂以 Google Pomelli 製作。',
    points: ['口紅產品影片：Kling AI 生成', 'rosa 機器手臂：Google Pomelli 將產品圖製作成影片'],
    links: [
      { label: '口紅影片', url: drive('1i6P-WXbazim7QnNe2yv-b8Q57dNeuwa8') },
      { label: 'rosa 影片', url: drive('1vGwbuJdfWi8aostMdierlADwa_uylekS') }
    ],
    badge: 'VIDEO'
  },
  {
    id: 'media', cat: 'media', title: '媒體短影音（民視）', img: 'assets/img/media.jpg',
    tags: ['短影音', '剪輯', '社群'],
    desc: '製作民視戲劇、綜藝節目與演唱會短影音，吸引觀眾觸及並帶動節目正片觀看。',
    points: ['戲劇、綜藝、演唱會三種題材', '短影音導流到節目正片'],
    links: [
      { label: '戲劇', url: drive('1JPcJx9wiefFxKCFm0wDCkuit_rvwhZjB') },
      { label: '綜藝', url: drive('1llx30J4GjSEa8bglo9o79v5BOzLpNN5r') },
      { label: '演唱會', url: drive('1juHtgDRvdlmU6sG2Hl9SgV1eiQQsLDyA') }
    ],
    badge: 'VIDEO'
  },
  {
    id: 'health', cat: 'media', title: '醫院衛教短影音', img: 'assets/img/health.jpg',
    tags: ['企劃', '拍攝', '後製'],
    desc: '規劃製作不同病症主題的醫療短影音，以生動易懂的內容傳遞健康資訊，提升醫院形象。',
    points: ['依病症主題規劃系列內容', '企劃到後製流程標準化，每月產出近 10 支'],
    links: [{ label: '觀看影片', url: drive('1ZnzJIrGZnQeJGkPYKdQk4XOf8zfE89Y8') }],
    badge: 'VIDEO'
  },
  {
    id: 'interview', cat: 'media', title: '人物專訪長影片', img: 'assets/img/interview.jpg',
    tags: ['影像企劃', '拍攝執行', '後製'],
    desc: '針對特定人物規劃系列影像企劃，負責溝通聯繫、拍攝執行及影片後製。',
    points: ['系列影像企劃', '溝通聯繫、拍攝執行到後製一手完成'],
    links: [{ label: '觀看影片', url: drive('1_pKQwxELFVuQWpBPg2grdd-6KmLH6Ir4') }],
    badge: 'VIDEO'
  },
  {
    id: 'annie', cat: 'pm', title: '「安妮絲薇 Annie\'s Way」品牌行銷競賽', img: 'assets/img/annie.jpg',
    tags: ['行銷企劃', '市場分析', '影片製作'],
    desc: '負責果凍面膜行銷企劃，從市場調查、受眾定位到行銷組合，完成兩頁提案與 2 分鐘產品介紹影片。',
    points: ['市場調查、受眾定位到行銷組合', '完成兩頁提案與 2 分鐘產品介紹影片'],
    links: []
  },
  {
    id: 'press', cat: 'pm', title: '新聞稿撰寫（三立、三總）', img: '',
    tags: ['新聞稿', 'SEO', '議題延伸'],
    desc: '節目播出後針對獨家觀點撰寫新聞稿，透過議題延伸與關鍵字布局提升網路搜尋曝光；另撰寫三總北投分院新聞稿。',
    points: ['三立電視網新聞稿：議題延伸與關鍵字布局', '三軍總醫院北投分院新聞稿'],
    links: [{ label: '三立新聞刊登', url: 'https://www.setn.com/News.aspx?NewsID=1594942' }],
    badge: 'LINK'
  },
  {
    id: 'beitou', cat: 'design', title: '北投旅遊地圖', img: 'assets/img/beitou.jpg', imgPos: 'center 30%',
    tags: ['內容企劃', '視覺設計', '獨立執行'],
    desc: '整合院內古蹟與周邊景點資訊，從資料蒐集、內容規劃到設計完稿獨立完成，為醫院空間增加在地導覽功能。',
    points: ['整合院內古蹟與周邊景點資訊', '資料蒐集、內容規劃到設計完稿獨立完成'],
    links: []
  },
  {
    id: 'poster', cat: 'design', title: '三總北投分院畫展海報', img: 'assets/img/poster.jpg',
    tags: ['海報設計', '活動文宣'],
    desc: '負責每季畫展宣傳文宣製作，提升醫院整體形象，讓就醫民眾也能欣賞藝術作品。',
    points: ['每季畫展宣傳文宣'],
    links: []
  },
  {
    id: 'social', cat: 'design', title: '節目社群宣傳圖', img: 'assets/img/social.jpg',
    tags: ['社群設計', '梗圖', '節目宣傳'],
    desc: '負責民視綜藝頻道社群貼文製作，以節目宣傳及趣味梗圖提升頻道互動與曝光。',
    points: ['節目宣傳圖與趣味梗圖', '提升頻道互動與曝光'],
    links: []
  }
];

const ICONS = {
  pm: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M8 2v4M16 2v4M3 10h18M8 15l2 2 4-4"/>',
  code: '<path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>',
  ai: '<path d="M12 3l1.8 4.9L19 9.5l-5.2 1.6L12 16l-1.8-4.9L5 9.5l5.2-1.6z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
  flow: '<circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M9 6h6a3 3 0 0 1 3 3v6M6 9v6a3 3 0 0 0 3 3h6"/>',
  design: '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.6 7.6"/><circle cx="11" cy="11" r="2"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>'
};

const SKILLS = [
  { icon: 'pm', name: '專案管理', items: ['需求拆解', 'SOP 建立', '跨部門協調', '數據分析'] },
  { icon: 'code', name: '全端開發', items: ['Python', 'Flask', 'SQLite', 'JavaScript', 'HTML/CSS', 'SQL', 'Render', 'GitHub Pages'] },
  { icon: 'ai', name: 'AI 工具', items: ['Claude Code', 'Codex', 'ChatGPT', 'AI Agent', 'RAG', 'NotebookLM', 'Nano Banana', 'Kling'] },
  { icon: 'flow', name: '自動化', items: ['n8n', 'LINE Messaging API', '排程自動化', 'Playwright', 'ffmpeg'] },
  { icon: 'design', name: '設計與影音', items: ['Photoshop', 'Figma', 'Premiere Pro', 'After Effects', 'Canva', 'Blender'] },
  { icon: 'chart', name: '行銷與文書', items: ['Google Ads 認證', 'Analytics 認證', 'SEO', 'Word', 'Excel', 'PowerPoint'] }
];

const TYPED_WORDS = ['專案經理 × AI 應用工程師', 'Python 全端開發', 'n8n 自動化流程', '影音企劃與設計'];

// ===== 小工具 =====
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const svg = (path) => `<svg viewBox="0 0 24 24" aria-hidden="true">${path}</svg>`;
const ARROW = '<path d="M5 12h14M13 6l6 6-6 6"/>';

function showToast(text) {
  const toast = $('#toast');
  toast.textContent = text;
  toast.classList.add('is-show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('is-show'), 2000);
}

// ===== 捲動淡入 =====
const revealObserver = 'IntersectionObserver' in window && !reduceMotion
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.1 })
  : null;

function observeReveal(elements) {
  elements.forEach((el) => {
    el.classList.add('reveal');
    if (revealObserver) revealObserver.observe(el);
    else el.classList.add('is-visible');
  });
}

// ===== 技能 =====
function renderSkills() {
  $('#skillsList').innerHTML = SKILLS.map((s) => `
    <div class="panel skill">
      <div class="skill__top">
        <span class="skill__icon">${svg(ICONS[s.icon])}</span>
        <h3>${s.name}</h3>
      </div>
      <div class="chips">${s.items.map((i) => `<span class="chip">${i}</span>`).join('')}</div>
    </div>`).join('');
}

// ===== 作品 =====
const LINK_LABEL = { VIDEO: '▶ 影片', LIVE: '↗ 線上', GitHub: '↗ GitHub', LINK: '↗ 連結' };

function frameHtml(p) {
  if (!p.img) return '<div class="work__cover" aria-hidden="true"><small>PRESS</small><b>新聞稿</b></div>';
  const pos = p.imgPos ? ` style="object-position:${p.imgPos}"` : '';
  return `<img src="${p.img}" alt="${p.title} 畫面" loading="lazy" width="704" height="396"${pos}>`;
}

function renderProjects() {
  $('#projectGrid').innerHTML = PROJECTS.map((p) => `
    <button type="button" class="panel work" data-id="${p.id}" data-cat="${p.cat}" aria-label="查看 ${p.title} 詳情">
      <div class="work__frame">${frameHtml(p)}</div>
      <div class="work__body">
        <div class="work__meta">
          <div class="chips">${p.tags.slice(0, 2).map((t) => `<span class="chip">${t}</span>`).join('')}</div>
          ${p.badge ? `<span class="chip chip--link">${LINK_LABEL[p.badge]}</span>` : ''}
        </div>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <span class="work__more">查看詳情 ${svg(ARROW)}</span>
      </div>
    </button>`).join('');

  $$('[data-n]').forEach((el) => {
    el.textContent = PROJECTS.filter((p) => p.cat === el.dataset.n).length;
  });
}

function applyFilter(filter) {
  $$('.tab').forEach((btn) => {
    const active = btn.dataset.filter === filter;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-selected', active);
  });
  $$('#projectGrid .work').forEach((card) => {
    card.hidden = card.dataset.cat !== filter;
  });
}

function openProject(id) {
  const p = PROJECTS.find((x) => x.id === id);
  const modal = $('#projectModal');
  const img = $('#modalImg');
  img.hidden = !p.img;
  if (p.img) { img.src = p.img; img.alt = `${p.title} 畫面`; }
  $('#modalCat').textContent = `// ${CAT_NAMES[p.cat]}`;
  $('#modalTitle').textContent = p.title;
  $('#modalTags').innerHTML = p.tags.map((t) => `<span class="chip">${t}</span>`).join('');
  $('#modalDesc').textContent = p.desc;
  $('#modalPoints').innerHTML = p.points.map((pt) => `<li>${pt}</li>`).join('');
  $('#modalLinks').innerHTML = p.links.length
    ? p.links.map((l, i) => `<a class="icon-btn${i === 0 ? ' icon-btn--solid' : ''}" href="${l.url}" target="_blank" rel="noopener">${svg('<path d="M7 17L17 7M8 7h9v9"/>')}<span>${l.label}</span></a>`).join('')
    : '<p class="modal__note">完整檔案收錄於作品集 PDF。</p>';
  if (typeof modal.showModal === 'function') modal.showModal();
  else modal.setAttribute('open', '');
}

function closeModal() {
  const modal = $('#projectModal');
  if (typeof modal.close === 'function') modal.close();
  else modal.removeAttribute('open');
}

// ===== 互動效果 =====
// 卡片聚光跟著滑鼠位置；背景光暈跟著游標移動
function setupSpotlight() {
  const glow = $('#bgGlow');
  document.addEventListener('pointermove', (e) => {
    const panel = e.target.closest && e.target.closest('.panel');
    if (panel) {
      const r = panel.getBoundingClientRect();
      panel.style.setProperty('--mx', `${e.clientX - r.left}px`);
      panel.style.setProperty('--my', `${e.clientY - r.top}px`);
    }
    if (!reduceMotion) glow.style.transform = `translate(${e.clientX - 320}px, ${e.clientY - 320}px)`;
  }, { passive: true });
}

function countUp(el) {
  const target = Number(el.dataset.count);
  if (reduceMotion) return;
  const start = performance.now();
  const step = (now) => {
    const t = Math.min((now - start) / 1200, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function startTyping() {
  const el = $('#typed');
  if (reduceMotion) return;
  let wordIndex = 0;
  let charIndex = TYPED_WORDS[0].length;
  let deleting = true;
  const tick = () => {
    const word = TYPED_WORDS[wordIndex];
    let delay = deleting ? 45 : 110;
    if (!deleting && charIndex === word.length) { deleting = true; delay = 2200; }
    else if (deleting && charIndex === 0) { deleting = false; wordIndex = (wordIndex + 1) % TYPED_WORDS.length; delay = 300; }
    else { charIndex += deleting ? -1 : 1; el.textContent = TYPED_WORDS[wordIndex].slice(0, charIndex); }
    setTimeout(tick, delay);
  };
  setTimeout(tick, 2600);
}

// ===== 導覽列 =====
function setupNav() {
  const nav = $('#nav');
  const links = $('#navLinks');
  const toggle = $('#navToggle');
  const toTop = $('#toTop');

  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 10);
    toTop.classList.toggle('is-show', window.scrollY > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
  });
  $$('a', links).forEach((a) => a.addEventListener('click', () => {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }));

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        $$('a', links).forEach((a) => a.classList.toggle('is-current', a.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['profile', 'education', 'experience', 'projects', 'skills', 'contact'].forEach((id) => sectionObserver.observe($(`#${id}`)));
  }
}

// ===== 啟動 =====
document.addEventListener('DOMContentLoaded', () => {
  renderSkills();
  renderProjects();
  applyFilter('dev');

  $$('.tab').forEach((btn) => btn.addEventListener('click', () => applyFilter(btn.dataset.filter)));
  $('#projectGrid').addEventListener('click', (e) => {
    const card = e.target.closest('.work');
    if (card) openProject(card.dataset.id);
  });
  $('#modalClose').addEventListener('click', closeModal);
  $('#projectModal').addEventListener('click', (e) => { if (e.target.id === 'projectModal') closeModal(); });

  $('#copyEmail').addEventListener('click', async (e) => {
    const email = e.currentTarget.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      showToast('已複製 Email');
    } catch {
      showToast(email);
    }
  });

  $('#year').textContent = new Date().getFullYear();

  $$('[data-count]').forEach(countUp);
  startTyping();
  observeReveal($$('.org, .skill, .profile__text, .photo, .contact__box'));
  setupNav();
  setupSpotlight();
});
