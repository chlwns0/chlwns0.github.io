(() => {
  const root = document.documentElement;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const transition = (fn) => (document.startViewTransition && !reduceMotion ? document.startViewTransition(fn) : fn());

  // ----- Project data (모달 상세 정보 — 실제 내용으로 교체) -----
  const projects = {
    ads: {
      year: "루미너스아이즈 · Google Demand Gen",
      title: "구글 디맨드젠 광고소재",
      desc: "구글 디맨드젠 캠페인에 쓰이는 이미지 광고소재를 제작했습니다. ChatGPT와 Gemini로 카피와 콘셉트 방향을 넓히고, 포토샵과 일러스트레이터로 매체 규격별 소재를 완성했습니다.",
      spec: { 역할: "광고소재 디자인", 도구: "Photoshop, Illustrator, ChatGPT, Gemini", 결과물: "규격별 이미지 광고소재 세트" },
      url: "#",
    },
    shorts: {
      year: "루미너스아이즈 · AI Video",
      title: "AI 광고 영상",
      desc: "Google Flow와 Higgsfield로 장면 소스를 생성하고, 프리미어 프로에서 컷 구성·자막·사운드를 더해 광고 영상으로 완성했습니다.",
      spec: { 역할: "영상 생성 · 편집", 도구: "Google Flow, Higgsfield, Premiere Pro", 결과물: "AI 광고 영상" },
      url: "#",
    },
    landing: {
      year: "루미너스아이즈 · Landing Page",
      title: "상품 랜딩페이지",
      desc: "상품 판매를 위한 랜딩페이지를 디자인하고 제작했습니다. 광고소재와 같은 톤으로 이어지도록 구성해, 광고를 보고 들어온 고객이 자연스럽게 구매로 이어지게 했습니다.",
      spec: { 역할: "디자인 · 제작", 도구: "Photoshop, Illustrator, Claude Code", 결과물: "상품 랜딩페이지" },
      url: "#",
    },
  };

  // ----- Intro: hero title slide-up -----
  requestAnimationFrame(() => document.body.classList.add("is-loaded"));

  // ----- Theme toggle (초기값은 <head> 인라인 스크립트에서 적용) -----
  document.getElementById("themeToggle").addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    transition(() => { root.dataset.theme = next; });
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // ----- Mobile menu -----
  const header = document.querySelector(".header");
  const menuBtn = document.getElementById("menuBtn");
  const setMenu = (open) => {
    header.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
  };
  menuBtn.addEventListener("click", () => setMenu(!header.classList.contains("is-open")));
  document.querySelectorAll(".nav a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  // ----- Scroll progress + active nav -----
  const progress = document.querySelector(".progress");
  const navLinks = [...document.querySelectorAll(".nav a")];
  const sections = navLinks.map((a) => document.querySelector(a.getAttribute("href")));

  const onScroll = () => {
    const max = root.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;

    let current = -1;
    sections.forEach((sec, i) => { if (sec.getBoundingClientRect().top < innerHeight * 0.4) current = i; });
    navLinks.forEach((a, i) => {
      a.classList.toggle("is-current", i === current);
      if (i === current) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ----- Reveal on scroll -----
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
    // 등장 후에는 딜레이 제거 — hover 효과가 늦게 반응하지 않도록
    el.addEventListener("transitionend", () => { el.style.transitionDelay = ""; }, { once: true });
    io.observe(el);
  });

  // ----- Count-up numbers (JS 없으면 최종값이 그대로 보임) -----
  if (!reduceMotion) {
    const countIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const to = +el.dataset.to;
        const start = performance.now();
        const step = (now) => {
          const t = Math.min((now - start) / 1600, 1);
          el.textContent = Math.round(to * (1 - Math.pow(1 - t, 4)));
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        countIO.unobserve(el);
      });
    }, { threshold: 0.6 });
    document.querySelectorAll(".count").forEach((el) => { el.textContent = "0"; countIO.observe(el); });
  }

  // ----- Work filter -----
  const filters = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".card");
  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-pressed", b === btn);
      });
      const f = btn.dataset.filter;
      transition(() => cards.forEach((card) => {
        const show = f === "all" || card.dataset.cat.split(" ").includes(f);
        card.classList.toggle("is-hidden", !show);
        if (show) card.classList.add("is-in");
      }));
    });
  });

  // ----- Project modal (<dialog>: 포커스 트랩·ESC 닫기 기본 지원) -----
  const modal = document.getElementById("projectModal");
  const $ = (id) => document.getElementById(id);
  document.querySelectorAll(".card-link").forEach((btn) => {
    btn.addEventListener("click", () => {
      const p = projects[btn.dataset.project];
      if (!p) return;
      $("modalMedia").replaceChildren(btn.closest(".card").querySelector(".card-media").cloneNode(true));
      $("modalYear").textContent = p.year;
      $("modalTitle").textContent = p.title;
      $("modalDesc").textContent = p.desc;
      $("modalSpec").replaceChildren(...Object.entries(p.spec).flatMap(([k, v]) => {
        const dt = document.createElement("dt"); dt.textContent = k;
        const dd = document.createElement("dd"); dd.textContent = v;
        return [dt, dd];
      }));
      $("modalLink").href = p.url;
      $("modalLink").hidden = !p.url || p.url === "#"; // 작업물 링크가 생기면 자동으로 버튼 표시
      modal.showModal();
      root.style.overflow = "hidden";
    });
  });
  $("modalClose").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); }); // 배경 클릭 시 닫기
  modal.addEventListener("close", () => { root.style.overflow = ""; });

  // ----- Copy email -----
  const copyBtn = $("copyMail");
  copyBtn.addEventListener("click", async () => {
    const hint = copyBtn.querySelector(".copy-hint");
    try {
      await navigator.clipboard.writeText(copyBtn.dataset.mail);
      hint.textContent = "복사됨 ✓";
      $("copyStatus").textContent = "이메일 주소가 복사되었습니다.";
    } catch (e) {
      location.href = `mailto:${copyBtn.dataset.mail}`;
      return;
    }
    setTimeout(() => { hint.textContent = "복사"; }, 2000);
  });

  // ----- Custom cursor + magnetic buttons (마우스 기기 · 모션 허용 시에만) -----
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches || reduceMotion) return;

  const cursor = document.querySelector(".cursor");
  const label = cursor.querySelector(".cursor-label");
  let mx = -100, my = -100, cx = mx, cy = my;

  addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    document.body.classList.add("has-cursor");
  }, { passive: true });
  document.addEventListener("mouseleave", () => document.body.classList.remove("has-cursor"));

  const loop = () => {
    cx += (mx - cx) * 0.18;
    cy += (my - cy) * 0.18;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  };
  loop();

  document.querySelectorAll("[data-cursor]").forEach((el) => {
    el.addEventListener("mouseenter", () => { label.textContent = el.dataset.cursor; cursor.classList.add("is-active"); });
    el.addEventListener("mouseleave", () => cursor.classList.remove("is-active"));
    el.addEventListener("click", () => cursor.classList.remove("is-active"));
  });

  document.querySelectorAll(".magnetic").forEach((el) => {
    el.style.transition = "transform .5s cubic-bezier(.22,1,.36,1)";
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.3;
      const y = (e.clientY - r.top - r.height / 2) * 0.3;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener("mouseleave", () => { el.style.transform = ""; });
  });
})();
