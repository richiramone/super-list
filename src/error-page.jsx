import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="mt-36 text-center">
      <h1 className="text-6xl font-bold">Oops!</h1>
      <p className="my-8">Sorry, an unexpected error has occurred.</p>
      <p>
        <i className="text-lg font-bold">{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
