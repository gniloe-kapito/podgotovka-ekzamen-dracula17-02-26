/* ============================================================
   Викторина по Спец.Тех. — статическое приложение
   Vanilla JS, без фреймворков. Грузит ./questions.json
   ============================================================ */
(function () {
  "use strict";

  /* ── Константы ── */
  var DOC_BASE = "https://docs.google.com/document/d/14T0skqC54wqwPvL55M2wNhRfV_gkcLz_GbZTfJi960U/edit?tab=t.0";

  var FUNNY = [
    { min: 90, title: "Ебанутый гений 25 века", sub: "Дракула в шоке. Можно идти сдавать." },
    { min: 70, title: "Хорошо, но не идеально", sub: "Есть над чем поработать. Почти." },
    { min: 50, title: "Неплохо, но лучше повторить", sub: "Конспект ждёт. Он по тебе скучает." },
    { min: 0, title: "Нужно больше практики", sub: "Ну, хоть что-то ответил. Уже неплохо." }
  ];

  var ICONS = {
    arrowLeft: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
    external: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
    check: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    x: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    alert: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    zap: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    layers: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
    gauge: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 14a4 4 0 1 0-4-4"/><path d="M12 14l3 3"/><circle cx="12" cy="14" r="8"/></svg>',
    folder: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
    search: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    chevR: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
    chevL: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
    share: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
    trophy: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
    flip: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',
    clock: '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>'
  };

  /* ── Состояние ── */
  var state = {
    view: "loading",
    theme: "dark",
    questions: [],
    categories: [],
    // quiz (quiz/quick/category — единый раннер)
    quiz: null,
    // flashcards
    flash: null,
    // results
    result: null,
    // search
    query: "",
    // localStorage-persisted stats
    stats: defaultStats(),
    // keyboard hints overlay
    kbdOverlayOpen: false
  };

  /* ── Утилиты ── */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function plural(n, one, few, many) {
    var m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
    return many;
  }
  function vibrate(p) {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try { navigator.vibrate(p); } catch (e) {}
    }
  }

  /* ── localStorage helpers (wrong-bank, streak, category mastery) ── */
  var LS_KEY = "spec-tech-stats-v1";
  function loadStats() {
    try {
      var raw = localStorage.getItem(LS_KEY);
      if (!raw) return defaultStats();
      var s = JSON.parse(raw);
      if (!s || typeof s !== "object") return defaultStats();
      return {
        wrongBank: Array.isArray(s.wrongBank) ? s.wrongBank : [],
        catMastery: (s.catMastery && typeof s.catMastery === "object") ? s.catMastery : {},
        streak: {
          current: Number(s.streak && s.streak.current) || 0,
          lastDay: (s.streak && s.streak.lastDay) || null,
          best: Number(s.streak && s.streak.best) || 0
        },
        totalAnswered: Number(s.totalAnswered) || 0,
        totalCorrect: Number(s.totalCorrect) || 0,
        promptDismissed: !!s.promptDismissed
      };
    } catch (e) { return defaultStats(); }
  }
  function defaultStats() {
    return {
      wrongBank: [],
      catMastery: {},
      streak: { current: 0, lastDay: null, best: 0 },
      totalAnswered: 0,
      totalCorrect: 0,
      promptDismissed: false
    };
  }
  function saveStats() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(state.stats)); } catch (e) {}
  }
  function todayStr() {
    var d = new Date();
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  }
  function yesterdayStr() {
    var d = new Date();
    d.setDate(d.getDate() - 1);
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  }
  /** Update streak based on today's activity */
  function touchStreak() {
    var today = todayStr();
    var s = state.stats.streak;
    if (s.lastDay === today) return; // already counted today
    if (s.lastDay === yesterdayStr()) {
      s.current += 1;
    } else {
      s.current = 1;
    }
    s.lastDay = today;
    if (s.current > s.best) s.best = s.current;
    saveStats();
  }
  /** Record a session result into stats */
  function recordSession(result) {
    if (!result) return;
    touchStreak();
    state.stats.totalAnswered += result.answered;
    state.stats.totalCorrect += result.correct;
    // Update wrong-bank: add wrong questions, remove correctly-answered ones
    var wrongTexts = {};
    result.wrongQuestions.forEach(function (w) { wrongTexts[w.question] = w; });
    // Remove from bank questions that were answered correctly this session
    var correctTexts = {};
    if (state.quiz && state.quiz.answered) {
      state.quiz.answered.forEach(function (a) {
        if (a.isCorrect) correctTexts[a.question.question] = true;
      });
    }
    state.stats.wrongBank = state.stats.wrongBank.filter(function (q) {
      return !correctTexts[q.question];
    });
    // Add new wrong questions (avoid duplicates by question text)
    var existingTexts = {};
    state.stats.wrongBank.forEach(function (q) { existingTexts[q.question] = true; });
    result.wrongQuestions.forEach(function (w) {
      if (!existingTexts[w.question]) {
        state.stats.wrongBank.push({
          question: w.question,
          category: w.category,
          ticket: w.ticket,
          docUrl: w.docUrl
        });
        existingTexts[w.question] = true;
      }
    });
    // Update category mastery
    result.perCategory.forEach(function (c) {
      var prev = state.stats.catMastery[c.category] || { correct: 0, total: 0 };
      // Rolling: keep last ~20 answers per category
      var newTotal = Math.min(prev.total + c.total, 20);
      var newCorrect = Math.min(prev.correct + c.correct, 20);
      state.stats.catMastery[c.category] = { correct: newCorrect, total: newTotal };
    });
    saveStats();
  }
  /** Get mastery percentage for a category (0-100), or null if no data */
  function getCatMastery(catName) {
    var m = state.stats.catMastery[catName];
    if (!m || m.total === 0) return null;
    return Math.round((m.correct / m.total) * 100);
  }
  function fmtTime(s) {
    var m = Math.floor(s / 60), ss = s % 60;
    return m + ":" + (ss < 10 ? "0" + ss : ss);
  }
  function isDesktop() {
    return window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(pointer: coarse)").matches;
  }

  /* ── Тема ── */
  function setupTheme() {
    try {
      var saved = localStorage.getItem("st-theme");
      state.theme = saved || "dark";
    } catch (e) { state.theme = "dark"; }
    applyTheme();
  }
  function applyTheme() {
    var effective = state.theme;
    if (effective === "system") {
      effective = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    document.documentElement.setAttribute("data-theme", effective);
    var meta = $('meta[name="theme-color"]:not([media])') || $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", effective === "dark" ? "#0a0a0a" : "#fafafa");
  }
  function cycleTheme() {
    state.theme = state.theme === "dark" ? "light" : state.theme === "light" ? "system" : "dark";
    try { localStorage.setItem("st-theme", state.theme); } catch (e) {}
    applyTheme();
    renderTopbarTheme();
  }
  function renderTopbarTheme() {
    var btn = $('[data-action="cycle-theme"]');
    if (!btn) return;
    // иконки переключаются CSS по data-theme, но для system нужно показать monitor
    document.documentElement.setAttribute("data-theme",
      state.theme === "system" ? "system" :
      (state.theme === "dark" ? "dark" : "light"));
    // для system — реальный цвет фона уже применён в applyTheme, но data-theme=system
    // нужно для CSS показа icon-monitor. Однако цвет фона зависит от data-theme.
    // Решение: ставим data-theme в реальный эффективный, а иконку monitor показываем через отдельный класс.
    var eff = state.theme;
    if (eff === "system") {
      document.documentElement.setAttribute("data-theme", window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      document.documentElement.setAttribute("data-theme-mode", "system");
    } else {
      document.documentElement.setAttribute("data-theme", eff);
      document.documentElement.setAttribute("data-theme-mode", eff);
    }
  }

  /* ── Загрузка вопросов ── */
  function loadQuestions(cb) {
    fetch("./questions.json", { cache: "no-store" })
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function (data) {
        state.questions = Array.isArray(data) ? data : (data.questions || []);
        deriveCategories();
        var fc = $("#footer-count");
        if (fc) fc.textContent = state.questions.length;
        cb();
      })
      .catch(function (e) {
        state.view = "error";
        state.errorMsg = String(e);
        cb();
      });
  }
  function deriveCategories() {
    var map = {};
    state.questions.forEach(function (q) {
      if (!map[q.category]) {
        map[q.category] = { name: q.category, ticket: q.ticket, docUrl: q.docUrl, count: 0 };
      }
      map[q.category].count++;
    });
    state.categories = Object.keys(map).map(function (k) { return map[k]; })
      .sort(function (a, b) { return Number(a.ticket) - Number(b.ticket); });
  }

  /* ── Рендер ── */
  function render() {
    var app = $("#app");
    app.className = "app";
    var html;
    switch (state.view) {
      case "loading": html = renderLoading(); break;
      case "error": html = renderError(); break;
      case "home": html = renderHome(); break;
      case "quiz": html = renderQuiz(); break;
      case "flashcards": html = renderFlashcards(); break;
      case "categories": html = renderCategories(); break;
      case "search": html = renderSearch(); break;
      case "results": html = renderResults(); break;
      default: html = renderHome();
    }
    app.innerHTML = html;
    afterRender();
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  function afterRender() {
    // Обновить иконку темы в topbar
    renderTopbarTheme();
    // Фокус на поиск
    if (state.view === "search") {
      var inp = $("#search-input");
      if (inp) { inp.focus(); inp.value = state.query; }
    }
    // Прокрутить прогресс-бар результатов
    if (state.view === "results") {
      $all(".cat-bar-fill").forEach(function (el) {
        el.style.width = el.getAttribute("data-w") + "%";
      });
    }
    // Анимация счётчика на главной
    if (state.view === "home") {
      animateCounters();
    }
  }

  /** Анимация счётчиков (0 → N) на главной странице */
  function animateCounters() {
    $all("[data-count-to]").forEach(function (el) {
      var target = parseInt(el.getAttribute("data-count-to"), 10);
      if (isNaN(target) || target === 0) { el.textContent = target; return; }
      var duration = 800; // ms
      var start = performance.now();
      function tick(now) {
        var elapsed = now - start;
        var progress = Math.min(elapsed / duration, 1);
        // easeOutQuart for snappy feel
        var eased = 1 - Math.pow(1 - progress, 4);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  /* ── Loading / Error ── */
  function renderLoading() {
    return '<div class="loading"><div class="spinner"></div><p style="font-size:13px;color:var(--muted)">Загружаю вопросы…</p></div>';
  }
  function renderError() {
    return '<div class="error-screen"><p style="color:var(--danger);font-size:14px">Не удалось загрузить вопросы</p><p style="font-size:12px;color:var(--muted)">' + esc(state.errorMsg || "") + '</p></div>';
  }

  /* ── Home ── */
  function renderHome() {
    var modes = [
      { id: "quiz", icon: "zap", title: "Викторина", desc: "Все вопросы вперемешку", meta: state.questions.length + " " + plural(state.questions.length, "вопрос", "вопроса", "вопросов"), primary: true },
      { id: "flashcards", icon: "layers", title: "Карточки", desc: "Вопрос → ответ, для заучивания", meta: "свайп / клик" },
      { id: "quick", icon: "gauge", title: "Быстрый", desc: "10 случайных за 2 минуты", meta: "2:00" },
      { id: "categories", icon: "folder", title: "По категориям", desc: "Тренировка по конкретному билету", meta: state.categories.length + " " + plural(state.categories.length, "категория", "категории", "категорий") },
      { id: "search", icon: "search", title: "Поиск", desc: "Найти вопрос по слову", meta: "" }
    ];
    var cards = modes.map(function (m) {
      return '<button class="mode-card' + (m.primary ? " primary" : "") + '" data-action="start-' + m.id + '" type="button">' +
        '<span class="mode-icon">' + ICONS[m.icon] + '</span>' +
        '<span class="mode-body">' +
          '<span class="mode-title">' + esc(m.title) +
            (m.meta ? '<span class="mode-meta">' + esc(m.meta) + '</span>' : "") +
          '</span>' +
          '<span class="mode-desc">' + esc(m.desc) + '</span>' +
        '</span>' +
        '<span class="mode-arrow">' + ICONS.chevR + '</span>' +
      '</button>';
    }).join("");

    // Streak badge (only if streak > 0)
    var streakHtml = "";
    if (state.stats.streak.current > 0) {
      streakHtml = '<span class="streak-badge active" title="Серия дней подряд">' +
        '<span class="streak-flame">🔥</span>' + state.stats.streak.current +
        ' ' + plural(state.stats.streak.current, "день", "дня", "дней") + '</span>';
    }

    // Wrong-bank prompt (only if bank has items and not dismissed)
    var wrongBankHtml = "";
    if (state.stats.wrongBank.length > 0 && !state.stats.promptDismissed) {
      wrongBankHtml = '<div class="wrong-bank-prompt">' +
        '<span class="wbp-icon">' + ICONS.alert + '</span>' +
        '<div class="wbp-body">' +
          '<div class="wbp-title">Работа над ошибками</div>' +
          '<div class="wbp-desc">В банке ' + state.stats.wrongBank.length + ' ' + plural(state.stats.wrongBank.length, "вопрос", "вопроса", "вопросов") + ', которые ты раньше отвечал неверно.</div>' +
        '</div>' +
        '<button class="wbp-btn" data-action="start-wrong-bank" type="button">Повторить</button>' +
        '<button class="wbp-close" data-action="dismiss-prompt" type="button" aria-label="Скрыть">' + ICONS.x + '</button>' +
      '</div>';
    }

    return '<section class="anim-fade">' +
      '<div class="hero">' +
        '<div class="row" style="justify-content:space-between;align-items:flex-start;gap:12px">' +
          '<div style="flex:1;min-width:0">' +
            '<h1>Спец.Тех.</h1>' +
            '<p>Подготовка к экзамену у Дракулы — гоняй, пока не выучишь.</p>' +
          '</div>' +
          streakHtml +
        '</div>' +
        '<div class="hero-stats">' +
          '<div class="hero-stat"><span class="hero-stat-num" data-count-to="' + state.questions.length + '">0</span><span class="hero-stat-label">' + plural(state.questions.length, "вопрос", "вопроса", "вопросов") + '</span></div>' +
          '<span class="hero-stat-dot"></span>' +
          '<div class="hero-stat"><span class="hero-stat-num" data-count-to="' + state.categories.length + '">0</span><span class="hero-stat-label">' + plural(state.categories.length, "билет", "билета", "билетов") + '</span></div>' +
          '<span class="hero-stat-dot"></span>' +
          '<div class="hero-stat"><span class="hero-stat-num" data-count-to="' + (state.stats.totalAnswered || 0) + '">0</span><span class="hero-stat-label">отвечено всего</span></div>' +
        '</div>' +
      '</div>' +
      wrongBankHtml +
      '<div class="modes-grid">' + cards + '</div>' +
    '</section>';
  }

  /** Start quiz from the persistent wrong-bank */
  function startWrongBank() {
    if (state.stats.wrongBank.length === 0) return;
    // Find full question objects by matching question text
    var bankTexts = {};
    state.stats.wrongBank.forEach(function (w) { bankTexts[w.question] = true; });
    var qs = state.questions.filter(function (q) { return bankTexts[q.question]; });
    if (qs.length === 0) {
      // Bank items no longer match questions.json — clear bank
      state.stats.wrongBank = [];
      saveStats();
      return;
    }
    startQuiz("quiz", { questions: qs, title: "Банк ошибок (" + qs.length + ")" });
  }
  function dismissPrompt() {
    state.stats.promptDismissed = true;
    saveStats();
    render();
  }

  /* ── Quiz (quiz/quick/category) ── */
  function startQuiz(mode, opts) {
    opts = opts || {};
    var qs = opts.questions || state.questions;
    var shuffled = shuffle(qs);
    state.quiz = {
      mode: mode,
      title: opts.title || "Викторина",
      shuffled: shuffled,
      current: 0,
      answered: [],
      selected: null,
      revealed: false,
      startedAt: Date.now(),
      timeLeft: opts.timedSeconds != null ? opts.timedSeconds : null,
      currentShuffled: null,
      currentCorrectPos: -1,
      timerId: null
    };
    prepareCurrentQuestion();
    state.view = "quiz";
    render();
    if (state.quiz.timeLeft != null) startTimer();
  }
  function startTimer() {
    stopTimer();
    state.quiz.timerId = setInterval(function () {
      if (!state.quiz) return;
      state.quiz.timeLeft--;
      if (state.quiz.timeLeft <= 0) {
        stopTimer();
        finishWithCurrent();
      } else {
        updateTimerChip();
      }
    }, 1000);
  }
  function stopTimer() {
    if (state.quiz && state.quiz.timerId) { clearInterval(state.quiz.timerId); state.quiz.timerId = null; }
  }
  function updateTimerChip() {
    var el = $("#time-chip");
    if (!el || !state.quiz) return;
    el.textContent = fmtTime(state.quiz.timeLeft);
    if (state.quiz.timeLeft < 30) el.classList.add("danger"); else el.classList.remove("danger");
  }
  function prepareCurrentQuestion() {
    var q = state.quiz.shuffled[state.quiz.current];
    if (!q) return;
    var withIdx = q.answers.map(function (text, i) { return { text: text, originalIndex: i }; });
    var sh = shuffle(withIdx);
    state.quiz.currentShuffled = sh;
    state.quiz.currentCorrectPos = (function () {
      for (var i = 0; i < sh.length; i++) if (sh[i].originalIndex === q.correct) return i;
      return -1;
    })();
  }

  function renderQuiz() {
    var z = state.quiz;
    if (!z) return renderHome();
    var q = z.shuffled[z.current];
    if (!q) return renderHome();
    var progressPct = ((z.current + (z.revealed ? 1 : 0)) / z.shuffled.length) * 100;
    var correctSoFar = z.answered.filter(function (a) { return a.isCorrect; }).length;

    var answersHtml = z.currentShuffled.map(function (ans, idx) {
      var isSel = z.selected === idx;
      var isCorr = idx === z.currentCorrectPos;
      var cls = "answer";
      if (z.revealed) {
        if (isCorr) cls += " correct";
        else if (isSel && !isCorr) cls += " wrong";
        else cls += " dimmed";
      }
      var badge;
      if (z.revealed && isCorr) badge = ICONS.check;
      else if (z.revealed && isSel && !isCorr) badge = ICONS.x;
      else badge = (idx + 1);
      return '<button class="' + cls + '" data-action="select" data-idx="' + idx + '" type="button"' + (z.revealed ? ' disabled' : '') + '>' +
        '<span class="a-badge">' + badge + '</span>' +
        '<span class="a-text">' + esc(ans.text) + '</span>' +
      '</button>';
    }).join("");

    var feedbackHtml = "";
    if (z.revealed) {
      var ok = z.selected === z.currentCorrectPos;
      feedbackHtml = '<div class="feedback ' + (ok ? "ok" : "bad") + '">' +
        '<div class="feedback-head">' + (ok ? ICONS.check + "<span>Верно</span>" : ICONS.alert + "<span>Неверно</span>") + '</div>' +
        '<div class="feedback-body">' +
          (ok
            ? 'Красавчик. Можешь подсмотреть в конспект, чтобы закрепить.'
            : 'Загляни в конспект — <strong>билет ' + esc(q.ticket) + ', раздел «' + esc(q.category) + '»</strong> — и разберись, в чём суть.') +
          ' <a class="link" href="' + esc(q.docUrl) + '" target="_blank" rel="noopener noreferrer">' + ICONS.external + 'Конспект</a>' +
        '</div>' +
      '</div>';
    }

    var actionsHtml = "";
    if (z.revealed) {
      var isLast = z.current + 1 >= z.shuffled.length;
      if (isLast) {
        actionsHtml = '<button class="btn btn-lg" data-action="next" type="button" style="width:100%">Показать результат</button>';
      } else {
        actionsHtml = '<button class="btn btn-ghost" data-action="finish-early" type="button">Завершить досрочно</button>' +
          '<button class="btn btn-lg" data-action="next" type="button">Далее' + (isDesktop() ? ' <span style="font-size:11px;opacity:.6">Enter</span>' : '') + '</button>';
      }
    }

    var timerChip = z.timeLeft != null
      ? '<span class="score-chip' + (z.timeLeft < 30 ? " danger" : "") + '" id="time-chip">' + ICONS.clock + fmtTime(z.timeLeft) + '</span>'
      : "";

    return '<section class="anim-slide">' +
      '<div class="quiz-topbar">' +
        '<button class="pill-btn" data-action="exit" type="button">' + ICONS.arrowLeft + '<span class="hide-sm">Выход</span></button>' +
        '<div class="row" style="gap:6px">' + timerChip +
          '<span class="score-chip">' + correctSoFar + '/' + z.shuffled.length + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="progress-track"><div class="progress-fill" style="width:' + progressPct + '%"></div></div>' +
      '<div class="quiz-meta-row"><span>Вопрос ' + (z.current + 1) + ' из ' + z.shuffled.length + '</span><span class="title-trunc">' + esc(z.title) + '</span></div>' +
      '<div class="q-tags">' +
        '<span class="chip">' + esc(q.category) + '</span>' +
        '<span class="chip">Билет ' + esc(q.ticket) + '</span>' +
      '</div>' +
      '<h2 class="q-text">' + esc(q.question) + '</h2>' +
      '<div class="answers">' + answersHtml + '</div>' +
      feedbackHtml +
      '<div class="quiz-actions">' + actionsHtml + '</div>' +
    '</section>';
  }

  function handleSelect(idx) {
    var z = state.quiz;
    if (!z || z.revealed) return;
    z.selected = idx;
    z.revealed = true;
    if (idx === z.currentCorrectPos) vibrate(30); else vibrate([40, 40, 40]);
    render();
  }
  function goNext() {
    var z = state.quiz;
    if (!z || !z.revealed) return;
    var q = z.shuffled[z.current];
    var isCorrect = z.selected === z.currentCorrectPos;
    z.answered.push({
      question: q,
      selectedIndex: z.selected,
      shuffled: z.currentShuffled,
      correctPosition: z.currentCorrectPos,
      isCorrect: isCorrect
    });
    if (z.current + 1 >= z.shuffled.length) {
      finishWith(z.answered);
    } else {
      z.current++;
      z.selected = null;
      z.revealed = false;
      prepareCurrentQuestion();
      render();
    }
  }
  function finishEarly() {
    var z = state.quiz;
    if (!z) return;
    // включаем текущий раскрытый ответ, если есть
    if (z.revealed && z.shuffled[z.current] && z.selected != null) {
      var q = z.shuffled[z.current];
      z.answered.push({
        question: q,
        selectedIndex: z.selected,
        shuffled: z.currentShuffled,
        correctPosition: z.currentCorrectPos,
        isCorrect: z.selected === z.currentCorrectPos
      });
    }
    if (z.answered.length === 0) return;
    finishWith(z.answered);
  }
  function finishWithCurrent() { finishEarly(); }
  function finishWith(answered) {
    stopTimer();
    var z = state.quiz;
    var perCat = {};
    answered.forEach(function (a) {
      var cat = a.question.category;
      if (!perCat[cat]) perCat[cat] = { category: cat, ticket: a.question.ticket, docUrl: a.question.docUrl, total: 0, correct: 0, wrong: 0 };
      perCat[cat].total++;
      if (a.isCorrect) perCat[cat].correct++; else perCat[cat].wrong++;
    });
    var perCategory = Object.keys(perCat).map(function (k) { return perCat[k]; })
      .sort(function (a, b) { return Number(a.ticket) - Number(b.ticket); });
    var wrongQuestions = answered.filter(function (a) { return !a.isCorrect; }).map(function (a) {
      return {
        question: a.question.question,
        category: a.question.category,
        ticket: a.question.ticket,
        docUrl: a.question.docUrl,
        userAnswer: a.selectedIndex >= 0 ? a.shuffled[a.selectedIndex].text : "—",
        correctAnswer: a.question.answers[a.question.correct]
      };
    });
    state.result = {
      mode: z ? z.mode : "quiz",
      total: z ? z.shuffled.length : answered.length,
      answered: answered.length,
      correct: answered.filter(function (a) { return a.isCorrect; }).length,
      wrong: answered.filter(function (a) { return !a.isCorrect; }).length,
      durationMs: z ? Date.now() - z.startedAt : 0,
      perCategory: perCategory,
      wrongQuestions: wrongQuestions
    };
    recordSession(state.result);
    state.view = "results";
    render();
  }

  /* ── Flashcards ── */
  function startFlashcards(opts) {
    opts = opts || {};
    var qs = opts.questions || state.questions;
    state.flash = {
      shuffled: shuffle(qs),
      current: 0,
      flipped: false,
      title: opts.title || "Все карточки"
    };
    state.view = "flashcards";
    render();
  }
  function renderFlashcards() {
    var f = state.flash;
    if (!f) return renderHome();
    var q = f.shuffled[f.current];
    if (!q) return renderHome();
    return '<section class="anim-slide">' +
      '<div class="flash-topbar">' +
        '<button class="pill-btn" data-action="exit" type="button">' + ICONS.arrowLeft + '<span class="hide-sm">Выход</span></button>' +
        '<span class="score-chip">' + (f.current + 1) + '/' + f.shuffled.length + '</span>' +
      '</div>' +
      '<div class="flash-meta"><span class="title-trunc">' + esc(f.title) + '</span><span>' + esc(q.category) + ' · Билет ' + esc(q.ticket) + '</span></div>' +
      '<div class="flash-card-wrap">' +
        '<div class="flash-card' + (f.flipped ? " flipped" : "") + '" data-action="flip">' +
          '<div class="flash-face front">' +
            '<span class="flash-label">Вопрос</span>' +
            '<div class="flash-content">' + esc(q.question) + '</div>' +
            '<p class="flash-hint">' + (isDesktop() ? "Enter / пробел или клик — перевернуть" : "Тапни, чтобы увидеть ответ") + '</p>' +
          '</div>' +
          '<div class="flash-face back">' +
            '<span class="flash-label">Правильный ответ</span>' +
            '<div class="flash-content">' + esc(q.answers[q.correct]) + '</div>' +
            '<a class="link" href="' + esc(q.docUrl) + '" target="_blank" rel="noopener noreferrer" data-action="noop">' + ICONS.external + 'Конспект по билету ' + esc(q.ticket) + '</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="flash-nav">' +
        '<button class="btn btn-ghost" data-action="flash-prev" type="button"' + (f.current === 0 ? " disabled" : "") + '>' + ICONS.chevL + 'Назад</button>' +
        '<button class="btn btn-outline" data-action="flip" type="button">' + ICONS.flip + 'Перевернуть</button>' +
        '<button class="btn btn-ghost" data-action="flash-next" type="button"' + (f.current + 1 >= f.shuffled.length ? " disabled" : "") + '>Далее' + ICONS.chevR + '</button>' +
      '</div>' +
    '</section>';
  }
  function flipCard() {
    if (!state.flash) return;
    state.flash.flipped = !state.flash.flipped;
    var card = $(".flash-card");
    if (card) { card.classList.toggle("flipped", state.flash.flipped); }
  }
  function flashNext() {
    if (!state.flash) return;
    if (state.flash.current + 1 >= state.flash.shuffled.length) return;
    state.flash.flipped = false;
    state.flash.current++;
    render();
  }
  function flashPrev() {
    if (!state.flash) return;
    if (state.flash.current === 0) return;
    state.flash.flipped = false;
    state.flash.current--;
    render();
  }

  /* ── Categories ── */
  function renderCategories() {
    var items = state.categories.map(function (c) {
      var mastery = getCatMastery(c.name);
      var masteryHtml = "";
      if (mastery !== null) {
        var cls = mastery >= 80 ? "" : mastery >= 50 ? "partial" : "low";
        masteryHtml = '<div class="cat-mastery">' +
          '<div class="cat-mastery-row">' +
            '<span>мастерство ' + mastery + '%</span>' +
            '<div class="cat-mastery-track"><div class="cat-mastery-fill ' + cls + '" style="width:' + mastery + '%"></div></div>' +
          '</div>' +
        '</div>';
      }
      return '<button class="cat-item" data-action="pick-category" data-cat="' + esc(c.name) + '" type="button">' +
        '<span class="cat-ticket">' + esc(c.ticket) + '</span>' +
        '<span class="cat-body">' +
          '<span class="cat-name">' + esc(c.name) + '</span><br>' +
          '<span class="cat-count">' + c.count + ' ' + plural(c.count, "вопрос", "вопроса", "вопросов") + '</span>' +
          masteryHtml +
        '</span>' +
        '<a class="icon-link" href="' + esc(c.docUrl) + '" target="_blank" rel="noopener noreferrer" data-action="noop" aria-label="Конспект: ' + esc(c.name) + '">' + ICONS.external + '</a>' +
        '<span class="cat-chev">' + ICONS.chevR + '</span>' +
      '</button>';
    }).join("");
    return '<section class="anim-fade">' +
      '<div class="quiz-topbar"><button class="pill-btn" data-action="home" type="button">' + ICONS.arrowLeft + '<span class="hide-sm">На главную</span></button></div>' +
      '<h1 style="font-size:28px;font-weight:700;letter-spacing:-0.02em;margin-bottom:6px">По категориям</h1>' +
      '<p style="font-size:13px;color:var(--muted);margin-bottom:20px">Выбери билет и гоняй вопросы только по нему. ' + state.categories.length + ' ' + plural(state.categories.length, "категория", "категории", "категорий") + '.</p>' +
      '<div class="cat-list">' + items + '</div>' +
    '</section>';
  }
  function pickCategory(cat) {
    var qs = state.questions.filter(function (q) { return q.category === cat; });
    startQuiz("category", { questions: qs, title: cat });
  }

  /* ── Search ── */
  function renderSearch() {
    var q = state.query.trim().toLowerCase();
    var results = q ? state.questions.filter(function (item) {
      return item.question.toLowerCase().indexOf(q) !== -1 ||
        item.category.toLowerCase().indexOf(q) !== -1 ||
        item.answers.some(function (a) { return a.toLowerCase().indexOf(q) !== -1; });
    }) : state.questions;

    var list;
    if (results.length === 0) {
      list = '<div class="empty-state">Ничего не нашлось. Попробуй другой запрос.</div>';
    } else {
      list = '<div class="search-results">' + results.map(function (item) {
        var ans = item.answers.map(function (a, idx) {
          var ok = idx === item.correct;
          return '<div class="sc-ans-item' + (ok ? " ok" : "") + '"><span class="sc-ans-dot">' + (ok ? "✓" : "") + '</span>' + esc(a) + '</div>';
        }).join("");
        return '<div class="search-card">' +
          '<div class="sc-tags"><span class="cat-result-ticket">#' + esc(item.ticket) + '</span><span>' + esc(item.category) + '</span></div>' +
          '<div class="sc-q">' + esc(item.question) + '</div>' +
          '<div class="sc-ans">' + ans + '</div>' +
          '<a class="link" href="' + esc(item.docUrl) + '" target="_blank" rel="noopener noreferrer">' + ICONS.external + 'Конспект</a>' +
        '</div>';
      }).join("") + '</div>';
    }
    return '<section class="anim-fade">' +
      '<div class="quiz-topbar"><button class="pill-btn" data-action="home" type="button">' + ICONS.arrowLeft + '<span class="hide-sm">На главную</span></button></div>' +
      '<h1 style="font-size:28px;font-weight:700;letter-spacing:-0.02em;margin-bottom:6px">Поиск</h1>' +
      '<p style="font-size:13px;color:var(--muted);margin-bottom:16px">Найди вопрос по слову, теме или варианту ответа.</p>' +
      '<div class="search-input-wrap">' +
        '<span class="search-icon">' + ICONS.search + '</span>' +
        '<input id="search-input" class="search-input" type="text" placeholder="Например, «трансформатор» или «УЗО»" autocomplete="off">' +
        (state.query ? '<button class="search-clear" data-action="search-clear" type="button">' + ICONS.x + '</button>' : '') +
      '</div>' +
      '<div style="font-size:12px;color:var(--muted);margin-bottom:12px">' + results.length + ' ' + plural(results.length, "вопрос", "вопроса", "вопросов") + ' найдено</div>' +
      list +
    '</section>';
  }
  function doSearch(val) {
    state.query = val;
    render();
    var inp = $("#search-input");
    if (inp) {
      inp.focus();
      inp.setSelectionRange(val.length, val.length);
    }
  }

  /* ── Results ── */
  function renderResults() {
    var r = state.result;
    if (!r) return renderHome();
    var pct = r.total > 0 ? Math.round((r.correct / r.total) * 100) : 0;
    var msg = FUNNY.filter(function (m) { return pct >= m.min; })[0] || FUNNY[FUNNY.length - 1];
    var mins = Math.floor(r.durationMs / 60000);
    var secs = Math.floor((r.durationMs % 60000) / 1000);
    var dur = mins + ":" + (secs < 10 ? "0" + secs : secs);

    var catList = r.perCategory.map(function (c) {
      var cPct = c.total > 0 ? Math.round((c.correct / c.total) * 100) : 0;
      var cls = "cat-result" + (cPct === 100 ? " good" : cPct < 50 ? " bad" : "");
      return '<div class="' + cls + '">' +
        '<div class="cat-result-top">' +
          '<div class="cat-result-info">' +
            '<div class="cat-result-name"><span class="cat-result-ticket">#' + esc(c.ticket) + '</span><span class="cat-result-h">' + esc(c.category) + '</span></div>' +
            '<div class="cat-result-sub">' + c.correct + ' из ' + c.total + ' верно</div>' +
          '</div>' +
          '<div class="row" style="gap:8px">' +
            '<span class="cat-result-pct">' + cPct + '%</span>' +
            '<a class="icon-link" href="' + esc(c.docUrl) + '" target="_blank" rel="noopener noreferrer" aria-label="Конспект: ' + esc(c.category) + '">' + ICONS.external + '</a>' +
          '</div>' +
        '</div>' +
        '<div class="cat-bar"><div class="cat-bar-fill" data-w="' + cPct + '" style="width:0"></div></div>' +
      '</div>';
    }).join("");

    var wrongList = "";
    if (r.wrongQuestions.length > 0) {
      wrongList = '<h2 class="section-title">Ошибки (' + r.wrongQuestions.length + ')</h2>' +
        r.wrongQuestions.map(function (w) {
          return '<div class="wrong-item">' +
            '<div class="wrong-item-top">' +
              '<div class="wrong-q">' + esc(w.question) + '</div>' +
              '<a class="icon-link" href="' + esc(w.docUrl) + '" target="_blank" rel="noopener noreferrer" aria-label="Конспект">' + ICONS.external + '</a>' +
            '</div>' +
            '<div class="wrong-ans">' +
              '<div class="wa-bad"><span class="wa-label">Твой ответ:</span> ' + esc(w.userAnswer) + '</div>' +
              '<div class="wa-ok"><span class="wa-label">Правильно:</span> ' + esc(w.correctAnswer) + '</div>' +
            '</div>' +
            '<div class="wrong-meta">' + esc(w.category) + ' · Билет ' + esc(w.ticket) + '</div>' +
          '</div>';
        }).join("");
    }

    return '<section class="anim-fade">' +
      '<div class="quiz-topbar"><button class="pill-btn" data-action="home" type="button">' + ICONS.arrowLeft + '<span class="hide-sm">На главную</span></button></div>' +
      '<div class="result-hero">' +
        '<div class="result-trophy">' + ICONS.trophy + '</div>' +
        '<h1 class="result-title">' + esc(msg.title) + '</h1>' +
        '<p class="result-sub">' + esc(msg.sub) + '</p>' +
        '<div class="result-pct">' + pct + '<span class="result-pct-sign">%</span></div>' +
        '<p class="result-correct">' + r.correct + ' из ' + r.answered + ' правильных</p>' +
        '<div class="result-stats">' +
          '<span class="result-stat">' + ICONS.clock + dur + '</span>' +
          '<span class="result-stat ok">' + ICONS.check + r.correct + ' верно</span>' +
          (r.wrong > 0 ? '<span class="result-stat bad">' + ICONS.alert + r.wrong + ' ошибок</span>' : '') +
        '</div>' +
      '</div>' +
      (r.perCategory.length > 0 ? '<h2 class="section-title">Разбор по категориям</h2>' + catList : '') +
      wrongList +
      '<div class="result-actions">' +
        '<button class="btn btn-lg" data-action="restart" type="button">' + ICONS.refresh + 'Пройти заново</button>' +
        (r.wrong > 0 ? '<button class="btn btn-lg" data-action="retry-wrong" type="button" style="background:var(--danger)">' + ICONS.alert + 'Работа над ошибками (' + r.wrong + ')</button>' : '') +
        '<button class="btn btn-outline btn-lg" data-action="share" type="button">' + ICONS.share + 'Поделиться</button>' +
      '</div>' +
    '</section>';
  }

  function shareResult() {
    var r = state.result;
    if (!r) return;
    var pct = r.total > 0 ? Math.round((r.correct / r.total) * 100) : 0;
    var msg = FUNNY.filter(function (m) { return pct >= m.min; })[0] || FUNNY[FUNNY.length - 1];
    var text = "Я прошёл викторину по Спец.Тех.: " + r.correct + " из " + r.total + " (" + pct + "%). " + msg.title;
    if (navigator.share) {
      navigator.share({ title: "Викторина по Спец.Тех.", text: text }).catch(function () {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function () {
        toast("Скопировано в буфер");
      }, function () {});
    }
  }
  function toast(msg) {
    var t = document.createElement("div");
    t.textContent = msg;
    t.style.cssText = "position:fixed;left:50%;bottom:80px;transform:translateX(-50%);background:var(--fg);color:var(--bg);padding:8px 16px;border-radius:999px;font-size:13px;z-index:100;animation:fadeIn .2s";
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 1800);
  }

  function restart() {
    var r = state.result;
    if (!r) { goHome(); return; }
    if (r.mode === "quick") {
      startQuick();
    } else if (r.mode === "category") {
      // перезапуск по той же категории — найдём её из перового perCategory
      var firstCat = r.perCategory[0];
      if (firstCat) pickCategory(firstCat.category);
      else goHome();
    } else {
      startQuiz("quiz");
    }
  }

  function startQuick() {
    var picked = shuffle(state.questions).slice(0, Math.min(10, state.questions.length));
    startQuiz("quick", { questions: picked, title: "Быстрый режим", timedSeconds: 120 });
  }

  /** Работа над ошибками — пройти только те вопросы, на которые ответили неправильно */
  function startRetryWrong() {
    var r = state.result;
    if (!r || r.wrongQuestions.length === 0) { goHome(); return; }
    // Собираем полные объекты вопросов из state.questions по тексту вопроса
    var wrongTexts = {};
    r.wrongQuestions.forEach(function (w) { wrongTexts[w.question] = true; });
    var wrongQs = state.questions.filter(function (q) { return wrongTexts[q.question]; });
    if (wrongQs.length === 0) { goHome(); return; }
    startQuiz("quiz", { questions: wrongQs, title: "Работа над ошибками" });
  }

  /* ── Навигация ── */
  function goHome() {
    stopTimer();
    state.quiz = null;
    state.flash = null;
    state.result = null;
    state.view = "home";
    render();
  }

  /* ── Делегирование кликов ── */
  function on_click(e) {
    var t = e.target.closest("[data-action]");
    if (!t) return;
    var action = t.getAttribute("data-action");
    var idx;
    switch (action) {
      case "home": goHome(); break;
      case "exit": goHome(); break;
      case "cycle-theme": cycleTheme(); break;
      case "start-quiz": startQuiz("quiz"); break;
      case "start-flashcards": startFlashcards(); break;
      case "start-quick": startQuick(); break;
      case "start-categories": state.view = "categories"; render(); break;
      case "start-search": state.query = ""; state.view = "search"; render(); break;
      case "select":
        idx = parseInt(t.getAttribute("data-idx"), 10);
        handleSelect(idx); break;
      case "next": goNext(); break;
      case "finish-early": finishEarly(); break;
      case "flip": flipCard(); break;
      case "flash-next": flashNext(); break;
      case "flash-prev": flashPrev(); break;
      case "pick-category": pickCategory(t.getAttribute("data-cat")); break;
      case "search-clear": doSearch(""); break;
      case "restart": restart(); break;
      case "retry-wrong": startRetryWrong(); break;
      case "start-wrong-bank": startWrongBank(); break;
      case "dismiss-prompt": dismissPrompt(); break;
      case "toggle-kbd": toggleKbdOverlay(); break;
      case "close-kbd": toggleKbdOverlay(); break;
      case "share": shareResult(); break;
      case "noop": break;
    }
  }

  /* ── Поиск: ввод ── */
  function on_input(e) {
    var t = e.target;
    if (t && t.id === "search-input") {
      doSearch(t.value);
    }
  }

  /* ── Горячие клавиши (только десктоп) ── */
  function on_keydown(e) {
    // Keyboard hints overlay — works on all views, all devices with keyboard
    if (e.key === "?" || (e.key === "/" && e.shiftKey)) {
      e.preventDefault();
      toggleKbdOverlay();
      return;
    }
    if (e.key === "Escape" && state.kbdOverlayOpen) {
      e.preventDefault();
      toggleKbdOverlay();
      return;
    }
    if (!isDesktop()) return;
    var tag = (e.target.tagName || "").toUpperCase();
    if (tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable) return;
    var z = state.quiz;
    var f = state.flash;
    var key = e.key;
    if (state.view === "quiz" && z) {
      if (["1", "2", "3", "4"].indexOf(key) !== -1 && !z.revealed) {
        e.preventDefault();
        handleSelect(parseInt(key, 10) - 1);
      } else if ((key === "Enter" || key === " ") && z.revealed) {
        e.preventDefault();
        goNext();
      } else if (key === "Escape") {
        goHome();
      }
    } else if (state.view === "flashcards" && f) {
      if (key === "Enter" || key === " ") { e.preventDefault(); flipCard(); }
      else if (key === "ArrowRight") { flashNext(); }
      else if (key === "ArrowLeft") { flashPrev(); }
      else if (key === "Escape") { goHome(); }
    } else if (state.view === "results") {
      if (key === "Escape") { goHome(); }
    } else if (state.view === "home") {
      if (key === "Escape") { /* ничего */ }
    }
  }

  /** Toggle keyboard hints overlay */
  function toggleKbdOverlay() {
    state.kbdOverlayOpen = !state.kbdOverlayOpen;
    var existing = $("#kbd-overlay");
    if (state.kbdOverlayOpen) {
      if (!existing) {
        var el = document.createElement("div");
        el.id = "kbd-overlay";
        el.className = "kbd-overlay";
        el.innerHTML = renderKbdOverlay();
        el.addEventListener("click", function (ev) {
          if (ev.target === el || ev.target.closest("[data-action='close-kbd']")) {
            toggleKbdOverlay();
          }
        });
        document.body.appendChild(el);
      }
      existing = $("#kbd-overlay");
      if (existing) existing.hidden = false;
    } else {
      if (existing) existing.hidden = true;
    }
  }

  function renderKbdOverlay() {
    var rows = [
      { label: "Выбрать ответ 1–4", keys: ["1", "2", "3", "4"] },
      { label: "Следующий вопрос", keys: ["Enter"] },
      { label: "Перевернуть карточку", keys: ["Enter", "Space"] },
      { label: "Следующая / предыдущая карточка", keys: ["→", "←"] },
      { label: "Выйти на главную", keys: ["Esc"] },
      { label: "Показать / скрыть подсказки", keys: ["?"] }
    ];
    var rowsHtml = rows.map(function (r) {
      var keysHtml = r.keys.map(function (k) {
        return '<span class="kbd-key">' + esc(k) + '</span>';
      }).join("");
      return '<div class="kbd-row"><span class="kbd-label">' + esc(r.label) + '</span><span class="kbd-keys">' + keysHtml + '</span></div>';
    }).join("");
    return '<div class="kbd-dialog">' +
      '<h2>Горячие клавиши</h2>' +
      '<p class="kbd-sub">Доступно только на устройствах с клавиатурой.</p>' +
      '<div class="kbd-list">' + rowsHtml + '</div>' +
    '</div>';
  }

  /* ── Свайпы (мобилы) ── */
  var touchStartX = null, touchEndX = null;
  function on_touchstart(e) {
    if (state.view !== "quiz" && state.view !== "flashcards") return;
    touchEndX = null;
    touchStartX = e.touches[0].clientX;
  }
  function on_touchmove(e) {
    if (state.view !== "quiz" && state.view !== "flashcards") return;
    touchEndX = e.touches[0].clientX;
  }
  function on_touchend() {
    if (touchStartX === null || touchEndX === null) return;
    var dist = touchStartX - touchEndX;
    var threshold = 50;
    if (state.view === "quiz" && state.quiz) {
      if (dist > threshold && state.quiz.revealed) goNext();
    } else if (state.view === "flashcards" && state.flash) {
      if (dist > threshold) flashNext();
      else if (dist < -threshold) flashPrev();
    }
    touchStartX = null; touchEndX = null;
  }

  /* ── Системная тема — следим ── */
  function watchSystemTheme() {
    try {
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      var fn = function () { if (state.theme === "system") { applyTheme(); renderTopbarTheme(); } };
      if (mq.addEventListener) mq.addEventListener("change", fn);
      else if (mq.addListener) mq.addListener(fn);
    } catch (e) {}
  }

  /* ── Init ── */
  function init() {
    setupTheme();
    state.stats = loadStats();
    document.addEventListener("click", on_click);
    document.addEventListener("input", on_input);
    document.addEventListener("keydown", on_keydown);
    document.addEventListener("touchstart", on_touchstart, { passive: true });
    document.addEventListener("touchmove", on_touchmove, { passive: true });
    document.addEventListener("touchend", on_touchend, { passive: true });
    watchSystemTheme();
    loadQuestions(function () {
      if (state.view === "error") { render(); return; }
      state.view = "home";
      render();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
