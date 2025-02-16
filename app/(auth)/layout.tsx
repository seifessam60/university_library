import Image from "next/image";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row items-center gap-3">
            <Image src={"/icons/logo.svg"} alt="logo" width={37} height={37} />
            <h1 className="text-2xl font-semibold text-white">BookWise</h1>
          </div>
          <div>{children}</div>
        </div>
      </section>
      <div className="auth-illustration">
        <Image
          src={"/images/auth-illustration.png"}
          alt={"auth illustration"}
          fill
          className={"object-cover size-full"}
        />
      </div>
    </main>
  );
};

export default layout;
