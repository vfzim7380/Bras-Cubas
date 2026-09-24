(function(){
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- motor de capítulos: fade/translate por "step" ---------- */
  var chapters = Array.from(document.querySelectorAll('.chapter'));

  chapters.forEach(function(chapter){
    var layers = Array.from(chapter.querySelectorAll('.layer'));
    if(!layers.length) return;

    // Cada layer ocupa uma fatia igual da altura do capítulo.
    var n = layers.length;

    function onScroll(){
      var rect = chapter.getBoundingClientRect();
      var total = rect.height - window.innerHeight;
      if(total <= 0){ return; }
      var progress = Math.min(1, Math.max(0, -rect.top / total));

      chapter.classList.toggle('is-active', rect.top < window.innerHeight * 0.9 && rect.bottom > window.innerHeight * 0.1);

      var activeStep = Math.min(n - 1, Math.floor(progress * n));
      layers.forEach(function(layer, i){
        layer.classList.toggle('is-visible', i === activeStep);
      });
    }

    chapter.__onScroll = onScroll;
  });

  var ticking = false;
  function handleScroll(){
    if(ticking) return;
    ticking = true;
    requestAnimationFrame(function(){
      chapters.forEach(function(c){ c.__onScroll(); });
      updateTimeline();
      ticking = false;
    });
  }

  /* ---------- timeline lateral ---------- */
  var fill = document.getElementById('timelineFill');
  var marker = document.getElementById('timelineMarker');
  var label = document.getElementById('timelineLabel');
  var narrative = chapters.filter(function(c){ return c.dataset.chapterLabel; });

  function updateTimeline(){
    var doc = document.documentElement;
    var scrollTop = window.scrollY;
    var max = doc.scrollHeight - window.innerHeight;
    var pct = max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0;

    fill.style.height = (pct * 100) + '%';
    marker.style.top = (pct * 100) + '%';
    label.style.top = (pct * 100) + '%';

    var current = narrative[0];
    for(var i = 0; i < narrative.length; i++){
      var r = narrative[i].getBoundingClientRect();
      if(r.top < window.innerHeight * 0.6){ current = narrative[i]; }
    }
    if(current){ label.textContent = current.dataset.chapterLabel; }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll);
  handleScroll();
})();
