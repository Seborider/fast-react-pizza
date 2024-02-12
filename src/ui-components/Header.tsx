import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder.tsx';
import UserName from '../features/user/UserName.tsx';

export default function Header() {
  return (
    <header className="bg-yellow-500 uppercase">
      <Link to="/" className="tracking-widest">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}
