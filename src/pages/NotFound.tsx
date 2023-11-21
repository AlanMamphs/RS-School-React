import { useLocation } from 'react-router-dom';

export const NotFoundPage = () => {
  const location = useLocation();
  return (
    <div>
      <h2>Page at &apos;{location.pathname}&apos; is not found</h2>
    </div>
  );
};
