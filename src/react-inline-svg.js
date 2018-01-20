function request(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('readystatechange', function () {
    if (xhr.readyState === 4) {
      callback(xhr.status === 200, xhr.responseXML);
    }
  }, false);
  xhr.open('GET', url, true);
  xhr.responseType = 'document';
  xhr.send();
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
function excludeProps(originalProps, keys) {
  var props = {};
  for (var key in originalProps) {
    if (hasOwnProperty.call(originalProps, key) && keys.indexOf(key) === -1) {
      props[key] = originalProps[key];
    }
  }
  return props;
}

function nodeToElement(svg) {
  var attributes = svg.attributes;
  var props = {
    dangerouslySetInnerHTML: {__html: svg.innerHTML},
  };
  for (var i = 0; i < attributes.length; i++) {
    var attribute = attributes[i];
    props[attribute.name] = attribute.value;
  }
  return React.createElement('svg', props);
}

function extend(Child, Parent) {
  function Temp() {
    this.constructor = Child;
  }
  Temp.prototype = Parent.prototype;
  Child.prototype = new Temp();
}

function InlineSVG(props) {
  React.Component.call(this, props);
  this.state = {
    loading: true,
    element: null,
  };
}

InlineSVG.displayName = 'InlineSVG';

extend(InlineSVG, React.Component);

InlineSVG.prototype.componentDidMount =
InlineSVG.prototype.componentWillReceiveProps = function(props) {
  this.load(props ? props.src : this.props.src);
};

InlineSVG.prototype.componentWillUnmount = function() {
  if (this.cancel) {
    this.cancel();
  }
};

InlineSVG.prototype.load = function(src) {
  var that = this;
  this.cancel = InlineSVG.cache.load(src, function(item) {
    that.setState({
      loading: false,
      element: item
    });
  });
};

InlineSVG.prototype.render = function() {
  return (
    this.state.element
      ? React.cloneElement(this.state.element, excludeProps(this.props, ['src']))
      : null
  );
};

var cache = InlineSVG.cache = {};

InlineSVG.cache.load = function(url, callback) {
  var item = cache[url];
  if (!item) {
    item = cache[url] = {
      url: url,
      loading: true,
      element: null,
      callbacks: [],
    };
    if (callback) {
      item.callbacks.push(callback);
    }
    request(url, function(success, content) {
      item.element = nodeToElement(content.documentElement);
      item.loading = false;
      while (item.callbacks.length) {
        item.callbacks.shift()(item.element);
      }
    });
  } else if (callback) {
    if (item.loading) {
      item.callbacks.push(callback);
    } else {
      callback(item.element);
    }
  }
  var cancelled = false;
  return function cancel() {
    if (!cancelled) {
      item.callbacks.splice(item.callbacks.indexOf(callback), 1);
      cancelled = true;
    }
  };
};