import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const CountryCard = ({ name, flags }) => (
  <div className="card">
    <img src={flags.png} alt={`Flag of ${name}`} />
    <h2>{name.common}</h2>
    <p>{name.official}</p>
  </div>
);

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  React.useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div id="root">
        {filteredCountries.map((country) => (
          <CountryCard key={country.cca3} {...country} />
        ))}
      </div>
    </div>
  );
};

export default App;