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
              a.classList.toggle("is-active", a.getAttribute("href") === "#" + id);
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- Årstal i footeren ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
