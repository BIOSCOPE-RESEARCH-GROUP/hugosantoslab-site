/* Santos Laboratory — interactive parts of the page.
   To edit content, change the data arrays below; no build step needed. */
(function () {
  'use strict';

  // ---------- DATA ----------
  var THEMES = [
    { tab: 'Uro-oncology', tag: 'Clinical proteomics', title: 'Following bladder and renal cancer through urine.',
      body: 'Label-free quantitative proteomics on urine and tissue from renal cell carcinoma and bladder cancer patients. Longitudinal sampling shows how pathways shift over the disease course and supports non-invasive follow-up.',
      keywords: ['label-free quantification', 'longitudinal urine', 'pathway analysis', 'T1 bladder cancer'],
      paper: 'Pathway-guided monitoring of the disease course in bladder cancer with longitudinal urine proteomics', venue: 'Communications Medicine, 2023' },
    { tab: 'Neuroproteomics', tag: 'Neurodegeneration', title: 'Protein signatures of neurodegeneration.',
      body: 'Quantitative MS workflows applied to neurodegenerative disease, connecting protein-level changes to the biological networks behind them.',
      keywords: ['quantitative MS', 'network biology', 'biomarker discovery'],
      paper: 'Biochemical network analysis of protein–protein interactions', venue: 'Journal of Proteomics, 2023' },
    { tab: 'Rapid sample treatment', tag: 'Method development', title: 'Minutes, not hours, from protein to peptide.',
      body: 'Ultrasound-accelerated in-gel and in-solution digestion and streamlined clean-up that shorten preparation for MALDI-TOF and LC-MS/MS, alongside MALDI imaging for spatial readouts.',
      keywords: ['ultrasonic digestion', 'FASP', 'MALDI imaging', 'in-gel / in-solution'],
      paper: 'Trends in ultrasonic-based equipment for analytical sample treatment', venue: 'Talanta, 2007' },
    { tab: 'Nano-proteomics', tag: 'Materials & sensing', title: 'Nanomaterials that separate, enrich and detect.',
      body: 'With BIOSCOPE colleagues we combine nanoparticles, supramolecular separation, chemosensors and computational methods to capture and report on molecules of clinical interest.',
      keywords: ['nanoparticles', 'chemosensors', 'metal ions', 'supramolecular separation'],
      paper: 'Cyanine 813@Imidazole-based doped supported devices for divalent metal ions detection', venue: 'Chemosensors, 2022' }
  ];

  var CLASSES = [
    { name: 'Metal ions & anions', scale: 'elements · ions',
      what: 'Detection and quantification of divalent metal ions, cations and anions using chemosensor probes and fluorescence or colorimetric read-outs.',
      methods: ['Chemosensor-based assays', '96-well fluorescence / colorimetric quantification', 'UV-vis & emission titrations'],
      instruments: ['CLARIOstar plate reader', 'NanoDrop 3300'], receive: 'Concentrations, binding and selectivity data.' },
    { name: 'Amino acids & small molecules', scale: '< 1 kDa',
      what: 'Quantification of amino acids and small analytes in biological and food matrices.',
      methods: ['Plate-based amino acid quantification', 'Accurate-mass ESI-qTOF analysis [CONFIRM]'],
      instruments: ['CLARIOstar · LT-4000 MS', 'Impact HD qTOF'], receive: 'Quantified analyte panels.' },
    { name: 'Nanomaterials', scale: '1–100 nm',
      what: 'Synthesis and characterisation of nanoparticles used for enrichment, sensing and nano-proteomics.',
      methods: ['Nanoparticle synthesis & preparation', 'Size and surface-charge characterisation', 'UV-vis plasmon analysis'],
      instruments: ['DLS system', 'UV-vis / emission setups'], receive: 'Size, charge and optical characterisation.' },
    { name: 'Peptides', scale: '0.5–5 kDa',
      what: 'Peptide mass fingerprinting, sequencing and purification for identification and quality control.',
      methods: ['MALDI-TOF/TOF peptide mass fingerprinting', 'LC-MALDI-TOF/TOF', 'Peptide clean-up & concentration'],
      instruments: ['Ultraflex II', 'Accela 600 + SunChrom spotter'], receive: 'Identified peptides with spectra.' },
    { name: 'Proteins', scale: '10–200+ kDa',
      what: 'Separation, digestion and identification of proteins from gels or solution, with targeted quantification.',
      methods: ['1D SDS-PAGE, 2D electrophoresis, off-gel IEF', 'In-gel & in-solution digestion with MS/MS', 'ELISA & protein quantification'],
      instruments: ['Micro-Rotofor · ProPic II', 'Impact HD · Ultraflex II'], receive: 'Protein identifications and quantities.' },
    { name: 'Post-translational modifications', scale: 'PTM · phospho',
      what: 'Characterisation of post-translational modifications, with a focus on phosphorylation and its functional associations.',
      methods: ['Enrichment & nano-phosphoproteomics', 'High-resolution LC-MS/MS site localisation'],
      instruments: ['Impact HD qTOF'], receive: 'Modified sites and their abundance changes.' },
    { name: 'Proteomes', scale: 'systems · cohorts',
      what: 'Discovery-scale, label-free quantitative proteomics of clinical cohorts, with pathway and interaction-network interpretation.',
      methods: ['FASP & rapid digestion', 'Label-free LC-MS/MS quantification', 'Perseus & Cytoscape network analysis'],
      instruments: ['2 × Impact HD qTOF'], receive: 'Quantified proteomes, statistics and pathway networks.' }
  ];

  var SERVICES = ['Label-free quantification', 'In-solution digestion + MS/MS', 'In-gel digestion + MS/MS',
    '1D / 2D electrophoresis', 'Off-gel IEF', 'LC-MALDI-TOF/TOF', 'Peptide clean-up', 'ELISA & plate assays',
    'Nanoparticle synthesis', 'DLS size & charge', 'Scientific counselling'];

  var REQUEST_EMAIL = 'hugosantos@bioscopegroup.org';
  var COURSE_HANDS = { start: '2026-11-17T09:00:00Z', end: '2026-11-18T18:00:00Z' };
  var COURSE_BIO_END = '2026-11-05T18:00:00Z';

  // ---------- HELPERS ----------
  function el(tag, attrs, text) {
    var n = document.createElement(tag);
    if (attrs) for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (text != null) n.textContent = text;
    return n;
  }
  function $(id) { return document.getElementById(id); }
  function pad(i) { return '0' + (i + 1); }

  // ---------- RESEARCH SPECTRUM ----------
  var PEAK_AT = { 11: 0, 25: 1, 38: 2, 51: 3 };
  var PEAK_H = [94, 72, 84, 64];
  var currentTheme = 0;
  var spectrum = $('spectrum');
  var bars = [];

  for (var i = 0; i < 64; i++) {
    var noise = Math.abs(Math.sin((i + 1) * 12.9898) * 43758.5453) % 1;
    var h = 4 + noise * 20, cluster = -1;
    for (var p in PEAK_AT) {
      var d = i - Number(p);
      if (d === 1) { h = PEAK_H[PEAK_AT[p]] * 0.48; cluster = PEAK_AT[p]; }
      if (d === 2) { h = PEAK_H[PEAK_AT[p]] * 0.2; cluster = PEAK_AT[p]; }
    }
    var node;
    if (PEAK_AT[i] !== undefined) {
      var t = PEAK_AT[i];
      node = el('button', { type: 'button', 'class': 'peak', 'aria-label': 'Program ' + pad(t) + ': ' + THEMES[t].tab, 'data-theme': t });
      node.style.height = PEAK_H[t] + '%';
      node.appendChild(el('span', null, pad(t)));
    } else {
      node = el('div', { 'class': 'bar', 'aria-hidden': 'true', 'data-cluster': cluster });
      node.style.height = h.toFixed(1) + '%';
    }
    spectrum.appendChild(node);
    bars.push(node);
  }

  var tabs = $('theme-tabs');
  THEMES.forEach(function (t, idx) {
    var b = el('button', { type: 'button', 'data-theme': idx });
    b.appendChild(el('span', null, pad(idx)));
    b.appendChild(document.createTextNode(t.tab));
    tabs.appendChild(b);
  });

  function selectTheme(idx) {
    currentTheme = idx;
    var t = THEMES[idx];
    bars.forEach(function (n) {
      if (n.classList.contains('peak')) n.setAttribute('aria-pressed', String(Number(n.dataset.theme) === idx));
      else n.classList.toggle('hot', Number(n.dataset.cluster) === idx);
    });
    Array.prototype.forEach.call(tabs.children, function (b) {
      b.setAttribute('aria-pressed', String(Number(b.dataset.theme) === idx));
    });
    $('theme-kicker').textContent = 'Program ' + pad(idx) + ' · ' + t.tag;
    $('theme-title').textContent = t.title;
    $('theme-body').textContent = t.body;
    $('theme-paper').textContent = t.paper;
    $('theme-venue').textContent = t.venue;
    var kw = $('theme-keywords'); kw.textContent = '';
    t.keywords.forEach(function (k) { kw.appendChild(el('span', null, k)); });
  }
  function onThemeClick(e) {
    var b = e.target.closest('[data-theme]');
    if (b) selectTheme(Number(b.dataset.theme));
  }
  spectrum.addEventListener('click', onThemeClick);
  tabs.addEventListener('click', onThemeClick);
  selectTheme(0);

  // ---------- MOLECULAR CLASSES ----------
  var classWrap = $('classes');
  CLASSES.forEach(function (c, idx) {
    var b = el('button', { type: 'button', 'data-cls': idx });
    b.appendChild(el('span', { 'class': 'c-num' }, pad(idx)));
    var s = el('span');
    s.appendChild(el('span', { 'class': 'c-name' }, c.name));
    s.appendChild(el('span', { 'class': 'c-scale' }, c.scale));
    b.appendChild(s);
    classWrap.appendChild(b);
  });
  function fillList(id, items) {
    var ul = $(id); ul.textContent = '';
    items.forEach(function (x) { ul.appendChild(el('li', null, x)); });
  }
  function selectClass(idx) {
    var c = CLASSES[idx];
    Array.prototype.forEach.call(classWrap.children, function (b) {
      b.setAttribute('aria-pressed', String(Number(b.dataset.cls) === idx));
    });
    $('cls-num').textContent = 'Class ' + pad(idx);
    $('cls-name').textContent = c.name;
    $('cls-what').textContent = c.what;
    $('cls-receive').textContent = c.receive;
    fillList('cls-methods', c.methods);
    fillList('cls-instruments', c.instruments);
  }
  classWrap.addEventListener('click', function (e) {
    var b = e.target.closest('[data-cls]');
    if (b) selectClass(Number(b.dataset.cls));
  });
  selectClass(CLASSES.length - 1);

  // ---------- SERVICE REQUEST BUILDER ----------
  var picked = {};
  var svcWrap = $('services');
  SERVICES.forEach(function (name) {
    var b = el('button', { type: 'button', 'aria-pressed': 'false', 'data-svc': name }, '+ ' + name);
    svcWrap.appendChild(b);
  });
  function updateRequest() {
    var chosen = SERVICES.filter(function (n) { return picked[n]; });
    Array.prototype.forEach.call(svcWrap.children, function (b) {
      var on = !!picked[b.dataset.svc];
      b.setAttribute('aria-pressed', String(on));
      b.textContent = (on ? '✓ ' : '+ ') + b.dataset.svc;
    });
    $('picked-count').textContent = String(chosen.length);
    $('picked-label').textContent = chosen.length === 1 ? 'service selected' : 'services selected';
    $('picked-list').textContent = chosen.length ? chosen.join(' · ') : 'Select services to build your request.';
    var body = 'Hello Hugo,\n\nI would like to discuss the following services:\n' +
      (chosen.length ? chosen.map(function (c) { return '- ' + c; }).join('\n') : '- (to be defined)') +
      '\n\nSample type and number:\nTimeline:\n\nThank you,';
    $('mailto').href = 'mailto:' + REQUEST_EMAIL + '?subject=' + encodeURIComponent('Proteomass facility request') +
      '&body=' + encodeURIComponent(body);
  }
  svcWrap.addEventListener('click', function (e) {
    var b = e.target.closest('[data-svc]');
    if (!b) return;
    var n = b.dataset.svc;
    if (picked[n]) delete picked[n]; else picked[n] = true;
    updateRequest();
  });
  updateRequest();

  // ---------- COURSE STATUS ----------
  var now = Date.now();
  var hs = Date.parse(COURSE_HANDS.start), he = Date.parse(COURSE_HANDS.end);
  var handsText, handsLive = true;
  if (now < hs) {
    var days = Math.ceil((hs - now) / 86400000);
    handsText = days === 1 ? 'Starts tomorrow' : 'Starts in ' + days + ' days';
  } else if (now <= he) {
    handsText = 'Running now';
  } else {
    handsText = 'Completed · next edition TBA'; handsLive = false;
  }
  document.querySelectorAll('[data-hands-status]').forEach(function (n) { n.textContent = handsText; });
  if (handsLive) $('course-hands').classList.add('live');
  var bioText = now > Date.parse(COURSE_BIO_END) ? 'Completed · next edition TBA' : 'Upcoming';
  document.querySelectorAll('[data-bio-status]').forEach(function (n) { n.textContent = bioText; });

  $('year').textContent = String(new Date().getFullYear());
})();
