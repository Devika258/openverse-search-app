import React from 'react';

const MediaResults = ({ results }) => {
  if (!results || results.length === 0) {
    return <p className="text-center mt-4">No results found.</p>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {results.map((media, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div className="card h-100 shadow-sm">
              <img
                src={media.url}
                alt={media.title || 'Untitled image'}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <p className="card-text text-center">
                  {media.title || 'Untitled image'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaResults;