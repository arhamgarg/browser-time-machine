import React, { useState, useEffect } from 'react';

function TechSpecs({ era }) {
  const [specs, setSpecs] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/api/techSpecs?era=${era}`)
      .then((res) => res.json())
      .then((data) => setSpecs(data))
      .catch((err) => console.error('Error fetching specs:', err));
  }, [era]);

  if (!specs) return <div className="loading">Loading specs...</div>;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`tech-specs ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="tech-specs-header" onClick={toggleExpand}>
        <h2>Tech Specs for {era}</h2>
        <span className="expand-toggle">{isExpanded ? '▼' : '▶'}</span>
      </div>
      
      {isExpanded && (
        <div className="tech-specs-content">
          <p><strong>HTML Features:</strong> {specs.html}</p>
          <p><strong>Screen Resolution:</strong> {specs.screenSize}</p>
          <p><strong>Connection Speed:</strong> {specs.speed}</p>
          <p><strong>Browser Market Share:</strong> {specs.browserShare}</p>
          
          {specs.webFeatures && (
            <p><strong>Common Web Features:</strong> {specs.webFeatures}</p>
          )}
          
          {specs.colorDepth && (
            <p><strong>Color Depth:</strong> {specs.colorDepth}</p>
          )}
          
          {specs.plugins && (
            <p><strong>Browser Plugins:</strong> {specs.plugins}</p>
          )}
          
          <div className="tech-specs-tip">
            <small>These specifications represent typical configurations during this era.</small>
          </div>
        </div>
      )}
    </div>
  );
}

export default TechSpecs;