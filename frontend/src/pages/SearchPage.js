import React, { useState } from 'react';
import axios from 'axios';
import { Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

const SearchPage = () => {
  const [searchInput, setSearchInput] = useState('');
  const [mediaResults, setMediaResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const performMediaSearch = async (searchTerm) => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get(`https://api.openverse.engineering/v1/images/?q=${searchTerm}`);
      setMediaResults(res.data.results || []);
    } catch (error) {
      console.error('Error fetching media:', error);
      setError('Failed to fetch media. Please try again later.');
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    await performMediaSearch(searchInput.trim());
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: 'url("/search-background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Search Heading */}
      <h1 className="mb-4 text-white" style={{ textShadow: '1px 1px 5px rgba(0,0,0,0.7)' }}>
        Openverse Media Search
      </h1>

      {/* Search Form */}
      <Form onSubmit={handleSearchSubmit} className="mb-5 d-flex" style={{ maxWidth: '600px', width: '100%' }}>
        <Form.Control
          type="text"
          placeholder="Search Openverse media..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          required
          disabled={loading}
          style={{
            marginRight: '10px',
            borderRadius: '8px',
            padding: '12px',
          }}
        />
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          style={{
            borderRadius: '8px',
            padding: '12px 24px',
          }}
        >
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </Form>

      {/* Error Alert */}
      {error && (
        <Alert variant="danger" className="w-50 text-center">
          {error}
        </Alert>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* No Results Text */}
      {!loading && searched && mediaResults.length === 0 && !error && (
        <p className="text-center text-white">No results found.</p>
      )}

      {/* Media Results */}
      <Row className="justify-content-center w-100 px-4">
        {mediaResults.map((item) => (
          <Col md={4} lg={3} sm={6} xs={12} key={item.id} className="mb-4 d-flex">
            <Card className="h-100 shadow" style={{ width: '100%', borderRadius: '12px' }}>
              <Card.Img variant="top" src={item.url} alt={item.title || 'Image'} />
              <Card.Body>
                <Card.Title style={{ fontSize: '1rem' }}>{item.title || 'No Title'}</Card.Title>
                <Card.Text>
                  <a href={item.foreign_landing_url} target="_blank" rel="noreferrer">
                    View Source
                  </a>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SearchPage;
