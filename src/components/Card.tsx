import { PropsWithChildren, ReactNode } from 'react';

export const CardImage = (props: { image: string }) => (
  <div role="card-image" className="h-44 w-full">
    <img className="max-h-44 max-w-full mx-auto" src={props.image} />
  </div>
);

export const CardHeader = (props: PropsWithChildren<{ header?: string }>) => (
  <h3
    role="card-header"
    className="text-md h-8 whitespace-nowrap overflow-hidden text-ellipsis"
  >
    {props.header ?? props.children}
  </h3>
);

export const CardDescription = (
  props: PropsWithChildren<{ description?: ReactNode; title?: string }>
) => (
  <p
    role="card-description"
    className="text-sm whitespace-nowrap overflow-hidden text-ellipsis h-8"
    title={props.title}
  >
    {props.description ?? props.children}
  </p>
);

export const Card = (
  props: PropsWithChildren<{
    header?: string;
    image?: string;
    description?: string;
    active?: boolean;
  }>
) => (
  <div
    role="card"
    className={`bg-white rounded-md shadow-2xl p-4 max-h-[40rem] h-full hover:bg-gray-100  dark:text-black center ${
      props.active ? 'border-4 border-indigo-500' : ''
    }`}
  >
    {props.image && <CardImage image={props.image} />}
    {props.header && <CardHeader header={props.header} />}
    {props.description && <CardDescription description={props.description} />}
    {props.children}
  </div>
);

Card.CardHeader = CardHeader;
Card.CardDescription = CardDescription;
Card.CardImage = CardImage;

export default Card;
