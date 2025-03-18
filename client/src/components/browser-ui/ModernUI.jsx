import React from 'react';
import '../../styles/browser-ui/modern.css';

function ModernUI({ loading, content }) {
  return (
    <div className="modern-browser">
      <div className="modern-titlebar">
        <div className="modern-tabs">
          <div className="modern-tab active">
            <div className="modern-tab-favicon"></div>
            <div className="modern-tab-title">
              {content ? content.title : 'New Tab'}
            </div>
            <div className="modern-tab-close">×</div>
          </div>
          <div className="modern-new-tab">+</div>
        </div>
        <div className="modern-window-controls">
          <span className="modern-control minimize">─</span>
          <span className="modern-control maximize">□</span>
          <span className="modern-control close">×</span>
        </div>
      </div>
      
      <div className="modern-toolbar">
        <div className="modern-navigation">
          <button className="modern-button modern-back" disabled={loading}>◀</button>
          <button className="modern-button modern-forward" disabled={loading}>▶</button>
          <button className="modern-button modern-reload" disabled={loading}>↻</button>
        </div>
        
        <div className="modern-omnibox">
          <div className="modern-security-icon">🔒</div>
          <input 
            type="text" 
            className="modern-url-input" 
            value={content ? `https://www.${content.file.replace('.html', '')}.com/` : 'https://www.example.com/'} 
            readOnly 
          />
        </div>
        
        <div className="modern-actions">
          <button className="modern-button modern-extensions">⋮</button>
          <button className="modern-button modern-profile">👤</button>
          <button className="modern-button modern-menu">⋮</button>
        </div>
      </div>
      
      <div className="modern-content">
        {loading ? (
          <div className="modern-loading">
            <div className="modern-spinner"></div>
            <div className="modern-loading-bar"></div>
          </div>
        ) : (
          <iframe 
            src={content ? `/recreated/${content.file}` : ''} 
            title="Modern Browser Content"
            className="modern-iframe"
          ></iframe>
        )}
      </div>
      
      <div className="modern-devtools">
        <div className="modern-devtools-tabs">
          <div className="modern-devtools-tab active">Elements</div>
          <div className="modern-devtools-tab">Console</div>
          <div className="modern-devtools-tab">Sources</div>
          <div className="modern-devtools-tab">Network</div>
          <div className="modern-devtools-tab">Performance</div>
        </div>
        <div className="modern-devtools-content">
          <div className="modern-devtools-code">
            <pre>
              {`<html>
  <head>
    <title>${content ? content.title : 'Example'}</title>
  </head>
  <body>
    <!-- Content here -->
  </body>
</html>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModernUI;
