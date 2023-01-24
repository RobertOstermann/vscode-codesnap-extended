import { $, $$, setVar, calcTextWidth } from "../utilities/utilities";
import ConfigurationSettings from "../types/configurationSettings";

function toggleLineHighlight(this: any, e: any) {
  if (this.parentNode.parentNode.classList.contains("line-highlight")) {
    this.parentNode.parentNode.classList.remove("line-highlight");
    this.parentNode.parentNode.classList.add("line-highlight-git-add");
    this.parentNode.parentNode.firstChild.classList.add('line-number-highlight');
  } else if (this.parentNode.parentNode.classList.contains("line-highlight-git-add")) {
    this.parentNode.parentNode.classList.remove("line-highlight-git-add");
    this.parentNode.parentNode.classList.add("line-highlight-git-remove");
    this.parentNode.parentNode.firstChild.classList.add('line-number-highlight');
  } else if (this.parentNode.parentNode.classList.contains("line-highlight-git-remove")) {
    this.parentNode.parentNode.classList.remove("line-highlight");
    this.parentNode.parentNode.classList.remove("line-highlight-git-add");
    this.parentNode.parentNode.classList.remove("line-highlight-git-remove");
    this.parentNode.parentNode.firstChild.classList.remove('line-number-highlight');
  } else {
    this.parentNode.parentNode.classList.add("line-highlight");
    this.parentNode.parentNode.classList.remove("line-highlight-git-add");
    this.parentNode.parentNode.classList.remove("line-highlight-git-remove");
    this.parentNode.parentNode.firstChild.classList.add('line-number-highlight');
  }
};

const setupLines = (node: Document | undefined, config: any) => {
  $$(':scope > br', node).forEach((row: any) => (row.outerHTML = '<div>&nbsp;</div>'));

  const rows = $$(':scope > div', node);
  const textWidth = rows?.length + config.startLine;
  setVar('line-number-width', calcTextWidth(textWidth));

  rows.forEach((row: any, idx: any) => {
    const newRow = document.createElement('div');
    newRow.classList.add('line');
    row.replaceWith(newRow);

    if (config.showLineNumbers) {
      const lineNum = document.createElement('div');
      lineNum.classList.add('line-number');
      lineNum.textContent = idx + 1 + config.startLine;
      newRow.appendChild(lineNum);

      lineNum.textContent = idx + 1 + config.startLine;
      newRow.appendChild(lineNum);
    }

    const span = document.createElement('span');
    span.textContent = ' ';
    row.appendChild(span);

    const lineCodeDiv = document.createElement('div');
    lineCodeDiv.classList.add('line-code');

    if (row.innerText.trim().length === 1 && row.childNodes.length === 2) {
      var char = row.innerText.trim();

      const lineCode = document.createElement('span');
      lineCode.innerHTML = row.innerHTML.split(char).join("");
      lineCodeDiv.appendChild(lineCode);

      const lineCode1 = document.createElement('span');
      lineCode1.innerHTML = row.innerHTML.replace(/&nbsp;/ig, "");
      lineCodeDiv.appendChild(lineCode1);
    } else {
      const lineCode = document.createElement('span');
      lineCode.innerHTML = row.innerHTML;
      lineCodeDiv.appendChild(lineCode);

      lineCode.addEventListener("click", toggleLineHighlight);
    }

    newRow.appendChild(lineCodeDiv);
  });
};

const getClipboardHtml = (clip: any) => {
  const html = clip.getData('text/html');
  if (html) return html;

  const text = clip
    .getData('text/plain')
    .split('\n')
    .map((line: any) => `<div>${line}</div>`)
    .join('');

  return `<div>${text}</div>`;
};

const stripInitialIndent = (node: any) => {
  const regIndent = /^\s+/u;
  const initialSpans = $$(':scope > div > span:first-child', node);
  if (initialSpans.some((span: any) => !regIndent.test(span.textContent))) return;
  const minIndent = Math.min(
    ...initialSpans.map((span: any) => span.textContent.match(regIndent)[0].length)
  );
  initialSpans.forEach((span: any) => (span.textContent = span.textContent.slice(minIndent)));
};

const isEmptyLine = (node: any) => node?.innerText?.match(/^\s*$/);

const trimEmptyLines = (node: Node, configuration: ConfigurationSettings) => {
  while (isEmptyLine(node.firstChild)) {
    if (node.firstChild) node.removeChild(node.firstChild);
    if (configuration.realLineNumbers) {
      configuration.startLine = configuration.startLine ? configuration.startLine++ : 0;
    }
  }
  while (isEmptyLine(node.lastChild)) {
    if (node.lastChild) node.removeChild(node.lastChild);
  }
};

export const pasteCode = (configuration: ConfigurationSettings, clipboard: any) => {
  const snippetNode = $('#snippet');
  if (!snippetNode) return;

  snippetNode.innerHTML = getClipboardHtml(clipboard);
  const code = $('div', snippetNode);
  snippetNode.style.fontSize = code.style.fontSize;
  snippetNode.style.lineHeight = code.style.lineHeight;
  snippetNode.innerHTML = code.innerHTML;
  stripInitialIndent(snippetNode);
  if (configuration.trimEmptyLines) trimEmptyLines(snippetNode, configuration);
  setupLines(snippetNode, configuration);
};

type SnippetProps = {
  configuration: ConfigurationSettings;
};

export default function Snippet({ configuration }: SnippetProps) {
  const hideNavbar = configuration.windowControlStyle !== "None" && !configuration.showWindowTitle;
  const hideWindowControls = configuration.windowControlStyle !== "Windows";
  const hideMacControls = configuration.windowControlStyle !== "OS X" && configuration.windowControlStyle !== "Gray dots";
  const hideWindowTitle = !configuration.showWindowTitle;

  return (
    <div id="snippet-scroll">
      <div id="snippet-container">
        <div id="window">
          <div id="navbar" hidden={hideNavbar}>
            <div id="window-controls" hidden={hideWindowControls}>
              <svg width="58" height="14" viewBox="0 0 58 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 7H11" stroke="#878787" strokeLinecap="round" strokeLinejoin="round"></path>
                <path
                  d="M35 1H25C24.4477 1 24 1.44772 24 2V12C24 12.5523 24.4477 13 25 13H35C35.5523 13 36 12.5523 36 12V2C36 1.44772 35.5523 1 35 1Z"
                  stroke="#878787" />
                <path d="M47 2L57 12" stroke="#878787" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M47 12L57 2" stroke="#878787" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div id="mac-controls" hidden={hideMacControls}>
              <div id="red-dot" className="red dot" />
              <div id="red-dot" className="yellow dot" />
              <div id="red-dot" className="green dot" />
            </div>

            <div id="window-title" hidden={hideWindowTitle}>
              {configuration.windowTitle}
            </div>
          </div>

          <div id="snippet" />
        </div>
      </div>
    </div >
  );
}
