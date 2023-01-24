export const $ = (q: string, c = document): any => c.querySelector(q);

export const $$ = (q: any, c = document): any => Array.from(c.querySelectorAll(q));

export const once = (element: any, event: any) =>
  new Promise((done) => element.addEventListener(event, done, {
    once: true
  }));

export const redraw = (node: any) => node.clientHeight;

export const setVar = (key: string, value: string | number | undefined, node = document.body) => {
  if (value) {
    node.style.setProperty('--' + key, value.toString());
  }
};

export const getVar = (key: string, node = document.body) => {
  node.style.getPropertyValue('--' + key);
};

export const calcTextWidth = (text: any) => {
  if (!text) return "0px";

  const div = document.body.appendChild(document.createElement('div'));
  div.classList.add('size-test');
  div.textContent = text.toString();
  const width = div.clientWidth;
  div.remove();
  return width + 1 + 'px';
};

export const consoleLog = (text: string) => {
  let p = document.createElement('p');
  let textnode = document.createTextNode(text);
  p.appendChild(textnode);

  $('#console-log')?.appendChild(p);
};
