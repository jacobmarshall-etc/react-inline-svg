const root = document.createElement('svg');
root.hidden = true;
(document.head || document.body).appendChild(root);

function svgToSymbol(svg: SVGElement): SVGSymbolElement {
  const symbol = document.createElementNS('http://www.w3.org/2000/svg', 'symbol');
  for (let a = 0; a < svg.attributes.length; a++) {
    const attribute = svg.attributes[a];
    symbol.setAttribute(attribute.nodeName, attribute.nodeValue as string);
  }
  for (let c = 0; c < svg.childNodes.length; c++) {
    const childNode = svg.childNodes[c];
    symbol.appendChild(childNode.cloneNode(true));
  }
  return symbol;
}

function register(svg: SVGElement, id: string): void {
  const symbol = svgToSymbol(svg);
  symbol.id = id;
  root.appendChild(symbol);
}

export {
  register,
};
