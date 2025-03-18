import React from 'react';
import '../../styles/browser-ui/chrome.css';

function ChromeUI({ loading, content }) {
  return (
    <div className="chrome-browser">
      <div className="chrome-titlebar">
        <div className="chrome-tabs">
          <div className="chrome-tab active">
            <div className="chrome-tab-favicon"></div>
            <div className="chrome-tab-title">
              {content ? content.title : 'New Tab'}
            </div>
            <div className="chrome-tab-close">×</div>
          </div>
          <div className="chrome-new-tab">+</div>
        </div>
        <div className="chrome-window-controls">
          <span className="chrome-control minimize">─</span>
          <span className="chrome-control maximize">□</span>
          <span className="chrome-control close">×</span>
        </div>
      </div>
      
      <div className="chrome-toolbar">
        <div className="chrome-navigation">
          <button className="chrome-button chrome-back">◀</button>
          <button className="chrome-button chrome-forward">▶</button>
          <button className="chrome-button chrome-reload">↻</button>
        </div>
        
        <div className="chrome-omnibox">
          <div className="chrome-security-icon"></div>
          <input 
            type="text" 
            className="chrome-url-input" 
            value={content ? `https://www.${content.file.replace('.html', '')}.com/` : ''} 
            readOnly 
          />
          <div className="chrome-star-icon">☆</div>
        </div>
        
        <div className="chrome-actions">
          <button className="chrome-button chrome-menu">⋮</button>
        </div>
      </div>
      
      <div className="chrome-content">
        {loading ? (
          <div className="chrome-loading">
            <div className="chrome-spinner"></div>
            <div className="chrome-loading-text">Loading...</div>
          </div>
        ) : (
          <iframe 
            src={content ? `/recreated/${content.file}` : ''} 
            title="Chrome Content"
            className="chrome-iframe"
          ></iframe>
        )}
      </div>
      
      <div className="chrome-statusbar">
        <div className="chrome-status-text">
          {loading ? `Waiting for ${content ? content.file.replace('.html', '.com') : 'website'}...` : ''}
        </div>
      </div>
    </div>
  );
}

export default ChromeUI;
