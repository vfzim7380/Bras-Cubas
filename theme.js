/* ============================================================
   theme.js — alternância entre modo escuro (padrão) e claro.
   Compartilhado por index.html e quiz.html.
   - Carregado no <head>, SEM defer, para aplicar o tema antes da
     primeira pintura (evita "flash" do tema errado ao recarregar).
   - Preferência salva em localStorage na chave "bc-theme".
   ============================================================ */
(function () {
  'use strict';
  var KEY = 'bc-theme';
  var root = document.documentElement;
  var COLORS = { dark: '#11100E', light: '#EFE7D6' };   // meta theme-color (barra do navegador no celular)

  function read() {
    try { var v = localStorage.getItem(KEY); return (v === 'light' || v === 'dark') ? v : null; }
    catch (e) { return null; }                           // localStorage bloqueado (modo privado etc.)
  }
  function write(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', COLORS[theme]);
  }

  apply(read() || 'dark');

  document.addEventListener('DOMContentLoaded', function () {
    var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-theme-toggle]'));

    function sync() {
      var light = root.getAttribute('data-theme') === 'light';
      buttons.forEach(function (btn) {
        btn.setAttribute('aria-pressed', light ? 'true' : 'false');
        var label = light ? 'Ativar modo escuro' : 'Ativar modo claro';
        btn.setAttribute('aria-label', label);
        btn.setAttribute('title', label);
      });
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        apply(next); write(next); sync();
      });
    });

    // mantém abas/páginas em sincronia (ex.: trocou o tema no quiz e voltou ao site)
    window.addEventListener('storage', function (e) {
      if (e.key === KEY && (e.newValue === 'light' || e.newValue === 'dark')) { apply(e.newValue); sync(); }
    });

    sync();
  });
})();
