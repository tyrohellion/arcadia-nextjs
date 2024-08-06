import React from "react";
import Link from "next/link";
import Image from "next/image";
import FinePrintTagWrapped from "../tags/FinePrintTagWrapped";

const TeamCardSearch = ({ id, name, image, region }) => {
  return (
    <div className="player-card">
      <Link href={`/teams/${id}`} />
      <div className="main-card-content-wrapper">
        <div className="card-tag-name-wrapper">
        <h2 className="card-small-heading-text">{name}</h2>
        </div>
        <Image src={image} width={50} height={50} alt={name} />
      </div>
      <div className="card-tags-wrapper">
        <FinePrintTagWrapped text={region} />
      </div>
    </div>
  );
};

export default TeamCardSearch;
