import { Link, Outlet, ScrollRestoration } from 'react-router-dom';

export const RootLayout = () => {
  return (
    <div className=" dark:bg-gray-900 w-full h-full dark-mode">
      <header className="text-center">
        <nav>
          <Link to="">
            <h1 className="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200 m-8">
              Open Food Facts{' '}
            </h1>
          </Link>
        </nav>
      </header>
      <main className="text-center w-3/4 mx-auto">
        <Outlet />
      </main>
      <ScrollRestoration />
    </div>
  );
};
