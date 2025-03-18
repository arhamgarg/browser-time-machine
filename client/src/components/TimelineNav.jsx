import React from 'react';
import { motion } from 'framer-motion';
import '../styles/timeline.css';

function TimelineNav({ eras, selectedEra, onSelectEra }) {
  if (!eras || eras.length === 0) {
    return <div className="timeline-loading">Loading timeline...</div>;
  }
  
  return (
    <div className="timeline-nav">
      <div className="timeline-track">
        {eras.map((era, index) => (
          <motion.div
            key={era.id}
            className={`timeline-era ${selectedEra === era.id ? 'active' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectEra(era.id)}
          >
            <div className="timeline-era-marker"></div>
            <div className="timeline-era-content">
              <h3 className="timeline-era-name">{era.name}</h3>
              <p className="timeline-era-years">{era.id}</p>
              <p className="timeline-era-browser">{era.browser}</p>
            </div>
          </motion.div>
        ))}
        
        <div className="timeline-line"></div>
      </div>
      
      <div className="timeline-description">
        {selectedEra && (
          <div className="timeline-selected-era">
            <h2>{eras.find(era => era.id === selectedEra)?.name}</h2>
            <p>Dominant Browser: {eras.find(era => era.id === selectedEra)?.browser}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TimelineNav;
