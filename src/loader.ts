import { cache, SVG } from './cache';
import { send } from './request';
import { register } from './symbols';

function load(src: string): SVG {
  if (!cache.has(src)) {
    const id = btoa(src)
      .replace(/[=-]/, '')         // remove any base64 characters we can't use for ids
      .replace(/^([0-9])/, '_$1'); // add an underscore to the beginning of the id if it starts with a number
    const promise = send(src);
    const svg = {
      id,
      isLoading: true,
      promise: promise.then(() => {}), // only use the promise to determine that the SVG has loaded
    };
    promise.then((element) => {
      register(element, id);
      svg.isLoading = false;
    });
    cache.set(src, svg);
  }
  return cache.get(src) as SVG;
}

export {
  load,
};
