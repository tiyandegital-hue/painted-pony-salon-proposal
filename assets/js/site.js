/* Painted Pony Salon — interactions: nav, reveals, quiz, accordions, demo forms.
   Progressive enhancement: content is fully readable with JS disabled. */
(function () {
  "use strict";
  document.documentElement.classList.add("js");
  var BIZ = window.BUSINESS || { name: "Painted Pony Salon" };

  /* Hydrate [data-biz] spots from the single constant */
  document.querySelectorAll("[data-biz]").forEach(function (el) {
    var key = el.getAttribute("data-biz");
    if (BIZ[key]) el.textContent = BIZ[key];
  });

  /* ---- Mobile nav (state machine: closed <-> open) ---- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ---- Reveal on scroll (entrance order handled by .d1–.d5 delays) ---- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = document.querySelectorAll(".rv");
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---- Signature: The Chair Quiz (3 steps → recommendation) ---- */
  var quiz = document.getElementById("chair-quiz");
  if (quiz) {
    var steps = Array.prototype.slice.call(quiz.querySelectorAll(".quiz-step"));
    var dots = Array.prototype.slice.call(quiz.querySelectorAll(".quiz-progress i"));
    var state = {};
    function show(n) {
      steps.forEach(function (s, i) { s.classList.toggle("active", i === n); });
      dots.forEach(function (d, i) { d.classList.toggle("on", i <= n); });
    }
    quiz.addEventListener("click", function (e) {
      var opt = e.target.closest("[data-q][data-a]");
      if (opt) {
        state[opt.getAttribute("data-q")] = opt.getAttribute("data-a");
        show(Math.min(steps.indexOf(opt.closest(".quiz-step")) + 1, steps.length - 1));
        renderResult();
        return;
      }
      var back = e.target.closest("[data-back]");
      if (back) show(parseInt(back.getAttribute("data-back"), 10));
      var restart = e.target.closest("[data-restart]");
      if (restart) { state = {}; show(0); }
    });
    function pick() {
      /* Simple, honest decision logic over the SAMPLE menu */
      var t = state.time, v = state.vibe, m = state.maint;
      if (v === "color") {
        if (m === "low") return ["Root Melt + Gloss", "Dimensional color that grows out softly — no harsh line, fewer touch-ups.", "from $95 · ~2 hrs"];
        return ["Signature Balayage", "Hand-painted lightness with a lived-in finish.", "from $165 · ~3 hrs"];
      }
      if (v === "event") return ["Occasion Styling", "Updos and polished styling for weddings and big nights.", "from $65 · ~1 hr"];
      if (t === "quick") return ["The Pony Refresh", "Blowout + shape-up for when you need to look done, fast.", "from $45 · 45 min"];
      return ["Precision Cut", "A cut designed around your hair's natural fall and your routine.", "from $55 · 1 hr"];
    }
    function renderResult() {
      var box = quiz.querySelector("[data-result]");
      if (!box || state.time === undefined || state.vibe === undefined || state.maint === undefined) return;
      var r = pick();
      box.querySelector(".svc").textContent = r[0];
      box.querySelector(".why").textContent = r[1];
      box.querySelector("[data-price]").textContent = r[2];
      box.querySelector("[data-book]").textContent = "Book " + r[0];
    }
    show(0);
  }

  /* ---- Accordions (services page) ---- */
  document.querySelectorAll("[data-acc]").forEach(function (acc) {
    var btn = acc.querySelector("[data-acc-btn]");
    var panel = acc.querySelector("[data-acc-panel]");
    if (!btn || !panel) return;
    btn.addEventListener("click", function () {
      var open = acc.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      panel.hidden = !open;
    });
  });

  /* ---- Gallery filter ---- */
  var filters = document.querySelectorAll("[data-filter]");
  if (filters.length) {
    filters.forEach(function (f) {
      f.addEventListener("click", function () {
        filters.forEach(function (x) { x.classList.remove("active"); x.setAttribute("aria-pressed", "false"); });
        f.classList.add("active");
        f.setAttribute("aria-pressed", "true");
        var cat = f.getAttribute("data-filter");
        document.querySelectorAll(".g-item").forEach(function (it) {
          var showIt = cat === "all" || it.getAttribute("data-cat") === cat;
          it.style.display = showIt ? "" : "none";
        });
      });
    });
  }

  /* ---- Demo forms: honest, validated, goes nowhere ---- */
  document.querySelectorAll("form[data-demo]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (field) {
        var wrap = field.closest(".field") || field.closest(".consent");
        var bad = !field.value.trim() ||
          (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) ||
          (field.type === "checkbox" && !field.checked);
        if (wrap) wrap.classList.toggle("invalid", bad);
        if (bad) {
          ok = false;
          field.setAttribute("aria-invalid", "true");
        } else field.removeAttribute("aria-invalid");
      });
      if (!ok) {
        var first = form.querySelector(".field.invalid input, .field.invalid select, .field.invalid textarea, .consent.invalid input");
        if (first) first.focus();
        return;
      }
      form.hidden = true;
      var done = document.getElementById(form.getAttribute("data-demo"));
      if (done) {
        done.classList.add("show");
        done.querySelector("[data-name]").textContent =
          (form.querySelector('[name="name"]') || {}).value || "there";
      }
    });
    /* live-clear errors */
    form.addEventListener("input", function (e) {
      var wrap = e.target.closest(".field");
      if (wrap) wrap.classList.remove("invalid");
    });
  });

  /* ---- Footer year ---- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
