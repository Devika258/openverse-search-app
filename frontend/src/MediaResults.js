import React from 'react';

const MediaResults = ({ results }) => {
    return (
        <div>
            {results.map((media, index) => (
                <div key={index}>
                    <img src={media.url} alt={media.title} width="200px" />
                    <p>{media.title}</p>
                </div>
            ))}
        </div>
    );
};

export default MediaResults;
