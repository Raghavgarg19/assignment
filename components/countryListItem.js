import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function index(props) {
  const [countryDetails, setCountriesDetails] = useState(props?.country);

  const countrytime = (timezone) => {
    var currentTime = new Date();

    var offsetMinutes = currentTime.getTimezoneOffset();

    var utcOffset = timezone.replace("UTC", "").trim();

    var desiredOffsetMinutes =
      parseInt(utcOffset.split(":")[0]) * 60 +
      parseInt(utcOffset.split(":")[1]);

    var totalOffsetMinutes = offsetMinutes + desiredOffsetMinutes;

    if (isNaN(totalOffsetMinutes)) {
      return "No time available";
    } else {
      var offsetMilliseconds = totalOffsetMinutes * 60 * 1000;

      var convertedTime = new Date(currentTime.getTime() + offsetMilliseconds);

      // Extract the date, month, and year from the converted time

      var convertedDate = convertedTime.getDate();

      var convertedMonthIndex = convertedTime.getMonth();

      var convertedYear = convertedTime.getFullYear();

      // Format the date with "th" or "st" suffix

      var dateSuffix = getNumberWithSuffix(convertedDate);

      var formattedDate = convertedDate + dateSuffix;

      // Get the month name

      var monthNames = [
        "January",

        "February",

        "March",

        "April",

        "May",

        "June",

        "July",

        "August",

        "September",

        "October",

        "November",

        "December",
      ];

      var convertedMonth = monthNames[convertedMonthIndex];

      // Extract the hour and minute from the converted time

      var convertedHour = ("0" + convertedTime.getHours()).slice(-2);

      var convertedMinute = ("0" + convertedTime.getMinutes()).slice(-2);

      // Display the converted date and time in the desired format

      var convertedDateTime =
        formattedDate +
        " " +
        convertedMonth +
        " " +
        convertedYear +
        ", " +
        convertedHour +
        ":" +
        convertedMinute;

      return convertedDateTime;

      // Helper function to get the suffix for the date

      function getNumberWithSuffix(number) {
        var suffix = "th";

        if (number === 1 || number === 21 || number === 31) {
          suffix = "st";
        } else if (number === 2 || number === 22) {
          suffix = "nd";
        } else if (number === 3 || number === 23) {
          suffix = "rd";
        }

        return suffix;
      }
    }
  };

  useEffect(() => {
    setCountriesDetails(props?.country);
    // console.log()
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
            ? Object.values(countryDetails.currencies)[0].name
            : "-"}
        </p>

        <p>
          Current date and time : {countrytime(countryDetails.timezones[0])}
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
