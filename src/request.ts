function send(url: string): Promise<SVGElement> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      let element: Node;
      try {
        element = (xhr.responseXML as Document).documentElement as Node;
      } catch (err) {
        reject(new Error(`InlineSVG: Failed to parse response (${url}).`));
        return;
      }
      if (element.nodeName.toLowerCase() !== 'svg') {
        reject(new Error(`InlineSVG: URL does not resolve to an SVG (${url}).`));
        return;
      }
      resolve(element as SVGElement);
    };
    xhr.onerror = reject;
    xhr.open('GET', url, true);
    xhr.responseType = 'document';
    xhr.send();
  });
}

export {
  send,
};
