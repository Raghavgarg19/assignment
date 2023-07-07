import React, { useState, useEffect } from "react";
import CountryListItem from "../components/countryListItem";

export default function index() {
  const [countries, setCountries] = useState([]);

  const [countriesSearch, setCountriesSearch] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");

      const data = await response.json();
      console.log(data);

      const filteredData = [];

      data?.map((elem) => {
        const obj = {
          name: elem?.name,

          tld: elem?.tld,

          cca2: elem?.cca2,

          ccn3: elem?.ccn3,

          cca3: elem?.cca3,

          cioc: elem?.cioc,

          independent: elem?.independent,

          status: elem?.status,

          unMember: elem?.unMember,

          currencies: elem?.currencies,

          idd: elem?.idd,

          capital: elem?.capital,

          altSpellings: elem?.altSpellings,

          region: elem?.region,

          subregion: elem?.subregion,

          languages: elem?.languages,

          translations: elem?.translations,

          latlng: elem?.latlng,

          landlocked: elem?.landlocked,

          borders: elem?.borders,

          area: elem?.area,

          demonyms: elem?.demonyms,

          flag: elem?.flag,

          maps: elem?.maps,

          population: elem?.population,

          gini: elem?.gini,

          fifa: elem?.fifa,

          car: elem?.car,

          timezones: elem?.timezones[0],

          continents: elem?.continents,

          flags: elem?.flags,

          coatOfArms: elem?.coatOfArms,

          startOfWeek: elem?.startOfWeek,

          capitalInfo: elem?.capitalInfo,

          postalCode: elem?.postalCode,

          visibility: true,
        };

        filteredData?.push(obj);
      });

      console.log(data);

      setCountries(data);
      console.log(countries);

      setCountriesSearch(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const currentDate = new Date();

  // Get the day, month, year, hours, and minutes from the Date object
  const day = currentDate.getDate();
  const monthIndex = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  // Array of month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Format the day with appropriate suffix (e.g., "23rd")
  const formattedDay = day + getDaySuffix(day);

  // Get the month name
  const month = monthNames[monthIndex];

  // Format the time with leading zeros if needed
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  // Construct the final formatted date and time string
  const formattedDateTime = `${formattedDay} ${month} ${year}, ${formattedHours}:${formattedMinutes}`;

  // Function to get the day suffix (e.g., "23rd")
  function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {

      return "th";
    }

    const lastDigit = day % 10;
    switch (lastDigit) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  const searchCountry = (value) => {
    const countriesData = countriesSearch;

    countriesData?.map((elem) => {
      if (value) {
        if (elem?.name?.common?.toLowerCase().includes(value?.toLowerCase())) {
          elem.visibility = true;
        } else {
          elem.visibility = false;
        }
      } else {
        elem.visibility = true;
      }
    });

    const countriesData2 = countriesData?.filter(
      (elem) => elem?.visibility === true
    );

    setCountries(countriesData2);
  };

  return (
    <>
      <div>
        <div className="countryheading">
          <h2>Countries</h2>
        </div>

        <div className="my-search">
          <div className="search">
            <input
              className="my-search"
              type="text"
              placeholder="Search countries"
              onChange={(event) => searchCountry(event.target.value)}
            />
          </div>
        </div>

        {console.log(countries, "countries Vsis")}

        <div className="container">
          {countries?.map((country) => {
            return (
              <CountryListItem country={country}/>
            );
          })}
        </div>
      </div>
    </>
  );
}
