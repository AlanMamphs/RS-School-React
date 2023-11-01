import { NavLink, useNavigation } from 'react-router-dom';

export const HomePage = () => {
  const navigation = useNavigation();
  return (
    <>
      <p>
        This UI is utilizing{' '}
        <a href="https://openfoodfacts.github.io/openfoodfacts-server/api/">
          Open Food Facts API
        </a>
        . Open Food Facts is a collaborative project built by tens of thousands
        of volunteers and managed by a non-profit organization with 8 employees.
      </p>
      <NavLink to="/products">Go To Search Page</NavLink>
      {navigation.state === 'loading' && <p>Loading...</p>}
    </>
  );
};
