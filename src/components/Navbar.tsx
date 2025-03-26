import Image from "next/image";
import React from "react";

type Props = {};

export const Navbar = (props: Props) => {
  return (
    <header>
      <div className="navbar fixed top-0 left-0 z-50 w-full bg-black text-white">
        <div className="flex items-center justify-between p-2 md:p-4">
          {/* Hamburger menu button */}
          <button className="p-2">Button</button>

          {/* Centered logo */}
          <div className="absolute left-1/2 -translate-x-1/2 transform">
            <Image
              src="/logo.svg"
              alt="Côte Royale"
              width={180}
              height={30}
              className="w-32 md:w-44"
            />
          </div>
          {/* Nav Icons */}
          <div className="flex items-center gap-8">Icons</div>
        </div>
      </div>
    </header>
  );
};
