/* ============================================================
   quiz.js — Quiz "Memórias Póstumas de Brás Cubas"
   Roda 100% no navegador (HTML + CSS + JS), sem servidor.

   PARA EDITAR AS PERGUNTAS: mexa apenas no array QUESTIONS abaixo.
     type:    'single'    → uma alternativa correta
              'truefalse' → Verdadeiro / Falso
              'multiple'  → várias corretas (o aluno marca e confirma)
     correct: lista com os ÍNDICES das opções corretas (0 = A, 1 = B ...)
     chapter: capítulo do site onde o tema aparece (usado no link "Rever no site")
   ============================================================ */
(function () {
  'use strict';

  var QUESTIONS = [
    {
      type: 'single',
      text: 'Como começa a narrativa de Memórias Póstumas de Brás Cubas?',
      options: [
        'Brás Cubas está viajando pela Europa.',
        'Brás Cubas já está morto e começa a contar sua história.',
        'Brás Cubas está se casando com Virgília.',
        'Brás Cubas está desenvolvendo o Emplasto.'
      ],
      correct: [1],
      chapter: { id: 'cap01', label: 'Capítulo 01 · A Morte' }
    },
    {
      type: 'single',
      text: 'Quem era Prudêncio na infância de Brás Cubas?',
      options: [
        'Um amigo da família Cubas.',
        'Um professor contratado pelo pai de Brás Cubas.',
        'Um menino escravizado que Brás Cubas usava como se fosse um cavalo.',
        'Um político que Brás Cubas conheceu na vida adulta.'
      ],
      correct: [2],
      chapter: { id: 'cap04', label: 'Capítulo 04 · Infância' }
    },
    {
      type: 'truefalse',
      text: 'Marcela amou Brás Cubas durante quinze meses e onze contos de réis.',
      options: ['Verdadeiro', 'Falso'],
      correct: [0],
      chapter: { id: 'cap05', label: 'Capítulo 05 · Marcela' }
    },
    {
      type: 'single',
      text: 'Por que Brás Cubas foi mandado para a Europa?',
      options: [
        'Para se tornar diplomata.',
        'Para iniciar uma carreira militar.',
        'Para completar sua educação e se afastar de Marcela.',
        'Para procurar Virgília.'
      ],
      correct: [2],
      chapter: { id: 'cap06', label: 'Capítulo 06 · Europa' }
    },
    {
      type: 'single',
      text: 'Com quem Virgília escolheu se casar?',
      options: ['Quincas Borba.', 'Lobo Neves.', 'Damião Cubas.', 'Prudêncio.'],
      correct: [1],
      chapter: { id: 'cap07', label: 'Capítulo 07 · Virgília' }
    },
    {
      type: 'multiple',
      text: 'Quais são temas importantes da obra?',
      options: ['Ironia', 'Vaidade', 'Crítica à elite', 'Idealização da sociedade'],
      correct: [0, 1, 2],
      chapter: { id: 'cap11', label: 'Capítulo 11 · O Que Ficou' }
    },
    {
      type: 'truefalse',
      text: 'O Humanitismo é uma filosofia criada por Quincas Borba.',
      options: ['Verdadeiro', 'Falso'],
      correct: [0],
      chapter: { id: 'cap08', label: 'Capítulo 08 · Quincas Borba' }
    },
    {
      type: 'single',
      text: 'Qual era a finalidade do Emplasto Brás Cubas?',
      options: [
        'Combater a melancolia e levar o nome de Brás Cubas à posteridade.',
        'Tratar exclusivamente doenças respiratórias.',
        'Ajudar Quincas Borba a desenvolver o Humanitismo.',
        'Curar Prudêncio dos efeitos da escravidão.'
      ],
      correct: [0],
      chapter: { id: 'cap09', label: 'Capítulo 09 · O Emplasto' }
    },
    {
      type: 'single',
      text: 'Segundo o site, como Brás Cubas morreu?',
      options: [
        'Aos 50 anos, vítima de uma febre.',
        'Aos 64 anos, vítima de pneumonia.',
        'Aos 64 anos, em um acidente durante uma viagem.',
        'Aos 70 anos, após concluir o Emplasto.'
      ],
      correct: [1],
      chapter: { id: 'cap10', label: 'Capítulo 10 · A Morte' }
    },
    {
      type: 'single',
      text: 'Qual interpretação o site apresenta para a cena em que Brás Cubas usa Prudêncio como um cavalo?',
      options: [
        'Uma demonstração da educação exemplar de Brás Cubas.',
        'Uma crítica à reprodução da violência dentro do sistema escravista.',
        'Uma prova da amizade entre Brás Cubas e Prudêncio.',
        'Uma lembrança sem importância para a crítica social do romance.'
      ],
      correct: [1],
      chapter: { id: 'cap04', label: 'Capítulo 04 · Infância' }
    }
  ];

  /* Mensagens do resultado (do maior para o menor número de acertos) */
  var RESULT_MESSAGES = [
    { min: 9, title: 'Excelente!',
      text: 'Nem a morte apagou essas memórias: você conhece muito bem a obra.' },
    { min: 7, title: 'Muito bom!',
      text: 'Você compreendeu grande parte da obra. Só faltaram alguns detalhes.' },
    { min: 5, title: 'Bom começo!',
      text: 'Vale revisar alguns pontos da história e tentar de novo.' },
    { min: 0, title: 'Ainda há memórias a recuperar.',
      text: 'Volte ao site, percorra a história com calma e refaça o quiz.' }
  ];

  var HINTS = {
    single: 'escolha uma alternativa',
    truefalse: 'verdadeiro ou falso',
    multiple: 'marque todas as alternativas corretas'
  };

  /* ---------- elementos ---------- */
  function $(id) { return document.getElementById(id); }
  var el = {
    intro: $('screenIntro'), question: $('screenQuestion'), result: $('screenResult'),
    start: $('startBtn'), ghost: $('quizGhost'),
    progressText: $('progressText'), progressTrack: $('progressTrack'), progressFill: $('progressFill'),
    hint: $('questionHint'), qText: $('quizQuestion'), options: $('options'),
    feedback: $('feedback'), action: $('actionBtn'),
    scoreBig: $('scoreBig'), hits: $('statHits'), misses: $('statMisses'), percent: $('statPercent'),
    resultTitle: $('resultTitle'), resultText: $('resultText'), dots: $('resultDots'),
    restart: $('restartBtn')
  };
  if (!el.start || !el.options) return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- estado ---------- */
  var state = { index: 0, results: [], locked: false, selected: [] };

  /* ---------- utilidades ---------- */
  function letter(i) { return String.fromCharCode(65 + i); }
  function pad(n) { return n < 10 ? '0' + n : String(n); }
  function listLetters(arr) {
    var l = arr.map(letter);
    if (l.length <= 1) return l.join('');
    return l.slice(0, -1).join(', ') + ' e ' + l[l.length - 1];
  }
  function sameSet(a, b) {
    if (a.length !== b.length) return false;
    return a.every(function (x) { return b.indexOf(x) !== -1; });
  }
  function show(screen) {
    [el.intro, el.question, el.result].forEach(function (s) { s.hidden = (s !== screen); });
    window.scrollTo(0, 0);
  }
  function makeEl(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* ---------- fluxo ---------- */
  function startQuiz() {
    state.index = 0; state.results = []; state.locked = false; state.selected = [];
    showQuestion();
  }

  function showQuestion() {
    var q = QUESTIONS[state.index];
    var total = QUESTIONS.length;
    state.locked = false; state.selected = [];

    show(el.question);
    el.progressText.textContent = 'Pergunta ' + (state.index + 1) + ' de ' + total;
    updateProgress(state.index);
    el.ghost.textContent = pad(state.index + 1);
    el.hint.textContent = HINTS[q.type];
    el.qText.textContent = q.text;

    el.options.textContent = '';
    el.options.className = 'quiz-options' + (q.type === 'truefalse' ? ' quiz-options--tf' : '');
    q.options.forEach(function (label, i) {
      var b = makeEl('button', 'quiz-option');
      b.type = 'button';
      b.dataset.index = i;
      b.style.setProperty('--i', i);
      if (q.type === 'multiple') b.setAttribute('aria-pressed', 'false');
      if (q.type !== 'truefalse') b.appendChild(makeEl('span', 'quiz-option__key', letter(i)));
      b.appendChild(makeEl('span', 'quiz-option__label', label));
      b.appendChild(makeEl('span', 'visually-hidden quiz-option__status'));
      b.addEventListener('click', function () { onOptionClick(i); });
      el.options.appendChild(b);
    });

    el.feedback.hidden = true;
    el.feedback.textContent = '';
    el.feedback.className = 'quiz-feedback';

    setAction(q.type === 'multiple' ? 'Confirmar resposta' : 'Próxima pergunta', true, 'idle');
    el.qText.focus({ preventScroll: true });
  }

  function updateProgress(done) {
    var total = QUESTIONS.length;
    el.progressFill.style.transform = 'scaleX(' + (done / total) + ')';
    el.progressTrack.setAttribute('aria-valuenow', String(done));
  }

  /* estados do botão principal: idle (aguardando resposta) | confirm | next */
  function setAction(label, disabled, mode) {
    el.action.textContent = label;
    el.action.disabled = disabled;
    el.action.dataset.mode = mode;
  }

  function onOptionClick(i) {
    if (state.locked) return;                       // impede responder duas vezes
    var q = QUESTIONS[state.index];
    if (q.type === 'multiple') {
      var pos = state.selected.indexOf(i);
      if (pos === -1) state.selected.push(i); else state.selected.splice(pos, 1);
      var btn = el.options.children[i];
      var on = state.selected.indexOf(i) !== -1;
      btn.classList.toggle('is-selected', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      setAction('Confirmar resposta', state.selected.length === 0, 'confirm');
    } else {
      state.selected = [i];
      lockAndReveal();
    }
  }

  function lockAndReveal() {
    if (state.locked) return;
    state.locked = true;
    var q = QUESTIONS[state.index];
    var ok = sameSet(state.selected, q.correct);
    state.results[state.index] = ok;

    el.options.classList.add('is-locked');
    Array.prototype.forEach.call(el.options.children, function (btn, i) {
      var isCorrect = q.correct.indexOf(i) !== -1;
      var chosen = state.selected.indexOf(i) !== -1;
      var status = btn.querySelector('.quiz-option__status');
      btn.setAttribute('aria-disabled', 'true');
      btn.classList.remove('is-selected');
      if (isCorrect && chosen)       { btn.classList.add('is-correct'); status.textContent = ' — resposta correta'; }
      else if (isCorrect && !chosen) {
        // em questão de uma só resposta a certa aparece "cheia"; na múltipla, tracejada = faltou marcar
        btn.classList.add(q.type === 'multiple' ? 'is-missed' : 'is-correct');
        status.textContent = ' — era a resposta correta';
      }
      else if (!isCorrect && chosen) { btn.classList.add('is-wrong');   status.textContent = ' — resposta incorreta'; }
      else                           { btn.classList.add('is-dim'); }
      var key = btn.querySelector('.quiz-option__key');
      if (key && (isCorrect || chosen)) key.textContent = (isCorrect ? '✓' : '✕');
    });

    renderFeedback(q, ok);
    updateProgress(state.index + 1);

    var last = state.index === QUESTIONS.length - 1;
    setAction(last ? 'Ver resultado' : 'Próxima pergunta', false, 'next');
    el.action.focus({ preventScroll: true });
    el.action.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  function renderFeedback(q, ok) {
    var f = el.feedback;
    f.textContent = '';
    f.className = 'quiz-feedback ' + (ok ? 'is-correct' : 'is-wrong');
    f.appendChild(makeEl('strong', null, ok ? 'Correto.' : 'Não foi dessa vez.'));

    if (!ok) {
      var answer = q.type === 'truefalse'
        ? q.options[q.correct[0]]
        : (q.correct.length > 1 ? 'alternativas ' : 'alternativa ') + listLetters(q.correct);
      f.appendChild(document.createTextNode(' Resposta correta: ' + answer + '.'));

      var link = makeEl('a', 'quiz-feedback__link', 'Rever no site: ' + q.chapter.label);
      link.href = 'index.html#' + q.chapter.id;
      f.appendChild(document.createElement('br'));
      f.appendChild(link);
    }
    f.hidden = false;
  }

  function onAction() {
    var mode = el.action.dataset.mode;
    if (mode === 'confirm') { lockAndReveal(); return; }
    if (mode !== 'next') return;
    if (state.index < QUESTIONS.length - 1) { state.index++; showQuestion(); }
    else showResult();
  }

  function showResult() {
    var total = QUESTIONS.length;
    var hits = state.results.filter(Boolean).length;
    var misses = total - hits;
    var pct = Math.round(hits / total * 100);
    var msg = RESULT_MESSAGES.filter(function (m) { return hits >= m.min; })[0];

    show(el.result);
    el.scoreBig.textContent = hits + '/' + total;
    el.hits.textContent = hits;
    el.misses.textContent = misses;
    el.percent.textContent = pct + '%';
    el.resultTitle.textContent = msg.title;
    el.resultText.textContent = msg.text;
    el.ghost.textContent = pad(hits);

    el.dots.textContent = '';
    state.results.forEach(function (ok, i) {
      var li = makeEl('li', 'quiz-dots__item ' + (ok ? 'is-right' : 'is-wrong'));
      li.setAttribute('aria-label', 'Pergunta ' + (i + 1) + ': ' + (ok ? 'acertou' : 'errou'));
      li.textContent = ok ? '✓' : '✕';
      el.dots.appendChild(li);
    });
    el.resultTitle.focus({ preventScroll: true });
  }

  /* ---------- eventos ---------- */
  el.start.addEventListener('click', startQuiz);
  el.action.addEventListener('click', onAction);
  el.restart.addEventListener('click', startQuiz);
})();
