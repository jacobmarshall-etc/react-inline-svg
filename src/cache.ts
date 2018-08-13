interface SVG {
  id: string;
  isLoading: boolean;
  promise: Promise<void>;
}

const cache = new Map<string, SVG>();

export {
  cache,
  SVG,
};
