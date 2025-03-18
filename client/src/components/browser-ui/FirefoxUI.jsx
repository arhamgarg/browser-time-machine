import React from 'react';
import '../../styles/browser-ui/firefox.css';

function FirefoxUI({ loading, content }) {
  return (
    <div className="firefox-browser">
      <div className="firefox-titlebar">
        <div className="firefox-title">
          {content ? content.title : 'Mozilla Firefox'} - Mozilla Firefox
        </div>
        <div className="firefox-window-controls">
          <span className="firefox-control minimize">_</span>
          <span className="firefox-control maximize">□</span>
          <span className="firefox-control close">X</span>
        </div>
      </div>
      
      <div className="firefox-menubar">
        <span className="firefox-menu-item">File</span>
        <span className="firefox-menu-item">Edit</span>
        <span className="firefox-menu-item">View</span>
        <span className="firefox-menu-item">History</span>
        <span className="firefox-menu-item">Bookmarks</span>
        <span className="firefox-menu-item">Tools</span>
        <span className="firefox-menu-item">Help</span>
      </div>
      
      <div className="firefox-toolbar">
        <button className="firefox-button firefox-back">◄</button>
        <button className="firefox-button firefox-forward">►</button>
        <button className="firefox-button firefox-reload">↻</button>
        <button className="firefox-button firefox-stop">■</button>
        <button className="firefox-button firefox-home">🏠</button>
        
        <div className="firefox-url-bar">
          <input 
            type="text" 
            className="firefox-url-input" 
            value={content ? `http://www.${content.file.replace('.html', '')}.com/` : ''} 
            readOnly 
          />
          <div className="firefox-favicon"></div>
          <button className="firefox-go-button">Go</button>
        </div>
        
        <button className="firefox-button firefox-bookmarks">☆</button>
      </div>
      
      <div className="firefox-tab-bar">
        <div className="firefox-tab active">
          <div className="firefox-tab-favicon"></div>
          <div className="firefox-tab-title">
            {content ? content.title : 'New Tab'}
          </div>
          <div className="firefox-tab-close">×</div>
        </div>
        <div className="firefox-new-tab">+</div>
      </div>
      
      <div className="firefox-content">
        {loading ? (
          <div className="firefox-loading">
            <div className="firefox-throbber"></div>
            <div className="firefox-loading-text">Loading...</div>
          </div>
        ) : (
          <iframe 
            src={content ? `/recreated/${content.file}` : ''} 
            title="Firefox Content"
            className="firefox-iframe"
          ></iframe>
        )}
      </div>
      
      <div className="firefox-statusbar">
        <div className="firefox-status-text">
          {loading ? 'Transferring data from www.example.com...' : 'Done'}
        </div>
        <div className="firefox-security">
          <div className="firefox-security-icon"></div>
        </div>
      </div>
    </div>
  );
}

export default FirefoxUI;
