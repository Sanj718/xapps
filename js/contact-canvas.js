/**
 * Figlet ASCII text – follows https://www.npmjs.com/package/figlet
 * data-title: animates once first, stays on top (optional)
 * data-text: single or multiple texts separated by |||
 * data-vertical-layout: figlet vertical layout - "default"|"full"|"fitted" (default "full" for more line height)
 * Width is derived from container size for dynamic line wrapping.
 * CSS line-height on .contact-ascii-text also controls displayed line spacing.
 */
import figlet from "figlet";

const FONT_URL = "https://unpkg.com/figlet@1.10.0/importable-fonts/Standard.js";
const fontModule = await import(/* webpackIgnore: true */ FONT_URL);
figlet.parseFont("Standard", fontModule.default);

const container = document.getElementById("contact-canvas");
if (container) {
  const c = container;
  const titleText = (c.dataset.title || "").trim();
  const TEXT_DELIM = "|||";
  const texts = (c.dataset.text || "")
    .split(TEXT_DELIM)
    .map((s) => s.trim())
    .filter(Boolean);
  var figletWidth = Math.floor(container.offsetWidth / 10);
  const verticalLayout = c.dataset.verticalLayout || "full";
  const wrapper = document.createElement("div");
  wrapper.className = "contact-ascii-wrapper";
  c.appendChild(wrapper);

  const preTitle = document.createElement("pre");
  preTitle.className = "contact-ascii-text contact-ascii-text--title";
  preTitle.setAttribute("aria-hidden", "true");

  const preContent = document.createElement("pre");
  preContent.className = "contact-ascii-text contact-ascii-text--content";
  preContent.setAttribute("aria-hidden", "true");

  if (titleText) wrapper.appendChild(preTitle);
  wrapper.appendChild(preContent);

  const TYPING_MS = 100;
  const REPEAT_DELAY_MS = 1500;
  const CLEAR_TO_RESTART_MS = 500;

  function getFigletOpts() {
    return {
      font: "Standard",
      width: figletWidth,
      whitespaceBreak: true,
      verticalLayout: verticalLayout,
    };
  }
  const repeat = c.dataset.repeat !== undefined && c.dataset.repeat !== "false";

  function setDisplay(contentOutput) {
    preContent.textContent = contentOutput;
  }

  function typeLetter(str, charIdx, targetPre, onComplete) {
    if (charIdx > str.length) {
      onComplete();
      return;
    }
    const prefix = str.slice(0, charIdx);
    // @ts-expect-error - figlet options font type
    figlet.text(prefix, getFigletOpts(), function (err, data) {
      targetPre.textContent = err ? "" : (data || "").trimEnd();
      if (charIdx === str.length) {
        onComplete();
        return;
      }
      setTimeout(function () {
        typeLetter(str, charIdx + 1, targetPre, onComplete);
      }, TYPING_MS);
    });
  }

  function showFiglet(str) {
    if (!str) {
      setDisplay("");
      return;
    }
    typeLetter(str, 1, preContent, function () {
      if (repeat && texts.length > 0) {
        setTimeout(function () {
          setDisplay("");
          textIndex = (textIndex + 1) % texts.length;
          setTimeout(showFiglet.bind(null, texts[textIndex]), CLEAR_TO_RESTART_MS);
        }, REPEAT_DELAY_MS);
      }
    });
  }

  function runTitleThenContent(onDone) {
    if (!titleText) {
      onDone();
      return;
    }
    typeLetter(titleText, 1, preTitle, onDone);
  }

  var textIndex = 0;

  function fitSize() {
    var cw = c.offsetWidth;
    var ch = c.offsetHeight || 280;
    var fontSizePx = Math.min(cw / 35, ch / 18, 10);
    var fontSize = fontSizePx + "px";
    figletWidth = Math.max(20, Math.floor(cw / (fontSizePx * 0.6))) - 5;
    preTitle.style.fontSize = fontSize;
    preTitle.style.width = cw + "px";
    preContent.style.fontSize = fontSize;
    preContent.style.width = cw + "px";
  }

  fitSize();
  runTitleThenContent(function () {
    showFiglet(texts[0] || "");
  });
  window.addEventListener("resize", fitSize);
}
