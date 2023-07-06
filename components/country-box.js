import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function index(props) {
  const [countryDetails, setCountriesDetails] = useState(props?.country);

  function calcTime(Country, offset) {
    let len = offset.length;

    let newstring = offset.substring(3, len + 1);

    let offset1 = newstring.replace(":", ".");

    let d = new Date();

    let utc = d.getTime() + d.getTimezoneOffset() * 60000;

    let nd = new Date(utc + 3600000 * offset1);

    let mytime = " " + nd.toLocaleString();

    // setcurrentdate(mytime);

    return mytime;
  }

  useEffect(() => {
    setCountriesDetails(props?.country);
  }, [props]);
  return (
    <div className="box">
      <div className="img-box">
        <img src={countryDetails.flags.svg} alt="" className="country-flag" />
      </div>

      <div className="country-info">
        <h6>{countryDetails?.name?.common}</h6>

        <p>
          Currencies :
          {countryDetails?.currencies
            ? Object.values(countryDetails.currencies).join(", ")
            : "-"}
        </p>

        <p>
          Current date and time :{" "}
          {calcTime(countryDetails?.name?.common, countryDetails?.timezones[0])}
          {/* {`${formattedDateTime}`} */}
        </p>

        <button className="showmapbtn">
          <Link
            href={countryDetails.maps.googleMaps}
            target="_blank"
            className="showfont"
          >
            Show Map
          </Link>
        </button>

        <button className="showmapbtn">
          <Link
            href={`/details/${countryDetails?.cca3}`}
            target="_blank"
            className="showfont"
          >
            Details
          </Link>
        </button>
      </div>
    </div>
  );
}
