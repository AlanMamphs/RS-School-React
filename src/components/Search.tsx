import { InputHTMLAttributes, KeyboardEventHandler } from 'react';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onSearchClick: () => void;
}

export const Search = (props: Props) => {
  const { onSearchClick, value, ...htmlInputProps } = props;

  const handleKeyPress: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter') {
      props.onSearchClick();
    }
  };

  return (
    <div className="search-input">
      <input
        type="search"
        value={value}
        {...htmlInputProps}
        onKeyDown={handleKeyPress}
      />
      <button disabled={!value} onClick={onSearchClick}>
        Search
      </button>
    </div>
  );
};
