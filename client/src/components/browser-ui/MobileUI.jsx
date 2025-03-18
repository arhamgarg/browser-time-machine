import React from 'react';
import '../../styles/browser-ui/mobile.css';

function MobileUI({ loading, content }) {
  return (
    <div className="mobile-browser">
      <div className="mobile-statusbar">
        <div className="mobile-time">12:34</div>
        <div className="mobile-icons">
          <span className="mobile-signal"></span>
          <span className="mobile-wifi"></span>
          <span className="mobile-battery"></span>
        </div>
      </div>
      
      <div className="mobile-addressbar">
        <div className="mobile-secure-icon"></div>
        <div className="mobile-url-display">
          {content ? `${content.file.replace('.html', '.com')}` : 'example.com'}
        </div>
        <div className="mobile-refresh-icon">↻</div>
      </div>
      
      <div className="mobile-content">
        {loading ? (
          <div className="mobile-loading">
            <div className="mobile-spinner"></div>
          </div>
        ) : (
          <iframe 
            src={content ? `/recreated/${content.file}` : ''} 
            title="Mobile Content"
            className="mobile-iframe"
          ></iframe>
        )}
      </div>
      
      <div className="mobile-toolbar">
        <div className="mobile-back">◀</div>
        <div className="mobile-forward">▶</div>
        <div className="mobile-home">○</div>
        <div className="mobile-tabs">□</div>
        <div className="mobile-menu">☰</div>
      </div>
    </div>
  );
}

export default MobileUI;
