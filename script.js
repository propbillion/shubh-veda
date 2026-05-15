/* ============================================
   SHUBH VEDA v2 — Production JS
   Performance-optimized, no framework dependencies
   ============================================ */

(function () {
  'use strict';

  // ---------- Reveal on Scroll (lightweight) ----------
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  // ---------- Header elevation on scroll ----------
  const header = document.querySelector('.header');
  if (header) {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 24) {
            header.style.boxShadow = '0 2px 18px -8px rgba(0,0,0,0.08)';
          } else {
            header.style.boxShadow = 'none';
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---------- Smooth Scroll for Hash Links ----------
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 116; // header + action bar
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ---------- Pre-Register Form ----------
  const form = document.getElementById('preForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameEl = document.getElementById('f_name');
      const mobEl = document.getElementById('f_mob');

      const name = (nameEl.value || '').trim();
      const mob = (mobEl.value || '').trim().replace(/\D/g, '');

      let ok = true;
      if (!name) {
        nameEl.style.borderBottomColor = '#a8444a';
        nameEl.focus();
        ok = false;
      } else {
        nameEl.style.borderBottomColor = '';
      }

      if (mob.length < 10) {
        mobEl.style.borderBottomColor = '#a8444a';
        if (ok) mobEl.focus();
        ok = false;
      } else {
        mobEl.style.borderBottomColor = '';
      }

      if (!ok) return;

      const message =
        'Hi%2C+I+want+to+pre-register+for+SHUBH+VEDA+and+claim+the+%E2%82%B91+Lakh+launch+discount.%0A%0A' +
        'Name%3A+' + encodeURIComponent(name) + '%0A' +
        'Mobile%3A+%2B91+' + encodeURIComponent(mob);

      window.open('https://wa.me/918857090799?text=' + message, '_blank');

      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        const original = btn.innerHTML;
        btn.innerHTML = 'Redirecting to WhatsApp...';
        btn.disabled = true;
        setTimeout(() => {
          btn.innerHTML = original;
          btn.disabled = false;
          form.reset();
        }, 2400);
      }
    });
  }

  // ---------- Lazy image fallback for older browsers ----------
  if (!('loading' in HTMLImageElement.prototype)) {
    const lazyImgs = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
      const imgIO = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) img.src = img.dataset.src;
            imgIO.unobserve(img);
          }
        });
      });
      lazyImgs.forEach((img) => imgIO.observe(img));
    }
  }

})();
