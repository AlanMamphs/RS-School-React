import { PureComponent } from 'react';

type Props = {
  header: string;
  image: string;
  brands: string;
};
export default class Card extends PureComponent<Props> {
  render() {
    return (
      <div className="card">
        <div className="card-image">
          <img src={this.props.image} />
        </div>
        <h3>{this.props.header}</h3>
        <p>{this.props.brands}</p>
      </div>
    );
  }
}
