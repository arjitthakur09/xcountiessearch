import React, { useEffect, useState } from 'react';
import './App.css';
import CountryCard from './CountryCard';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://countries-search-data-prod-812920491762.asia-south1.run.app/countries')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => setCountries(data))
      .catch((err) => {
        console.error('Error fetching countries:', err);
        setError(err.message);
      });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country?.common?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>Countries List</h1>
      <input
        type="text"
        placeholder="Search for countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="countries-list">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, index) => (
            <CountryCard key={country.common + index} country={country} />
          ))
        ) : (
          <p className="no-match">No countries match your search.</p>
        )}
      </div>

      {error && <p className="error">Failed to load countries.</p>}
    </div>
  );
}

export default App;