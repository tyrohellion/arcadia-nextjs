'use client'
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();

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
        <div
          className="nav-item"
          onClick={(handleClick) => {
            router.push("/players");
          }}
        >
          Search
        </div>
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
