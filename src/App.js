import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
        );
        const rawData = await response.json();
        console.log("Raw data:", rawData);

        // ✅ Extract actual countries array from response
        const actualData = Array.isArray(rawData)
          ? rawData
          : rawData.data || rawData.countries || [];

        if (Array.isArray(actualData) && actualData.length > 0) {
          setCountries(actualData);
        } else {
          console.error("No valid countries found in API response");
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) => {
    const name =
      typeof country.name === "string"
        ? country.name
        : country.name?.common;

    return (
      name &&
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="App">
      <h1>Countries of the World</h1>
      <input
        type="text"
        placeholder="Search country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="searchBar"
      />
      <div className="countryContainer">
        {filteredCountries.length === 0 ? (
          <p>No matching countries</p>
        ) : (
          filteredCountries.map((country, index) => {
            const name =
              typeof country.name === "string"
                ? country.name
                : country.name?.common;

            const flag =
              typeof country.flag === "string"
                ? country.flag
                : country.flags?.png;

            return (
              <div key={index} className="countryCard">
                <img
                  src={flag || "https://via.placeholder.com/150"}
                  alt={name || "Flag"}
                />
                <p>{name || "No name"}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
