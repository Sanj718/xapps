/**
 * Site-wide day/night theme toggle. Persists preference in localStorage.
 */
(function () {
  var root = document.documentElement;
  var toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  function isNight() {
    return root.getAttribute('data-theme') === 'night';
  }

  function setTheme(night) {
    root.setAttribute('data-theme', night ? 'night' : 'day');
    localStorage.setItem('theme', night ? 'night' : 'day');
    toggle.textContent = night ? '\u263C' : '\u263E';
    toggle.title = night ? 'Switch to day mode' : 'Switch to night mode';
    toggle.setAttribute('aria-label', toggle.title);
  }

  toggle.addEventListener('click', function () {
    setTheme(!isNight());
  });

  setTheme(isNight());
})();
