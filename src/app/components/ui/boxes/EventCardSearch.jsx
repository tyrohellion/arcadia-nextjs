import React from "react";
import Link from "next/link";
import Image from "next/image";
import FinePrintTagWrapped from "../tags/FinePrintTagWrapped";
import FinePrint from "../text/FinePrint";
import prettyDate from "../api/prettyDate";
import PrizePoolFormatter from "../api/PrizePoolFormatter";

const EventCardSearch = ({
  id,
  name,
  image,
  region,
  tier,
  date,
  prize,
  prizeUnit,
  mode
}) => {
  let prizeString = PrizePoolFormatter(prize, prizeUnit);
  return (
    <div className="event-card">
      <Link href={`/events/${id}`} />
      <div className="main-card-content-wrapper">
        <div className="card-tag-name-wrapper">
          <h2 className="card-small-heading-text">{name}</h2>
          <FinePrint text={prizeString} />
          <FinePrint text={prettyDate(date)} />
        </div>
        <Image src={image} width={50} height={50} alt={name} />
      </div>
      <div className="card-tags-wrapper">
        <FinePrintTagWrapped text={region} />
        <FinePrintTagWrapped text={tier} />
        <FinePrintTagWrapped text={mode + "v" + mode} />
      </div>
    </div>
  );
};

export default EventCardSearch;
