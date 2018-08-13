import * as React from 'react';
interface Props {
  src: string;
  [prop: string]: any;
}
interface State {
  id: string;
  isLoading: boolean;
  promise: Promise<void>;
}
interface SVG {
  id: string;
  isLoading: boolean;
  promise: Promise<void>;
}
declare class InlineSVG extends React.Component<Props, State> {}
declare function preload(src: string): SVG;
export { InlineSVG, preload };
