import { useRouteError } from "react-router-dom";
import ButtonLink from "./ButtonLink.tsx";

interface Error {
  data: string;
  message: string;
}

function NotFound() {
  const error: Error = useRouteError() as Error;

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <ButtonLink to="-1">&larr; Go back</ButtonLink>
    </div>
  );
}

export default NotFound;
