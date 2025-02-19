import React from "react";

const page = () => {
  return (
    <main className="root-container flex flex-col items-center justify-center min-h-screen">
      <h1 className="font-bebas-neue text-5xl text-light-100 font-bold">
        Whoa there, Speedster! 🚀
      </h1>
      <p className=" text-light-400 max-w-xl mt-3 text-center">
        It looks like you're moving a bit too fast for us to keep up. To ensure
        a smooth experience for everyone, we have implemented rate limiting.
        This helps maintain our service quality and keeps things running
        smoothly.
      </p>
    </main>
  );
};

export default page;
