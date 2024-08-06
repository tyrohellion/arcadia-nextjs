import React from "react";
import Link from "next/link";
import Image from "next/image";
import FinePrintTagWrapped from "../tags/FinePrintTagWrapped";
import FinePrint from "../text/FinePrint";
import SmallTextBlue from "../text/SmallTextBlue";

const PlayerCardSearch = ({ id, tag, name, image, team, country, role }) => {
  return (
    <div className="player-card">
      <Link href={`/players/${id}`} />
      <div className="main-card-content-wrapper">
        <div className="card-tag-name-wrapper">
          <h2 className="card-small-heading-text">{tag}</h2>
          <FinePrint text={name} />
        </div>
        <Image src={image} width={50} height={50} alt={team} />
        <SmallTextBlue text={team} />
      </div>
      <div className="card-tags-wrapper">
        <FinePrintTagWrapped text={country} />
        <FinePrintTagWrapped text={role} />
      </div>
    </div>
  );
};

export default PlayerCardSearch;
