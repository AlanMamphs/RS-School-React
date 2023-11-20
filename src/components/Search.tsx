import {
  InputHTMLAttributes,
  KeyboardEventHandler,
  PureComponent,
  ReactNode,
} from 'react';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onSearchClick: () => void;
}
export default class Search extends PureComponent<Props> {
  handleKeyPress: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter') {
      this.props.onSearchClick();
    }
  };
  render(): ReactNode {
    const { onSearchClick, value, ...htmlInputProps } = this.props;
    return (
      <div className="search-input">
        <input
          type="search"
          value={value}
          {...htmlInputProps}
          onKeyDown={this.handleKeyPress}
        />
        <button disabled={!value} onClick={onSearchClick}>
          Search
        </button>
      </div>
    );
  }
}
