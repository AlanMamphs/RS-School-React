import { PropsWithChildren } from 'react';

export const Container = (props: PropsWithChildren) => (
  <div className="w-full m-auto grid gap-4 grid-cols-auto-fit-10rem mt-4 dark:text-white">
    {props.children}
  </div>
);
