import React from 'react';
import './CountryCard.css';

function CountryCard({ country }) {
  return (
    <div className="countryCard">
      <img src={country.png} alt={`Flag of ${country.common}`} className="flag" />
      <p className="countryName">{country.common}</p>
    </div>
  );
}

export default CountryCard;
    