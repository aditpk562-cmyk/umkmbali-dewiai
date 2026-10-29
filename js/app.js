/* ============================================================
   UMKMBali — App Logic
   Render grid, filter/search, chat (Gemini/OpenAI + fallback lokal),
   guide reader, navigasi
   ============================================================ */
(function () {
  "use strict";

  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

  /* ---------- 1. NAV ---------- */
  const header = $("#siteHeader");
  const navToggle = $("#navToggle");
  const mainNav = $(".main-nav");
  window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 10), { passive: true });
  navToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });
  $$(".nav-link").forEach(link => link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }));
  const sections = ["beranda", "direktori", "asisten", "panduan", "tentang"].map(id => document.getElementById(id)).filter(Boolean);
  const navLinks = $$(".nav-link");
  function setActiveLink(id) { navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + id)); }
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) setActiveLink(e.target.id); });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(s => spy.observe(s));

  /* ---------- 2. DIREKTORI ---------- */
  const grid = $("#umkmGrid");
  const emptyState = $("#emptyState");
  const searchInput = $("#searchInput");
  let activeFilter = "all";

  function shade(hex, percent) {
    const n = parseInt(hex.replace("#", ""), 16);
    let r = (n >> 16) + percent, g = ((n >> 8) & 0xff) + percent, b = (n & 0xff) + percent;
    r = Math.max(0, Math.min(255, r)); g = Math.max(0, Math.min(255, g)); b = Math.max(0, Math.min(255, b));
    return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
  }

  const categoryImages = {
    kuliner: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=85",
    kerajinan: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=900&q=85",
    fashion: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=900&q=85",
    pertanian: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=85",
    jasa: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85"
  };

  function renderCards(items) {
    grid.innerHTML = items.map(c => `
      <article class="card fade-up">
        <div class="card-media" style="--card-color:${c.color}; background-image:linear-gradient(180deg,rgba(20,28,24,.03) 15%,rgba(20,28,24,.55) 100%),url('${categoryImages[c.category] || categoryImages.jasa}');">
          <span class="card-tag">${c.category}</span>
          <span class="card-image-caption">${c.product}</span>
        </div>
        <div class="card-body">
          <p class="card-loc"><span class="location-mark" aria-hidden="true"></span>${c.location}</p>
          <h3>${c.product}</h3>
          <p class="card-desc">${c.desc}</p>
          <div class="card-foot"><span class="price">${c.price}</span><span class="rating"><span aria-hidden="true">★</span> ${c.rating.toFixed(1)}</span></div>
        </div>
      </article>`).join("");
    emptyState.hidden = items.length !== 0;
  }

  function applyFilters() {
    const q = searchInput.value.trim().toLowerCase();
    const items = (window.UMKM_DATA || []).filter(c => {
      const matchCat = activeFilter === "all" || c.category === activeFilter;
      const matchQ = !q || (c.name + " " + c.product + " " + c.location + " " + c.regency + " " + c.desc + " " + c.tags.join(" ")).toLowerCase().includes(q);
      return matchCat && matchQ;
    });
    renderCards(items);
  }
  $$("#filters .chip").forEach(chip => chip.addEventListener("click", () => {
    $$("#filters .chip").forEach(c => { c.classList.remove("active"); c.setAttribute("aria-selected", "false"); });
    chip.classList.add("active");
    chip.setAttribute("aria-selected", "true");
    activeFilter = chip.dataset.filter;
    applyFilters();
  }));
  searchInput.addEventListener("input", applyFilters);
  renderCards(window.UMKM_DATA || []);

  /* ---------- 3. CHAT — DewiAI (Gemini/OpenAI via backend, fallback lokal) ---------- */
  const chatMessages = $("#chatMessages");
  const chatForm = $("#chatForm");
  const chatInput = $("#chatInput");
  const typing = $("#typing");
  const aiStatusDot = $("#aiStatusDot");
  const aiStatusText = $("#aiStatusText");
  let aiProvider = "local";
  const history = [];
  let busy = false;

  const PROVIDER_LABEL = { gemini: "Gemini", openai: "OpenAI", local: "lokal" };

  function setStatus(provider) {
    aiProvider = provider;
    if (provider === "gemini") { aiStatusDot.className = "status-dot on"; aiStatusText.textContent = "AI aktif · Gemini"; }
    else if (provider === "openai") { aiStatusDot.className = "status-dot on"; aiStatusText.textContent = "AI aktif · OpenAI"; }
    else { aiStatusDot.className = "status-dot local"; aiStatusText.textContent = "Mode lokal · tambahkan API key di file .env"; }
  }
  fetch("/api/status").then(r => { if (!r.ok) throw new Error("status"); return r.json(); }).then(d => setStatus(d.provider || "local")).catch(() => setStatus("local"));

  function addMessage(innerHTML, who, meta) {
    const div = document.createElement("div");
    div.className = "msg " + who;
    div.innerHTML = innerHTML;
    if (meta) { const m = document.createElement("div"); m.className = "msg-meta"; m.textContent = meta; div.appendChild(m); }
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return div;
  }

  function formatLocal(res) {
    let html = "";
    if (res.text) html += `<p>${res.text}</p>`;
    if (res.list && res.list.length) html += "<ul>" + res.list.map(l => `<li>${l}</li>`).join("") + "</ul>";
    if (res.extra) html += `<p>${res.extra}</p>`;
    if (res.products && res.products.length) {
      html += '<div style="margin-top:10px;display:flex;flex-direction:column;gap:8px;">';
      res.products.forEach(p => {
        html += `<div style="display:flex;gap:10px;align-items:center;background:#fff;border:1px solid var(--line);border-radius:12px;padding:8px 10px;">
          <span style="font-size:1.6rem;">${p.emoji}</span>
          <div><strong>${p.product}</strong><br><span style="font-size:.8rem;color:var(--muted);">📍 ${p.location} · ${p.price} · ★ ${p.rating}</span></div></div>`;
      });
      html += "</div>";
    }
    if (res.tip) html += `<p style="margin-top:10px;font-size:.85rem;color:var(--teal-600);">💡 ${res.tip}</p>`;
    return html;
  }

  function formatText(text) {
    let esc = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    esc = esc.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    const lines = esc.split("\n");
    let out = [], inList = false;
    for (const line of lines) {
      if (/^\s*[-•]\s+/.test(line)) {
        if (!inList) { out.push("<ul>"); inList = true; }
        out.push("<li>" + line.replace(/^\s*[-•]\s+/, "") + "</li>");
      } else {
        if (inList) { out.push("</ul>"); inList = false; }
        out.push(line ? "<p>" + line + "</p>" : "");
      }
    }
    if (inList) out.push("</ul>");
    return out.join("");
  }

  function escapeUser(t) { return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  async function sendMessage(text) {
    if (!text.trim() || busy) return;
    busy = true;
    addMessage(escapeUser(text), "user");
    history.push({ role: "user", content: text });
    chatInput.value = "";
    typing.hidden = false;
    chatMessages.scrollTop = chatMessages.scrollHeight;
    try {
      const resp = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-10) })
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Permintaan gagal");
      // Setiap provider yang mengembalikan reply (gemini/openai) -> tampilkan jawaban AI
      if (data.reply && data.source && data.source !== "local") {
        const label = PROVIDER_LABEL[data.source] || data.source;
        addMessage(formatText(data.reply), "bot", "via " + label + " · " + (data.model || ""));
        history.push({ role: "assistant", content: data.reply });
        if (aiProvider !== data.source) setStatus(data.source);
      } else {
        const res = window.DewiAI.generateResponse(text);
        addMessage(formatLocal(res), "bot", data.error ? "mode lokal · API: " + data.reason : "mode lokal · API key belum dipasang");
        history.push({ role: "assistant", content: res.text || "" });
        if (aiProvider !== "local") setStatus("local");
      }
    } catch (err) {
      const res = window.DewiAI.generateResponse(text);
      addMessage(formatLocal(res), "bot", "mode lokal · " + (err.message || "API tidak tersedia"));
      history.push({ role: "assistant", content: res.text || "" });
      setStatus("local");
    } finally {
      typing.hidden = true;
      busy = false;
    }
  }
  chatForm.addEventListener("submit", (e) => { e.preventDefault(); sendMessage(chatInput.value); });
  $$(".quick").forEach(btn => btn.addEventListener("click", () => sendMessage(btn.dataset.prompt)));
  addMessage("Om Swastiastu! Saya <strong>DewiAI</strong> 🙏 — asisten bisnis untuk pelaku UMKM Bali. Tanyakan apa saja seputar usaha Anda.", "bot", "mode lokal");
  $("#fab").addEventListener("click", () => {
    document.getElementById("asisten").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => chatInput.focus(), 600);
  });

  /* ---------- 4. GUIDE BOOK ---------- */
  const toc = $("#guideToc");
  const reader = $("#guideReader");
  const guide = window.GUIDE_BOOK || [];

  function renderTOC() {
    toc.innerHTML = `<h3>Daftar Isi</h3>` + guide.map((ch, i) =>
      `<button class="toc-item ${i === 0 ? "active" : ""}" data-idx="${i}"><span class="toc-num">${ch.num}</span> ${ch.title.replace(/&/g, "&amp;")}</button>`).join("");
    $$(".toc-item", toc).forEach(b => b.addEventListener("click", () => renderChapter(+b.dataset.idx)));
  }

  function renderChapter(idx) {
    const ch = guide[idx];
    if (!ch) return;
    $$(".toc-item").forEach((b, i) => b.classList.toggle("active", i === idx));
    let html = `<p class="chapter-eyebrow">${ch.eyebrow}</p><h2>${ch.title}</h2><p class="chapter-sub">${ch.sub}</p>`;
    ch.body.forEach(block => {
      switch (block.type) {
        case "p": html += `<p>${block.text}</p>`; break;
        case "h3": html += `<h3>${block.text}</h3>`; break;
        case "tip": html += `<div class="guide-tip">${block.text}</div>`; break;
        case "steps":
          html += '<div class="guide-steps">' + block.items.map((s, i) =>
            `<div class="guide-step"><div class="step-num">${i + 1}</div><div class="step-text"><strong>${s.t}</strong><p>${s.d}</p></div></div>`).join("") + "</div>";
          break;
      }
    });
    html += `<div style="display:flex;justify-content:space-between;margin-top:36px;gap:12px;flex-wrap:wrap;">
      ${idx > 0 ? `<a class="btn btn-ghost" href="#" data-nav="${idx - 1}">← ${guide[idx - 1].title}</a>` : "<span></span>"}
      ${idx < guide.length - 1 ? `<a class="btn btn-ghost" href="#" data-nav="${idx + 1}">Selanjutnya: ${guide[idx + 1].title} →</a>` : "<span></span>"}
    </div>`;
    reader.innerHTML = html;
    reader.classList.add("fade-up");
    setTimeout(() => reader.classList.remove("fade-up"), 600);
    $$("[data-nav]", reader).forEach(a => a.addEventListener("click", (e) => {
      e.preventDefault();
      renderChapter(+a.dataset.nav);
      reader.scrollIntoView({ behavior: "smooth", block: "start" });
    }));
  }
  renderTOC();
  renderChapter(0);

  /* ---------- 5. Misc ---------- */
  $("#year").textContent = new Date().getFullYear();
  function countUp(el, target, suffix) {
    const num = parseInt(target.replace(/\D/g, ""), 10);
    if (!num) return;
    let cur = 0;
    const step = Math.max(1, Math.round(num / 40));
    const t = setInterval(() => {
      cur += step;
      if (cur >= num) { cur = num; clearInterval(t); }
      el.textContent = cur.toLocaleString("id-ID") + (suffix || "");
    }, 25);
  }
  const statUmkm = $("#statUmkm"), statProduk = $("#statProduk");
  const statObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { countUp(statUmkm, statUmkm.textContent, "+"); countUp(statProduk, statProduk.textContent, "+"); statObs.disconnect(); }
    });
  }, { threshold: 0.5 });
  if (statUmkm) statObs.observe(statUmkm);
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("fade-up"); revealObs.unobserve(e.target); } });
  }, { threshold: 0.15 });
  $$(".section-head").forEach(el => revealObs.observe(el));
  console.log("%cUMKMBali siap 🙏", "color:#c2410c;font-weight:bold;font-size:14px;");
})();
