"use client";
import Link from "next/link";
import { useState } from "react";
import SearchButton from "../globalsearch/SearchButton";
import FinePrint from "../text/FinePrint";

const NavBar = () => {
  const [toggleOverlay, setToggleOverlay] = useState(false);

  const showOverlay = () => {
    setToggleOverlay(!setToggleOverlay);
  };

  return (
    <>
      <div className="nav-wrapper">
        <div className="nav-main-buttons-wrapper">
          <Link href={`/`} className="clickable-logo">
            <img
              src="/static/images/logo.svg"
              width="25"
              height="25"
              alt="arcadia logo"
              className="arcadia-logo"
            />
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
        <FinePrint text="Certain parts of the site are currently down due to API issues" />
      </div>
    </>
  );
};

export default NavBar;
