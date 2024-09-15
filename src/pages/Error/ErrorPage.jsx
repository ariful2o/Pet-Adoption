
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-4xl text-green-600 italic">Oops !</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="text-xl font-bold text-red-500"> 
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}