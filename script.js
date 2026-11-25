(() => {
  const root = document.documentElement;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const transition = (fn) => (document.startViewTransition && !reduceMotion ? document.startViewTransition(fn) : fn());

  // ----- Project data (모달 상세 정보 — 실제 내용으로 교체) -----
  const projects = {
    ads: {
      year: "루미너스아이즈 · Google Demand Gen",
      title: "구글 디맨드젠 광고소재",
      desc: "유튜브·Discover·Gmail 지면에 노출되는 구글 디맨드젠 캠페인용 이미지 광고소재입니다. 브랜드마다 타깃과 톤을 다르게 잡고, 같은 메시지를 가로형(1200×628)과 정사각형(600×600) 두 규격으로 함께 제작했습니다.",
      points: [
        "작은 지면에서도 읽히도록 큰 헤드카피 한 줄과 혜택(3+2 구매 등)을 CTA 바로 위에 배치",
        "브랜드별 톤 분리 — 마가보감은 레드·블랙의 프리미엄 톤, 아이클타임은 밝은 키즈 톤, 리피어라는 핑크 계열 여성 톤",
        "ChatGPT·Gemini로 카피 방향과 콘셉트 시안을 넓힌 뒤, 포토샵·일러스트레이터로 규격별 최종 소재 완성",
      ],
      spec: { 역할: "광고소재 디자인", 도구: "Photoshop, Illustrator, ChatGPT, Gemini", 결과물: "1200×628 · 600×600 규격 광고소재 47종" },
      // 광고소재 추가: works/ads/web/에 이미지(+ -thumb)를 넣고 이름을 추가 (wide = 1200×628, square = 600×600)
      adGrid: [
        { brand: "마가보감", wide: ["maga-01", "maga-02", "maga-03", "maga-04", "maga-05", "maga-06", "maga-07", "maga-08", "maga-09"],
          square: ["maga-10", "maga-11", "maga-12", "maga-13", "maga-14", "maga-15", "maga-16", "maga-17", "maga-18"] },
        { brand: "아이클타임", wide: [],
          square: ["icletime-01", "icletime-02", "icletime-03", "icletime-04", "icletime-05", "icletime-06", "icletime-07", "icletime-08", "icletime-09", "icletime-10", "icletime-11", "icletime-12", "icletime-13", "icletime-14", "icletime-15"] },
        { brand: "리피어라", wide: ["repiera-01", "repiera-02", "repiera-03", "repiera-04", "repiera-05", "repiera-06", "repiera-07"],
          square: ["repiera-08", "repiera-09", "repiera-10", "repiera-11", "repiera-12", "repiera-13", "repiera-14"] },
      ],
    },
    shorts: {
      year: "루미너스아이즈 · AI Video",
      title: "AI 광고 영상",
      desc: "Google Flow와 Higgsfield로 장면을 생성하고, 프리미어 프로에서 컷 구성·자막·사운드를 더해 완성한 9:16 쇼츠 광고입니다.",
      points: [
        "첫 장면에 질문형·호기심 자막(“목에 좋다는 차, 다 마셔 봤다면”)을 넣어 초반 이탈을 줄이는 구성",
        "제조 시설, 원료, 3D 캐릭터, 시니어 모델 등 편마다 다른 연출로 소구 포인트를 실험",
        "장면마다 제품 패키지를 노출하고 하단 CTA 자막으로 마무리해 브랜드 인지와 행동 유도",
      ],
      spec: { 역할: "영상 생성 · 편집", 도구: "Google Flow, Higgsfield, Premiere Pro", 결과물: "9:16 AI 쇼츠 광고 영상 6편" },
      // 영상 추가: 유튜브 쇼츠 링크의 shorts/ 뒤 ID를 한 줄씩 추가 (brand가 같으면 한 묶음으로 표시)
      videos: [
        { brand: "마가보감", title: "A", id: "-KndzVjc4jw" },
        { brand: "마가보감", title: "B", id: "sNtv2lAzOxA" },
        { brand: "마가보감", title: "C", id: "cLk7Fof6WaU" },
        { brand: "마가보감", title: "D", id: "GRyBLQErisQ" },
        { brand: "마가보감", title: "E", id: "fZUipyDCV40" },
        { brand: "마가보감", title: "F", id: "Z4GqdMyToZU" },
      ],
    },
    landing: {
      year: "루미너스아이즈 · Landing Page",
      title: "상품 랜딩페이지",
      desc: "광고를 보고 들어온 고객이 상담 신청까지 이어지도록 설계한 모바일 상품 랜딩페이지입니다. 건강식품·뷰티 7개 브랜드, 13종을 디자인하고 VS Code로 직접 제작했습니다.",
      points: [
        "후킹 → 공감·문제 제기 → 근거(인증·연구) → 후기 → 혜택·신청폼으로 이어지는 전환 흐름 설계",
        "신청폼을 페이지 중간과 끝에 반복 배치해 스크롤 이탈 지점마다 전환 기회 확보",
        "광고소재와 같은 카피·컬러를 이어 써서 광고 → 랜딩으로 넘어올 때 어색함이 없도록 구성",
      ],
      spec: { 역할: "디자인 · 제작", 도구: "Photoshop, Illustrator, VS Code", 결과물: "건강식품·뷰티 랜딩페이지 13종 (모바일)" },
      // 랜딩 추가: works/landing/shots/에 캡처를 넣고 한 줄씩 추가 (brand가 같으면 한 묶음으로 표시)
      gallery: [
        { brand: "마가보감", title: "A", src: "works/landing/shots/maga-01.jpg" },
        { brand: "마가보감", title: "B", src: "works/landing/shots/maga-02.jpg" },
        { brand: "활보원", title: "A", src: "works/landing/shots/hwalbowon-01.jpg" },
        { brand: "활보원", title: "B", src: "works/landing/shots/hwalbowon-02.jpg" },
        { brand: "관절보궁", title: "A", src: "works/landing/shots/bogung-01.jpg" },
        { brand: "관절보궁", title: "B", src: "works/landing/shots/bogung-02.jpg" },
        { brand: "리피어라", title: "A", src: "works/landing/shots/repiera-01.jpg" },
        { brand: "리피어라", title: "B", src: "works/landing/shots/repiera-02.jpg" },
        { brand: "고혼진", title: "A", src: "works/landing/shots/gohonjin-01.jpg" },
        { brand: "아이클타임", title: "A", src: "works/landing/shots/icletime-01.jpg" },
        { brand: "아이클타임", title: "B", src: "works/landing/shots/icletime-02.jpg" },
        { brand: "해조전복프라임", title: "A", src: "works/landing/shots/fucoidan-01.jpg" },
        { brand: "해조전복프라임", title: "B", src: "works/landing/shots/fucoidan-02.jpg" },
      ],
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
  document.querySelectorAll(".reveal").forEach((el) => {
    // 같은 줄에 나란히 있는 형제끼리만 순서대로 등장 (페이지 전체 순번 기준이면 혼자 있는 요소도 늦게 떠서 어색함)
    const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
    el.style.transitionDelay = `${(siblings.indexOf(el) % 3) * 80}ms`;
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
      // 전용 뷰어(광고 그리드·영상·랜딩)가 있으면 카드 미리보기를 반복하지 않고 내용부터 보여 줌
      const hasViewer = p.adGrid || p.videos || p.gallery;
      $("modalMedia").replaceChildren(...(hasViewer ? [] : [btn.closest(".card").querySelector(".card-media").cloneNode(true)]));
      $("modalYear").textContent = p.year;
      $("modalTitle").textContent = p.title;
      $("modalDesc").textContent = p.desc;
      $("modalSpec").replaceChildren(...Object.entries(p.spec).flatMap(([k, v]) => {
        const dt = document.createElement("dt"); dt.textContent = k;
        const dd = document.createElement("dd"); dd.textContent = v;
        return [dt, dd];
      }));
      renderGallery(p.gallery);
      $("modalPoints").replaceChildren(...(p.points || []).map((t) => Object.assign(document.createElement("li"), { textContent: t })));
      $("modalPoints").hidden = $("modalPointsTitle").hidden = !(p.points && p.points.length);
      renderAdGrid(p.adGrid);
      renderVideos(p.videos);
      modal.showModal();
      modal.scrollTop = 0; // 다른 작업을 열 때 항상 맨 위부터
      root.style.overflow = "hidden";
    });
  });
  // ----- 랜딩페이지 캡처 뷰어 (탭으로 전환, 프레임 안에서 스크롤) -----
  function renderGallery(items) {
    const wrap = $("modalGallery"), tabs = $("modalGalleryTabs"), frame = $("modalGalleryFrame");
    wrap.hidden = !items || !items.length;
    if (wrap.hidden) { tabs.replaceChildren(); frame.replaceChildren(); return; }
    const label = (it) => [it.brand, it.title].filter(Boolean).join(" ");
    const buttons = items.map((it, i) => {
      const b = Object.assign(document.createElement("button"), { type: "button", className: "lp-tab", textContent: it.title });
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", label(it));
      b.addEventListener("click", () => show(i));
      return b;
    });
    const show = (i) => {
      buttons.forEach((b, j) => b.setAttribute("aria-selected", String(i === j)));
      const img = Object.assign(document.createElement("img"), { src: items[i].src, alt: `${label(items[i])} 랜딩페이지 전체 화면`, decoding: "async" });
      frame.replaceChildren(img);
      frame.scrollTop = 0;
    };
    // 같은 브랜드끼리 한 줄로 묶기: [브랜드명] A B …
    const groups = new Map();
    items.forEach((it, i) => {
      const key = it.brand || "";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(buttons[i]);
    });
    tabs.replaceChildren(...[...groups].map(([brand, btns]) => {
      const g = Object.assign(document.createElement("div"), { className: "lp-group" });
      if (brand) g.append(Object.assign(document.createElement("span"), { className: "lp-brand", textContent: brand }));
      g.append(...btns);
      return g;
    }));
    show(0);
  }

  // ----- 광고소재 모아보기 (브랜드별 그리드, 클릭하면 원본 크기로 열기) -----
  function renderAdGrid(groups) {
    const wrap = $("modalAds");
    wrap.hidden = !groups || !groups.length;
    if (wrap.hidden) { wrap.replaceChildren(); return; }
    const tile = (brand, name, shape) => {
      const a = Object.assign(document.createElement("a"), { href: `works/ads/web/${name}.jpg`, target: "_blank", rel: "noopener", className: `ad-tile ad-tile--${shape}` });
      a.setAttribute("aria-label", `${brand} 광고소재 크게 보기 (새 탭)`);
      a.append(Object.assign(document.createElement("img"), { src: `works/ads/web/${name}-thumb.jpg`, alt: "", loading: "lazy", decoding: "async" }));
      return a;
    };
    wrap.replaceChildren(...groups.map((g) => {
      const sec = Object.assign(document.createElement("section"), { className: "ad-group" });
      const count = g.wide.length + g.square.length;
      const h = Object.assign(document.createElement("h3"), { className: "ad-brand", textContent: g.brand });
      h.append(Object.assign(document.createElement("span"), { textContent: ` ${count}종` }));
      const grid = Object.assign(document.createElement("div"), { className: "ad-grid" });
      grid.append(...g.wide.map((n) => tile(g.brand, n, "wide")), ...g.square.map((n) => tile(g.brand, n, "square")));
      sec.append(h, grid);
      return sec;
    }));
  }

  // ----- 쇼츠 영상 플레이어 (유튜브 임베드, 버튼으로 영상 전환) -----
  function renderVideos(videos) {
    const wrap = $("modalVideos"), tabs = $("modalVideoTabs"), frame = $("modalVideoFrame");
    wrap.hidden = !videos || !videos.length;
    if (wrap.hidden) { tabs.replaceChildren(); frame.replaceChildren(); return; }
    const buttons = videos.map((v, i) => {
      const b = Object.assign(document.createElement("button"), { type: "button", className: "lp-tab", textContent: v.title });
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", `${v.brand} ${v.title}`);
      b.addEventListener("click", () => play(i));
      return b;
    });
    const play = (i) => {
      buttons.forEach((b, j) => b.setAttribute("aria-selected", String(i === j)));
      const iframe = Object.assign(document.createElement("iframe"), {
        src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videos[i].id)}?rel=0&playsinline=1`,
        title: `${videos[i].brand} ${videos[i].title} 영상`,
        allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen",
        loading: "lazy",
      });
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      frame.replaceChildren(iframe);
    };
    const groups = new Map();
    videos.forEach((v, i) => { if (!groups.has(v.brand)) groups.set(v.brand, []); groups.get(v.brand).push(buttons[i]); });
    tabs.replaceChildren(...[...groups].map(([brand, btns]) => {
      const g = Object.assign(document.createElement("div"), { className: "lp-group" });
      if (brand) g.append(Object.assign(document.createElement("span"), { className: "lp-brand", textContent: brand }));
      g.append(...btns);
      return g;
    }));
    play(0);
  }

  document.querySelectorAll("[data-open]").forEach((a) => a.addEventListener("click", (e) => {
    const btn = document.querySelector(`.card-link[data-project="${a.dataset.open}"]`);
    if (!btn) return;
    e.preventDefault();
    btn.click();
  }));

  $("modalClose").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); }); // 배경 클릭 시 닫기
  modal.addEventListener("close", () => {
    root.style.overflow = "";
    $("modalVideoFrame").replaceChildren(); // 팝업을 닫으면 영상 재생도 멈춤
  });

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
