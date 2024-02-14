import { useSelector } from "react-redux";
import { RootState } from "../../store.ts";

export default function UserName() {
  const username = useSelector((state: RootState) => state.user.username);

  if (!username) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}
