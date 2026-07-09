/* =========================================================
   FILHOS DO GUI — main.js (JS puro, sem dependências)
========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initGallery();
  initLightbox();
  initProjetosTabs();
  initScrollSpy();
});

/* ---------------- NAV MOBILE ---------------- */
function initNav(){
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if(!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------------- SCROLLSPY (marca link ativo) ---------------- */
function initScrollSpy(){
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if(!sections.length || !navLinks.length) return;

  const byId = id => document.querySelector(`.nav-link[href="#${id}"]`);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        navLinks.forEach(l => l.classList.remove('active'));
        const activeLink = byId(entry.target.id);
        if(activeLink) activeLink.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(sec => observer.observe(sec));
}

/* ---------------- GALERIA ---------------- */
let currentGalleryItems = [];
let currentLightboxIndex = 0;

function initGallery(){
  const grid = document.getElementById('galleryGrid');
  const filtersWrap = document.getElementById('galleryFilters');
  if(!grid || typeof galleryData === 'undefined') return;

  renderGallery(galleryData);

  if(filtersWrap){
    filtersWrap.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if(!btn) return;

      filtersWrap.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const filtered = filter === 'all'
        ? galleryData
        : galleryData.filter(item => item.category === filter);

      renderGallery(filtered);
    });
  }
}

function renderGallery(items){
  const grid = document.getElementById('galleryGrid');
  if(!grid) return;

  currentGalleryItems = items;
  grid.innerHTML = '';

  if(!items.length){
    grid.innerHTML = '<p style="color:var(--texto-muted-claro);grid-column:1/-1;">Nenhuma foto nesta categoria ainda.</p>';
    return;
  }

  items.forEach((item, index) => {
    const el = document.createElement('div');
    el.className = 'gallery-item';
    el.dataset.index = index;
    el.innerHTML = `
      <img src="${item.src}" alt="${item.caption}" loading="lazy"
           onerror="this.parentElement.style.background='linear-gradient(135deg, var(--azul-pastel), var(--verde-pastel))'; this.remove();">
      <div class="gallery-item-overlay">
        <span class="gallery-item-caption">${item.caption}</span>
      </div>
    `;
    el.addEventListener('click', () => openLightbox(index));
    grid.appendChild(el);
  });
}

/* ---------------- LIGHTBOX ---------------- */
function initLightbox(){
  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  if(!lightbox) return;

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox) closeLightbox();
  });
  prevBtn.addEventListener('click', () => navigateLightbox(-1));
  nextBtn.addEventListener('click', () => navigateLightbox(1));

  document.addEventListener('keydown', (e) => {
    if(!lightbox.classList.contains('open')) return;
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowLeft') navigateLightbox(-1);
    if(e.key === 'ArrowRight') navigateLightbox(1);
  });
}

function openLightbox(index){
  currentLightboxIndex = index;
  updateLightboxContent();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(){
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function navigateLightbox(direction){
  const total = currentGalleryItems.length;
  currentLightboxIndex = (currentLightboxIndex + direction + total) % total;
  updateLightboxContent();
}

function updateLightboxContent(){
  const item = currentGalleryItems[currentLightboxIndex];
  if(!item) return;
  document.getElementById('lightboxImg').src = item.src;
  document.getElementById('lightboxImg').alt = item.caption;
  document.getElementById('lightboxCaption').textContent = item.caption;
}

/* ---------------- PROJETOS TABS ---------------- */
function initProjetosTabs(){
  const tabBtns = document.querySelectorAll('.tab-btn');
  const listLeis = document.getElementById('listLeis');
  const listProjetos = document.getElementById('listProjetos');
  if(!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if(btn.dataset.tab === 'leis'){
        listLeis.style.display = 'grid';
        listProjetos.style.display = 'none';
      } else {
        listLeis.style.display = 'none';
        listProjetos.style.display = 'grid';
      }
    });
  });
}
