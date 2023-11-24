import { NodeProps } from 'postcss';
import { ComponentProps, PropsWithChildren, ReactNode } from 'react';

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

export const Card = ({
  header,
  image,
  description,
  active,
  children,
  ...restProps
}: PropsWithChildren<
  {
    header?: string;
    image?: string;
    description?: string;
    active?: boolean;
  } & ComponentProps<'div'>
>) => (
  <div
    role="card"
    className={`bg-white border-4 rounded-md shadow-2xl p-4 max-h-[40rem] h-full hover:bg-gray-100  dark:text-black center ${
      active ? ' border-indigo-500' : ''
    }`}
    {...restProps}
  >
    {image && <CardImage image={image} />}
    {header && <CardHeader header={header} />}
    {description && <CardDescription description={description} />}
    {children}
  </div>
);

Card.CardHeader = CardHeader;
Card.CardDescription = CardDescription;
Card.CardImage = CardImage;

export default Card;
