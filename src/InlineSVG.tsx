import * as React from 'react';
import { load } from './loader';

interface Props {
  src: string;
  [prop: string]: any;
}

interface State {
  id: string;
  isLoading: boolean;
  promise: Promise<void>;
}

class InlineSVG extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const svg = load(props.src);
    this.state = { ...svg };
    this.waitUntilLoaded(svg);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.src !== nextProps.src) {
      const svg = load(nextProps.src);
      this.setState({ ...svg });
      this.waitUntilLoaded(svg);
    }
  }

  waitUntilLoaded(svg) {
    if (svg.isLoading) {
      svg.promise.then(() => {
        // Ensure that by the time the SVG has been loaded, the id is still the same.
        // If it's not - that means the `src` has changed since we started waiting.
        if (this.state.id === svg.id) {
          this.setState({ ...svg });
        }
      });
    }
  }

  render() {
    const { id, isLoading } = this.state;
    const { src, ...props } = this.props;
    return (
      <svg {...props}>
        {!isLoading &&
          <use
            xlinkHref={'#' + id}
            href={'#' + id}
          />
        }
      </svg>
    );
  }
}

export {
  InlineSVG,
};
