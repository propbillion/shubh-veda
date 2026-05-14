/* ============================================
   SHUBH VEDA — Interactions
   ============================================ */

(function () {
  'use strict';

  // ---------- Reveal on Scroll ----------
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  document
    .querySelectorAll('.reveal, .hero-img')
    .forEach((el) => revealObserver.observe(el));

  // ---------- Pre-Register Form → WhatsApp ----------
  const form = document.getElementById('preForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameEl = document.getElementById('f_name');
      const codeEl = document.getElementById('f_code');
      const mobEl = document.getElementById('f_mob');

      const name = encodeURIComponent((nameEl.value || 'Prospect').trim());
      const code = encodeURIComponent((codeEl.value || '+91').trim());
      const mob = encodeURIComponent((mobEl.value || '').trim());

      if (!mob || mob.length < 10) {
        mobEl.focus();
        mobEl.style.borderBottomColor = '#ff6b6b';
        return;
      }

      const message =
        `Hi%2C+I+want+to+pre-register+for+Shubh+Veda.%0A` +
        `Name%3A+${name}%0A` +
        `Mobile%3A+${code}+${mob}`;

      window.open(`https://wa.me/918857090799?text=${message}`, '_blank');
    });
  }

  // ---------- Sticky Bar Offset ----------
  document.body.style.paddingBottom = '64px';

  // ---------- Smooth Scroll for Nav Links ----------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
