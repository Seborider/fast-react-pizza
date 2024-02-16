import { useSelector } from "react-redux";
import { getUser } from "./userSlice.ts";

export default function UserName() {
  const { username } = useSelector(getUser);

  if (!username) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}
