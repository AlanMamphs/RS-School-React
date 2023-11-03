export const Card = (props: {
  header: string;
  image: string;
  brands: string;
  isActive?: boolean;
}) => (
  <div
    className={`bg-white rounded-md shadow-2xl p-4 max-h-[40rem] h-full hover:bg-gray-100  dark:text-black center ${
      props.isActive ? 'border-4 border-indigo-500' : ''
    }`}
  >
    <div className="max-h-44 w-full">
      <img className="max-h-44 max-w-full mx-auto" src={props.image} />
    </div>
    <h3
      className="text-md h-8 whitespace-nowrap overflow-hidden text-ellipsis"
      title={props.header}
    >
      {props.header}
    </h3>
    <p
      className="text-sm whitespace-nowrap overflow-hidden text-ellipsis h-8"
      title={props.brands}
    >
      {props.brands}
    </p>
  </div>
);
