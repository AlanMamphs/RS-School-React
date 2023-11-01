import { PropsWithChildren } from 'react';

export const Container = (props: PropsWithChildren) => (
  <div className="container">{props.children}</div>
);
