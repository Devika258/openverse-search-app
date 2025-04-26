import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [query, setQuery] = useState('');
  const [media, setMedia] = useState([]);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false); // NEW loading state

  const handleSearch = async () => {
    setError('');
    setMedia([]);
    setSearched(true);
    setLoading(true); // Start loading when search begins

    const token = localStorage.getItem('token');
    console.log("Token:", token);

    if (!token) {
      setError('You must be logged in to search.');
      setLoading(false); // Stop loading if no token
      return;
    }

    const url = `${process.env.REACT_APP_API_URL}/search/media?q=${query}`;
    console.log("🔍 Requesting:", url);

    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Response:", res.data);
      setMedia(res.data.results || []);
    } catch (err) {
      console.error("Search error:", err);
      setError('Failed to fetch results. Please try again.');
    } finally {
      setLoading(false); // Always stop loading after try-catch
    }
  };

  return (
    <div className="container text-center mt-5">
      <h2 className="mb-4">Openverse Media Search</h2>

      <div className="d-flex justify-content-center mb-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="form-control w-50"
          placeholder="Search media..."
        />
        <button
          className="btn btn-secondary ms-2"
          onClick={handleSearch}
          disabled={loading}  // Disable button while loading
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <p className="text-danger">{error}</p>}
      {!error && searched && !loading && media.length === 0 && (
        <p className="text-muted">No results found.</p>
      )}

      {loading && (
        <div className="mt-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <div className="d-flex flex-wrap justify-content-center">
        {media.map((item, index) => (
          <div key={index} className="m-2 border p-2" style={{ width: '220px' }}>
            <img
              src={item.thumbnail}
              alt={item.title}
              className="img-fluid mb-2"
              style={{ height: '140px', objectFit: 'cover', width: '100%' }}
            />
            <p className="fw-bold small">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
