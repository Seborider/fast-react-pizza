import { Link, To, useNavigate } from "react-router-dom";
import React from "react";

interface ButtonLinkProps {
  children: React.ReactNode;
  to: To;
}

export default function ButtonLink({ children, to }: ButtonLinkProps) {
  const navigate = useNavigate();
  const className = "text-sm text-blue-500 hover:text-blue-600";
  if (to === "-1")
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}
