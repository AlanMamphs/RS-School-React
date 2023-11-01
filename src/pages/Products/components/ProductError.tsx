import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export const ProductError = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div>The product details are not found!</div>;
    }
    if (error.status >= 500) {
      return <div>Looks like our API is down</div>;
    }
  }

  return <div>Something went wrong</div>;
};
