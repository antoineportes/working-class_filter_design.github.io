//  USE PATHS RELATIVE TO THIS SCRIPT
const scriptURL = document.currentScript.src;

const fontsPath =
  new URL('../../fonts/%%FONT%%-font', scriptURL).href;
const enginePath =
  new URL('./tex-chtml.js', scriptURL).href;
const mathjaxDir =
  new URL('./', scriptURL).href;

//  CONFIGURE
window.MathJax =
{
  loader:
  {
    paths:
    {
      mathjax: mathjaxDir
    }
  },
  output:
  {
    font: 'mathjax-modern',
    fontPath: fontsPath
  },
  tex:
  {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true,
    macros:
    {
      Re:       "{\\operatorname{Re}}",
      Im:       "{\\operatorname{Im}}",
      abs:      "{\\operatorname{abs}}",
      "or":     "{\\operatorname{or}}",
      "and":    "{\\operatorname{and}}",
      AND:      "{\\operatorname{\\&\\&}}",
      atan:     "{\\operatorname{atan}}",
      atanTwo:  "{\\operatorname{atan2}}",
      adj:      "{\\operatorname{adjacent}}",
      opp:      "{\\operatorname{opposite}}",
      hyp:      "{\\operatorname{hypotenuse}}",
      conj:     "{\\operatorname{conj}}",
      f:        "{\\operatorname{f}}",
      sinc:     "{\\operatorname{sinc}}",
      E:        "{\\operatorname{E}}",
      metre:    "{\\operatorname{m}}",
      second:   "{\\operatorname{s}}",
      INT:      "{\\operatorname{int}}",
      SUM:      "{\\operatorname{sum}}",
      AVG:      "{\\operatorname{avg}}",
      SPAN:     "{\\operatorname{span}}",
      NB:       "{\\operatorname{nb}}",
      NUM:      "{\\operatorname{num.}}",
      DENOM:    "{\\operatorname{denom.}}",
      sgn:      "{\\operatorname{sgn}}",
      fs:       "{\\operatorname{f}_{\\operatorname{s}}}",
      Nyquist:  "{\\operatorname{Nyquist}}",
      pfrac:    ["\\frac{\\mkern 6mu #1 \\mkern 6mu}{\\mkern 6mu #2 \\mkern 6mu}", 2],
      pdfrac:   ["\\dfrac{\\mkern 6mu #1 \\mkern 6mu}{\\mkern 6mu #2 \\mkern 6mu}", 2]
    }
  },
  chtml:
  {
    displayAlign: 'left'
  },
  options:
  {
    enableMenu: false
  }
};

//  LOAD
(
  function ()
  {
    const script = document.createElement('script');
    script.src = enginePath;
    script.async = true;
    document.head.appendChild(script);
  }
)();