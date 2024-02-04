import { useNavigate, useRouteError } from "react-router-dom";

interface Error {
  data: string;
  message: string;
}

function NotFound() {
  const navigate = useNavigate();
  const error: Error = useRouteError() as Error;

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default NotFound;
