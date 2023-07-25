"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import "@/css/navbar.css";

const Navbar = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const handleSearch = () => {
    console.log(search);
    router.push(`/pokemon/${search}`);
  };

  return (
    <div id="navbar">
      <div
        id="navbar-logo"
        onClick={() => {
          router.push("/");
        }}
      >
        <Image src="/logo.png" width={60} height={60} alt="PokeBook Logo" />
        <p>PokeBook</p>
      </div>
      <input
        type="text"
        id="navbar_search"
        placeholder="Name or ID"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        onBlur={handleSearch}
      />
    </div>
  );
};

export default Navbar;
