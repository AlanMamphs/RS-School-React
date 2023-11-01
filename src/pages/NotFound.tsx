import { useLocation } from 'react-router-dom';

export const NotFoundPage = () => {
  const location = useLocation();
  return (
    <div>
      <h2>Page at `{location.pathname}` is not found</h2>
    </div>
  );
};
