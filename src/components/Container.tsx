import { PropsWithChildren } from 'react';
import { CloseButton } from './CloseButton';

export const GridContainer = (props: PropsWithChildren) => (
  <div className="w-full m-auto grid gap-4 grid-cols-auto-fit-10rem mt-4 dark:text-white">
    {props.children}
  </div>
);

export const Header = (props: PropsWithChildren) => (
  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
    {props.children}
  </h3>
);

export const FlexContainer = ({
  header,
  onClose,
  children,
}: PropsWithChildren<{
  header?: string;
  onClose?: () => void;
}>) => (
  <div className="flex-1 text-gray-900 dark:text-white">
    <div
      className={
        'flex items-start justify-between p-4 border-b rounded-t dark:text-white '
      }
    >
      <Header>{header}</Header>
      {onClose && <CloseButton onClick={onClose} />}
    </div>
    {children}
  </div>
);
