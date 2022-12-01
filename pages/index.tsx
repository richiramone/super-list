import Head from 'next/head';
import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { lazy, Suspense } from 'react';
import { authorAtom, isOnlineAtom } from '../atoms';
import { getAuthor } from '../utilities';

export default function Home() {
  const [, setConnectionStatus] = useAtom(isOnlineAtom);
  const [, setAuthorAtom] = useAtom(authorAtom);

  const Preloader = lazy(() => import('../components/preloader'));
  const Header = lazy(() => import('../components/header'));
  const AddItemForm = lazy(() => import('../components/addItemForm'));
  const ItemsList = lazy(() => import('../components/itemsList'));

  useEffect(() => {
    setAuthorAtom(getAuthor());
    window.addEventListener('online', () => setConnectionStatus(true));
    window.addEventListener('offline', () => setConnectionStatus(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>SuperList</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="SuperList" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="author" href="/humans.txt" />
        <meta name="theme-color" content="#009DFF" />
        <meta name="description" content="Lista delle spese" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <svg
        className="hidden"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <defs>
          <symbol id="create-new-list" viewBox="0 0 48 48">
            <path d="M32.5 40V31.5H24V28.5H32.5V20H35.5V28.5H44V31.5H35.5V40ZM6 31.5V28.5H21V31.5ZM6 23.25V20.25H29.5V23.25ZM6 15V12H29.5V15Z" />
          </symbol>
          <symbol id="confirm-icon" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
          </symbol>
          <symbol id="shape-bell">
            <path d="M32.047 25c0-9-8-7-8-14 0-0.58-0.056-1.076-0.158-1.498-0.526-3.532-2.88-6.366-5.93-7.23 0.027-0.123 0.041-0.251 0.041-0.382 0-1.040-0.9-1.891-2-1.891s-2 0.851-2 1.891c0 0.131 0.014 0.258 0.041 0.382-3.421 0.969-5.966 4.416-6.039 8.545-0.001 0.060-0.002 0.121-0.002 0.183 0 7-8 5-8 14 0 2.382 5.331 4.375 12.468 4.878 0.673 1.263 2.002 2.122 3.532 2.122s2.86-0.86 3.532-2.122c7.137-0.503 12.468-2.495 12.468-4.878 0-0.007-0.001-0.014-0.001-0.021l0.048 0.021zM25.82 26.691c-1.695 0.452-3.692 0.777-5.837 0.958-0.178-2.044-1.893-3.648-3.984-3.648s-3.805 1.604-3.984 3.648c-2.144-0.18-4.142-0.506-5.837-0.958-2.332-0.622-3.447-1.318-3.855-1.691 0.408-0.372 1.523-1.068 3.855-1.691 2.712-0.724 6.199-1.122 9.82-1.122s7.109 0.398 9.82 1.122c2.332 0.622 3.447 1.318 3.855 1.691-0.408 0.372-1.523 1.068-3.855 1.691z"></path>
          </symbol>

          <symbol id="shape-smiley" viewBox="0 0 1024 1024">
            <path d="M512 1024c282.77 0 512-229.23 512-512s-229.23-512-512-512-512 229.23-512 512 229.23 512 512 512zM512 96c229.75 0 416 186.25 416 416s-186.25 416-416 416-416-186.25-416-416 186.25-416 416-416zM512 598.76c115.95 0 226.23-30.806 320-84.92-14.574 178.438-153.128 318.16-320 318.16-166.868 0-305.422-139.872-320-318.304 93.77 54.112 204.050 85.064 320 85.064zM256 352c0-53.019 28.654-96 64-96s64 42.981 64 96c0 53.019-28.654 96-64 96s-64-42.981-64-96zM640 352c0-53.019 28.654-96 64-96s64 42.981 64 96c0 53.019-28.654 96-64 96s-64-42.981-64-96z"></path>
          </symbol>

          <symbol id="shape-trash">
            <path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path>
            <path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path>
          </symbol>

          <symbol id="shape-heart">
            <path d="M23.6 2c-3.363 0-6.258 2.736-7.599 5.594-1.342-2.858-4.237-5.594-7.601-5.594-4.637 0-8.4 3.764-8.4 8.401 0 9.433 9.516 11.906 16.001 21.232 6.13-9.268 15.999-12.1 15.999-21.232 0-4.637-3.763-8.401-8.4-8.401z"></path>
          </symbol>

          <symbol id="shape-reload" viewBox="0 0 1024 1024">
            <path d="M889.68 166.32c-93.608-102.216-228.154-166.32-377.68-166.32-282.77 0-512 229.23-512 512h96c0-229.75 186.25-416 416-416 123.020 0 233.542 53.418 309.696 138.306l-149.696 149.694h352v-352l-134.32 134.32z"></path>
            <path d="M928 512c0 229.75-186.25 416-416 416-123.020 0-233.542-53.418-309.694-138.306l149.694-149.694h-352v352l134.32-134.32c93.608 102.216 228.154 166.32 377.68 166.32 282.77 0 512-229.23 512-512h-96z"></path>
          </symbol>
        </defs>
      </svg>

      <Suspense>
        <section>
          <Preloader />
          <Header />
          <main>
            <aside>
              <AddItemForm />
            </aside>

            <ItemsList />
          </main>
        </section>
      </Suspense>
    </>
  );
}