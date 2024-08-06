"use client";
import Link from "next/link";
import Image from "next/image";
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
        <Link href={`/`} className="clickable-logo">
          <Image src="/static/images/logo.svg" width={25} height={25} alt="arcadia logo" className="arcadia-logo" />
        </Link>
        <div className="nav-inner-wrapper">
          <div className="nav-item-home">
            <Link href={`/`} />
            Home
          </div>
          <div className="nav-item">
            <Link href={`/players`} />
            Players
          </div>
          <div className="nav-item">
            <Link href={`/events`} />
            Events
          </div>
          <div className="nav-item">
            <Link href={`/teams`} />
            Teams
          </div>
        </div>
        <SearchButton />
      </div>
    </>
  );
};

export default NavBar;
