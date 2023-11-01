export const Card = (props: {
  header: string;
  image: string;
  brands: string;
  isActive: boolean;
}) => (
  <div className={`card ${props.isActive ? 'active' : ''}`}>
    <div className="card-image">
      <img src={props.image} />
    </div>
    <h3 title={props.header}>{props.header}</h3>
    <p title={props.brands}>{props.brands}</p>
  </div>
);
