import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="dark:text-slate-200">
      <p>
        This UI is utilizing{' '}
        <a
          className="underline"
          href="https://openfoodfacts.github.io/openfoodfacts-server/api/"
        >
          Open Food Facts API
        </a>
        . Open Food Facts is a collaborative project built by tens of thousands
        of volunteers and managed by a non-profit organization with 8 employees.
      </p>
      <Link className="underline hover:shadow-xl" href="/products">
        Go To Search Page
      </Link>
    </div>
  );
};

export default HomePage;
