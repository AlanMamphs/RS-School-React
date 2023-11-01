import { Link, Outlet } from 'react-router-dom';

export const RootLayout = () => {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <Link to="/" />
          <h1>Open Food Facts </h1>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
