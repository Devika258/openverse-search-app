import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ setResults }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    const token = localStorage.getItem('token');

    if (!token) {
      setError('You must be logged in to search.');
      return;
    }

    try {
      const url = `${process.env.REACT_APP_API_URL}/search/media?q=${query}`;
      console.log("🔍 Searching:", url);

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("Search results:", response.data);
      setResults(response.data.results || []);
    } catch (err) {
      console.error("Search error:", err.response?.data || err.message);
      setError('Failed to fetch results. Please try again.');
      setResults([]);
    }
  };

  return (
    <div className="text-center mb-4">
      <input
        type="text"
        className="form-control d-inline w-50"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search media..."
      />
      <button className="btn btn-primary ms-2" onClick={handleSearch}>Search</button>
      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
};

export default SearchBar;