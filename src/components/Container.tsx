import { PropsWithChildren, PureComponent } from 'react';

export default class Container extends PureComponent<PropsWithChildren> {
  render() {
    return <div className="container">{this.props.children}</div>;
  }
}
