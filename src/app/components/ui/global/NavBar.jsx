"use client";
import Link from "next/link";
import { useState } from "react";
import SearchButton from "../globalsearch/SearchButton";

const NavBar = () => {
  const [toggleOverlay, setToggleOverlay] = useState(false);

  const showOverlay = () => {
    setToggleOverlay(!setToggleOverlay);
  };

  return (
    <>
      <div className="nav-wrapper">
        <div className="nav-item">
          <Link href={`/`} />
          Home
        </div>
        <div className="nav-item">
          <Link href={`/players`} />
          Players
        </div>
        <SearchButton />
        <div className="nav-item">
          <Link href={`/events`} />
          Events
        </div>
        <div className="nav-item">
          <Link href={`/teams`} />
          Teams
        </div>
      </div>
    </>
  );
};

export default NavBar;
