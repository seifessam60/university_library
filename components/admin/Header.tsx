import { Session } from "next-auth";
import React from "react";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="admin-header">
      <div>
        <h2 className="text-2xl text-dark-400 font-semibold">
          {session?.user?.name}
        </h2>
        <p className="text-base text-slate-500">
          Monitor all of uour users and books here
        </p>
        <p>Search</p>
      </div>
    </header>
  );
};

export default Header;
