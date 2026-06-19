/* Optaget.dk — interaktivitet: sprog, tema, menu. Ingen afhængigheder. */
(function () {
  "use strict";

  var DICT = window.I18N || { da: {}, en: {} };
  var LANG_KEY = "optaget-lang";
  var THEME_KEY = "optaget-theme";
  var root = document.documentElement;

  /* ---------- Sprog ---------- */
  function t(lang, key) {
    return (DICT[lang] && DICT[lang][key]) || (DICT.da && DICT.da[key]) || "";
  }

  function applyLang(lang) {
    if (!DICT[lang]) lang = "da";
    root.setAttribute("lang", lang);

    document.title = t(lang, "meta.title");
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t(lang, "meta.desc"));
    var ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute("content", lang === "en" ? "en_GB" : "da_DK");

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var val = t(lang, el.getAttribute("data-i18n"));
      if (val) el.textContent = val;
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var val = t(lang, el.getAttribute("data-i18n-html"));
      if (val) el.innerHTML = val;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var val = t(lang, el.getAttribute("data-i18n-aria"));
      if (val) el.setAttribute("aria-label", val);
    });

    document.querySelectorAll("[data-lang-set]").forEach(function (btn) {
      var active = btn.getAttribute("data-lang-set") === lang;
      btn.setAttribute("aria-pressed", String(active));
      btn.classList.toggle("is-active", active);
    });

    renderNextDeadline(lang);
  }

  /* ---------- Nedtælling til næste ansøgningsfrist ---------- */
  // Faste frister (måned er 1-indekseret). Tjek altid optagelse.dk for året.
  var DEADLINES = [
    { key: "kvote2", month: 3, day: 15 },
    { key: "kvote1", month: 7, day: 5 }
  ];

  function nextDeadline() {
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var best = null;
    DEADLINES.forEach(function (d) {
      var date = new Date(today.getFullYear(), d.month - 1, d.day);
      if (date < today) date = new Date(today.getFullYear() + 1, d.month - 1, d.day);
      var days = Math.round((date - today) / 86400000);
      if (!best || days < best.days) best = { key: d.key, days: days };
    });
    return best;
  }

  function renderNextDeadline(lang) {
    var nd = nextDeadline();
    if (!nd) return;
    var what = t(lang, "nd." + nd.key);
    var tmpl =
      nd.days === 0 ? t(lang, "nd.today")
      : nd.days === 1 ? t(lang, "nd.day")
      : t(lang, "nd.days");
    var text = tmpl.replace("{n}", nd.days).replace("{what}", what);

    var chip = document.querySelector("[data-next-deadline]");
    if (chip) {
      var span = chip.querySelector("[data-nd-text]");
      if (span) span.textContent = text;
      chip.removeAttribute("hidden");
      chip.setAttribute("aria-label", text);
    }

    // Markér det matchende punkt i tidslinjen med en "Næste frist"-badge
    document.querySelectorAll("[data-deadline]").forEach(function (item) {
      var isNext = item.getAttribute("data-deadline") === nd.key;
      item.classList.toggle("is-next", isNext);
      var existing = item.querySelector(".nd-badge");
      if (isNext) {
        if (!existing) {
          existing = document.createElement("span");
          existing.className = "nd-badge";
          var h3 = item.querySelector(".timeline-body h3");
          if (h3) h3.appendChild(existing);
        }
        existing.textContent = t(lang, "nd.badge");
      } else if (existing) {
        existing.remove();
      }
    });
  }

  function setLang(lang, persist) {
    applyLang(lang);
    if (persist) {
      try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    }
  }

  document.querySelectorAll("[data-lang-set]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.getAttribute("data-lang-set"), true);
    });
  });

  // Indledende sprog (allerede sat på <html> af no-flash-scriptet)
  applyLang(root.getAttribute("lang") || "da");

  /* ---------- Tema ---------- */
  function setTheme(theme, persist) {
    root.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
    if (persist) {
      try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
    }
  }

  var themeBtn = document.querySelector("[data-theme-toggle]");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(next, true);
    });
  }

  // Følg systemet, så længe brugeren ikke selv har valgt
  var mq = window.matchMedia("(prefers-color-scheme: dark)");
  (mq.addEventListener ? mq.addEventListener.bind(mq, "change") : mq.addListener.bind(mq))(
    function (e) {
      var stored;
      try { stored = localStorage.getItem(THEME_KEY); } catch (err) {}
      if (!stored) setTheme(e.matches ? "dark" : "light", false);
    }
  );

  /* ---------- Mobilmenu ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var list = document.getElementById("nav-list");
  if (toggle && list) {
    toggle.addEventListener("click", function () {
      var open = list.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    list.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        list.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Aktiv sektion i navigationen ---------- */
  var links = Array.prototype.slice.call(
    document.querySelectorAll(".nav-list a[href^='#']")
  );
  var sections = links
    .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.id;
            links.forEach(function (a) {
              var active = a.getAttribute("href") === "#" + id;
              a.classList.toggle("is-active", active);
              if (active) a.setAttribute("aria-current", "true");
              else a.removeAttribute("aria-current");
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- Læse-progressbar ---------- */
  var bar = document.querySelector("[data-progress-bar]");
  if (bar) {
    var ticking = false;
    var updateBar = function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var ratio = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
      bar.style.transform = "scaleX(" + ratio + ")";
      ticking = false;
    };
    var onScroll = function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateBar);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateBar();
  }

  /* ---------- Print: fold alle FAQ ud, og luk dem igen bagefter ---------- */
  var reopened = [];
  window.addEventListener("beforeprint", function () {
    reopened = [];
    document.querySelectorAll("details:not([open])").forEach(function (d) {
      d.setAttribute("open", "");
      reopened.push(d);
    });
  });
  window.addEventListener("afterprint", function () {
    reopened.forEach(function (d) { d.removeAttribute("open"); });
    reopened = [];
  });

  /* ---------- Årstal i footeren ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
