import React, { useState } from 'react';

const SearchBar = ({ setResults }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    setResults([]);

    if (!query.trim()) {
      setError('Please enter a search term.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication token not found. Please login.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/search/media?q=${encodeURIComponent(query)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to fetch results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center my-4">
      <input
        className="form-control d-inline w-auto me-2"
        placeholder="Search Openverse media..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button className="btn btn-outline-dark" onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
};

export default SearchBar;
