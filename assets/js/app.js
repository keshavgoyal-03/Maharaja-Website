/* Maharaja Readymade — core site behaviour
   Part of the site's plain-JavaScript bundle; no build step, no dependencies. */

/* LOADING SCREEN */
window.addEventListener('load', function() {
  setTimeout(function() {
    document.getElementById('loading-screen').classList.add('hidden');
  }, 2800);
});

/* The old global particle canvas lived here. It sat behind every tab's
   opaque video background, so it was never actually visible while still
   animating 50 particles every frame. The per-tab 3D canvases above
   replaced it and render in a layer the viewer can actually see. */

/* TAB SWITCHING */
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(function(t) { t.classList.remove('active'); });
  document.querySelectorAll('.sidebar-nav-item').forEach(function(n) { n.classList.remove('active'); });
  var tab = document.getElementById('tab-' + tabId);
  if (tab) tab.classList.add('active');
  var nav = document.querySelector('.sidebar-nav-item[data-tab="' + tabId + '"]');
  if (nav) nav.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (window.innerWidth <= 768) toggleMobileMenu();
  /* the newly-shown tab was display:none until now, so its 3D canvas has no size yet */
  if (window.resizeTabCanvases) window.resizeTabCanvases();
  /* autoplay can get suspended on hidden <video>; nudge the active one back to life */
  if (tab) {
    var vid = tab.querySelector('video.video-bg');
    if (vid && vid.paused) { var pr = vid.play(); if (pr && pr.catch) pr.catch(function(){}); }
  }
  if (tabId === 'home' || tabId === 'story') setTimeout(startCounters, 500);
  if (tabId === 'reviews') renderReviews();
}

/* MOBILE MENU */
function toggleMobileMenu() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebar-overlay').classList.toggle('active');
  document.getElementById('hamburger').classList.toggle('active');
}

/* SCROLL REVEAL */
var revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) { if (entry.isIntersecting) entry.target.classList.add('revealed'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(function(el) { revealObserver.observe(el); });
var timelineObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) { if (entry.isIntersecting) entry.target.classList.add('revealed'); });
}, { threshold: 0.2 });
document.querySelectorAll('.timeline-item').forEach(function(el) { timelineObserver.observe(el); });

/* ANIMATED COUNTERS */
function startCounters() {
  document.querySelectorAll('.hero-stat-number[data-count]').forEach(function(el) {
    var target = parseInt(el.dataset.count);
    var duration = 2000; var start = performance.now();
    function update(now) {
      var elapsed = now - start; var progress = Math.min(elapsed / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3); var current = Math.floor(ease * target);
      el.textContent = current.toLocaleString() + '+';
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}
setTimeout(startCounters, 3000);

/* 3D CARD TILT (bends toward the cursor on hover) */
function initCard3DTilt(cards) {
  cards.forEach(function(card) {
    if (card.dataset.tiltBound) return;
    card.dataset.tiltBound = 'true';
    card.addEventListener('mousemove', function(e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left; var y = e.clientY - rect.top;
      var cx = rect.width / 2; var cy = rect.height / 2;
      var rx = (y - cy) / 12; var ry = (cx - x) / 12;
      card.style.transform = 'perspective(1000px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateZ(20px)';
    });
    card.addEventListener('mouseleave', function() { card.style.transform = ''; });
  });
}
/* Contact cards are deliberately excluded — they use a gentle CSS zoom instead,
   since a cursor tilt on that much text was too busy to read comfortably. */
initCard3DTilt(Array.prototype.slice.call(
  document.querySelectorAll('.card-3d, .photo-item')
));
/* PARALLAX */
window.addEventListener('scroll', function() {
  var scrolled = window.pageYOffset;
  document.querySelectorAll('.parallax-bg').forEach(function(el) {
    var speed = el.dataset.speed || 0.3;
    el.style.transform = 'translateY(' + (scrolled * speed) + 'px)';
  });
});

/* CLONE COMPANY LOGO into Brands showcase + footer (reuses the sidebar logo's data URI) */
(function() {
  var sourceLogo = document.querySelector('.sidebar-logo');
  if (!sourceLogo) return;
  document.querySelectorAll('.logo-clone').forEach(function(el) { el.src = sourceLogo.src; });
})();

/*
  REAL STORE PHOTOS: drop image files into assets/img/store/
  and add their filenames here — they'll appear at the front of the Gallery tab automatically.
  Example: var localGalleryPhotos = [ { file: "store-front.jpg", caption: "Store Front" } ];
*/
var localGalleryPhotos = [];
if (localGalleryPhotos.length) {
  var grid = document.getElementById('photos-grid');
  localGalleryPhotos.slice().reverse().forEach(function(p) {
    var div = document.createElement('div');
    div.className = 'photo-item reveal revealed';
    div.innerHTML = '<img src="Photos/' + encodeURIComponent(p.file) + '" alt="' + p.caption + '">' +
      '<div class="photo-overlay"><span class="photo-overlay-text">' + p.caption + '</span></div>';
    grid.insertBefore(div, grid.firstChild);
  });
}

/* PHOTO GALLERY LIGHTBOX
   Delegated from the document so it covers every grid (authentic + stock)
   and any photos injected later from the /Photos folder. */
document.addEventListener('click', function(e) {
  var item = e.target.closest('.photo-item');
  if (!item) return;
  var lbImg = document.getElementById('lightbox-img');
  var lbVid = document.getElementById('lightbox-video');
  var caption = item.querySelector('.photo-overlay-text');
  var label = '';

  if (item.dataset.video) {
    /* store-footage tile — open the clip full size, with sound available */
    lbImg.style.display = 'none';
    lbImg.removeAttribute('src');
    lbVid.style.display = '';
    lbVid.src = item.dataset.video;
    lbVid.muted = false;
    var p = lbVid.play(); if (p && p.catch) p.catch(function(){});
    label = caption ? caption.textContent : 'Maharaja Readymade';
  } else {
    var img = item.querySelector('img');
    if (!img) return;
    lbVid.pause();
    lbVid.removeAttribute('src');
    lbVid.style.display = 'none';
    lbImg.style.display = '';
    lbImg.src = img.src.replace('w=600', 'w=1600');
    lbImg.alt = img.alt;
    label = caption ? caption.textContent : img.alt;
  }
  document.getElementById('lightbox-caption').textContent = label;
  document.getElementById('lightbox-overlay').classList.add('active');
});
function dismissLightbox() {
  document.getElementById('lightbox-overlay').classList.remove('active');
  /* stop the clip so audio doesn't keep playing behind a closed lightbox */
  var lbVid = document.getElementById('lightbox-video');
  if (lbVid) { lbVid.pause(); lbVid.muted = true; }
}
function closeLightbox(e) {
  /* clicks on the video itself (play, scrub, volume) must not close the lightbox */
  if (e.target.id === 'lightbox-video') return;
  if (e.target.id === 'lightbox-overlay' || e.target.closest('.lightbox-close')) {
    dismissLightbox();
  }
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') dismissLightbox();
});

/* ============================================================
   DEVICE ADAPTATION
   Runs once at startup, before the browser has committed to
   downloading any background video.
   ============================================================ */
function adaptMediaToDevice() {
  var isPhone   = window.matchMedia('(max-width: 640px)').matches;
  var saveData  = !!(navigator.connection && navigator.connection.saveData);
  var lightMode = isPhone || saveData;

  document.querySelectorAll('video.video-bg').forEach(function (v) {
    if (lightMode) {
      /* Phones get the poster still instead of a multi-megabyte background
         clip. The <source> children are emptied so nothing is fetched. */
      var holder = v.closest('.video-bg-container');
      if (holder && v.poster) {
        holder.style.backgroundImage = 'url("' + v.poster + '")';
        holder.classList.add('video-bg-static');
      }
      v.removeAttribute('autoplay');
      try { v.pause(); } catch (e) {}
      v.querySelectorAll('source').forEach(function (s) { s.removeAttribute('src'); });
      v.removeAttribute('src');
      try { v.load(); } catch (e) {}
      v.style.display = 'none';
      return;
    }

    /* Desktop and tablet: choose the master or the light encode by width.
       Only the home hero ships both; the rest keep their single <source>. */
    if (v.dataset.srcLg || v.dataset.srcSm) {
      var wide = window.innerWidth >= 900;
      var url  = (wide ? v.dataset.srcLg : v.dataset.srcSm) || v.dataset.srcLg || v.dataset.srcSm;
      if (url && !v.querySelector('source')) {
        var s = document.createElement('source');
        s.src = url; s.type = 'video/mp4';
        v.appendChild(s);
        try { v.load(); } catch (e) {}
        var p = v.play(); if (p && p.catch) p.catch(function () {});
      }
    }
  });
}
adaptMediaToDevice();

/* Flip cards are hover-driven, which touch screens never trigger — without
   this the brand descriptions on the back would be unreachable on a phone. */
(function () {
  if (!window.matchMedia('(hover: none)').matches) return;
  document.querySelectorAll('.flip-card').forEach(function (card) {
    card.addEventListener('click', function () {
      var wasOpen = card.classList.contains('flipped');
      document.querySelectorAll('.flip-card.flipped').forEach(function (c) { c.classList.remove('flipped'); });
      if (!wasOpen) card.classList.add('flipped');
    });
  });
})();

/* INIT */
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(startCounters, 3000);
  setTimeout(renderReviews, 500);
});