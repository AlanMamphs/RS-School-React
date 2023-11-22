import { PropsWithChildren } from 'react';
import Link from 'next/link';
import Head from 'next/head';
export const RootLayout = (props: PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>Open Food Facts</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <div className=" dark:bg-gray-900 w-full h-full text-slate-900 tracking-tight dark:text-slate-200 m-8">
        <header className="text-center">
          <nav>
            <Link href="/">
              <h1 className="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200 m-8">
                Open Food Facts
              </h1>
            </Link>
          </nav>
        </header>
        <main className="text-center w-3/4 mx-auto">{props.children}</main>
      </div>
    </>
  );
};
