"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchButton from "../globalsearch/SearchButton";

const NavBar = () => {
  const router = useRouter();
  const [toggleOverlay, setToggleOverlay] = useState(false);

  const showOverlay = () => {
    setToggleOverlay(!setToggleOverlay);
  };


  return (
    <>
      <div className="nav-wrapper">
        <div
          className="nav-item"
          onClick={(handleClick) => {
            router.push("/");
          }}
        >
          Home
        </div>
        <div
          className="nav-item"
          onClick={(handleClick) => {
            router.push("/players");
          }}
        >
          Players
        </div>
          <SearchButton />
        <div
          className="nav-item"
          onClick={(handleClick) => {
            router.push("/events");
          }}
        >
          Events
        </div>
        <div
          className="nav-item"
          onClick={(handleClick) => {
            router.push("/teams");
          }}
        >
          Teams
        </div>
      </div>
    </>
  );
};

export default NavBar;
