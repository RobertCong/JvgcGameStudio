/* JVGC Studio · App
 *
 * Responsibilities:
 *   - Detect & persist language (en | zh)
 *   - Render Featured Game card and thumbnails
 *   - Apply i18n to [data-i18n] elements
 *   - Handle thumbnail clicks and language switch clicks
 *   - Fallback for missing icon images and missing appStoreUrl
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'jvgc-lang';
  var DEFAULT_LANG = 'en';

  var state = {
    lang: DEFAULT_LANG,
    activeIndex: 0
  };

  function safeGetLang() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'zh') return stored;
    } catch (e) { /* localStorage blocked, fall through */ }
    return DEFAULT_LANG;
  }

  function safeSetLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
  }

  function t(key) {
    var dict = (window.I18N && window.I18N[state.lang]) || {};
    return dict[key] || '';
  }

  /* SAFETY: innerHTML below is safe because all I18N values are hardcoded at build-time (assets/js/i18n.js); never accept user input here. */
  function applyI18n() {
    document.documentElement.setAttribute('lang', state.lang);
    document.title = t('meta.title');
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('meta.description'));
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      el.innerHTML = t(key);
    });
  }

  function setLang(lang) {
    if (lang !== 'en' && lang !== 'zh') return;
    state.lang = lang;
    safeSetLang(lang);
    document.querySelectorAll('.nav__lang-btn').forEach(function (btn) {
      var on = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    applyI18n();
    renderFeatured(state.activeIndex); /* defined in later task */
  }

  function renderFeatured(/* index */) {
    /* Implemented in Task 9 */
  }

  function renderThumbs() {
    /* Implemented in Task 10 */
  }

  function init() {
    state.lang = safeGetLang();
    applyI18n();
    document.querySelectorAll('.nav__lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLang(btn.getAttribute('data-lang'));
      });
    });
    /* The two below are no-ops until Tasks 9/10 implement them */
    renderThumbs();
    renderFeatured(state.activeIndex);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
