import React from "react";
import Link from "next/link";
import FinePrintTagWrapped from "../tags/FinePrintTagWrapped";

const TeamCardSearch = ({ id, name, image, region }) => {
  return (
    <div className="player-card">
      <Link href={`/teams/${id}`} />
      <div className="main-card-content-wrapper">
        <div className="card-tag-name-wrapper">
        <h2 className="card-small-heading-text">{name}</h2>
        </div>
        <img src={image} alt={name} />
      </div>
      <div className="card-tags-wrapper">
        <FinePrintTagWrapped text={region} />
      </div>
    </div>
  );
};

export default TeamCardSearch;
