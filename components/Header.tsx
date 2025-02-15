"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const pathName = usePathname();
  return (
    <header className={"my-10 flex justify-between gap-5"}>
      <Link href={"/"}>
        <Image src={"./icons/logo.svg"} alt={"logo"} width={40} height={40} />
      </Link>
      <ul className={"flex flex-row items-center gap-8"}>
        <li
          className={cn(
            "capitalize cursor-pointer text-base",
            pathName === "/library" ? "text-light-200" : "text-light-100",
          )}
        >
          <Link href={"/library"}>Library</Link>
        </li>
      </ul>
    </header>
  );
};
export default Header;
