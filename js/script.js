(function(){
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var chapters = Array.from(document.querySelectorAll('.chapter'));
  var fill = document.getElementById('timelineFill');
  var marker = document.getElementById('timelineMarker');
  var label = document.getElementById('timelineLabel');
  var narrative = chapters.filter(function(c){ return c.dataset.chapterLabel; });
  var ticking = false;

  function updateChapter(chapter){
    var layers = Array.from(chapter.querySelectorAll('.layer'));
    if(!layers.length) return;
    var rect = chapter.getBoundingClientRect();
    var total = Math.max(1, rect.height - window.innerHeight);
    var progress = Math.min(1, Math.max(0, -rect.top / total));
    var active = Math.min(layers.length - 1, Math.floor(progress * layers.length));
    chapter.classList.toggle('is-active', rect.top < window.innerHeight * .9 && rect.bottom > window.innerHeight * .1);
    chapter.style.setProperty('--chapter-progress', progress.toFixed(3));
    layers.forEach(function(layer,i){ layer.classList.toggle('is-visible', i === active); });
  }

  function updateTimeline(){
    var doc = document.documentElement;
    var max = Math.max(1, doc.scrollHeight - window.innerHeight);
    var pct = Math.min(1, Math.max(0, window.scrollY / max));
    if(fill) fill.style.height = (pct*100)+'%';
    if(marker) marker.style.top = (pct*100)+'%';
    if(label) label.style.top = (pct*100)+'%';
    var current = narrative[0];
    narrative.forEach(function(chapter){
      if(chapter.getBoundingClientRect().top < window.innerHeight*.58) current = chapter;
    });
    if(label && current) label.textContent = current.dataset.chapterLabel;
  }

  function update(){
    chapters.forEach(updateChapter);
    updateTimeline();
    ticking = false;
  }
  function requestUpdate(){
    if(ticking) return;
    ticking = true;
    if(reduceMotion) update(); else requestAnimationFrame(update);
  }

  window.addEventListener('scroll', requestUpdate, {passive:true});
  window.addEventListener('resize', requestUpdate);
  window.addEventListener('load', requestUpdate);
  requestUpdate();
})();