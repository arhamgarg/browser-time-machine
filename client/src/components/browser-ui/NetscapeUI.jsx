import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import '../../styles/browser-ui/netscape.css';

function NetscapeUI({ loading, content, error, progress, website, connectionSpeed }) {
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [urlInput, setUrlInput] = useState(website ? `http://www.${website.file.replace('.html', '')}.com/` : '');
  const iframeRef = useRef(null);
  
  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  const handleForward = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  const handleStop = () => {
    // Simulating stop loading
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src; // Force reload to stop
    }
  };
  
  const handleReload = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src; // Reload iframe
    }
  };
  
  const handleHome = () => {
    setUrlInput('http://www.netscape.com/');
    setTimeout(() => {
      setUrlInput(website ? `http://www.${website.file.replace('.html', '')}.com/` : '');
    }, 1000);
  };
  
  const handleToggleImages = () => {
    // Simulate turning images on/off
    const iframe = iframeRef.current;
    if (iframe && iframe.contentDocument) {
      const images = iframe.contentDocument.querySelectorAll('img');
      images.forEach(img => {
        img.style.display = img.style.display === 'none' ? 'block' : 'none';
      });
    }
  };
  
  const handlePrint = () => {
    alert('Netscape Navigator is sending your document to the printer...');
  };
  
  const handleFind = () => {
    setSearchVisible(!searchVisible);
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    const iframe = iframeRef.current;
    if (iframe && iframe.contentDocument) {
      // Simple text search simulation
      const textNodes = [];
      const walker = document.createTreeWalker(
        iframe.contentDocument.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );
      
      let node;
      while (node = walker.nextNode()) {
        if (node.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
          textNodes.push(node);
        }
      }
      
      // Highlight first match (simplified)
      if (textNodes.length > 0) {
        const range = document.createRange();
        range.selectNode(textNodes[0]);
        const selection = iframe.contentWindow.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        
        // Scroll to the match
        textNodes[0].parentNode.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      } else {
        alert('No matches found');
      }
    }
  };
  
  const handleUrlChange = (e) => {
    setUrlInput(e.target.value);
  };
  
  const handleUrlSubmit = (e) => {
    e.preventDefault();
    
    // Simulate visiting a new URL
    if (urlInput && urlInput !== (website ? `http://www.${website.file.replace('.html', '')}.com/` : '')) {
      // Add to history
      const newHistory = [...history.slice(0, currentIndex + 1), urlInput];
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
      
      // Simulate page load and then revert to current page
      setTimeout(() => {
        setUrlInput(website ? `http://www.${website.file.replace('.html', '')}.com/` : '');
      }, 1500);
      
      // Show "page not found" alert
      setTimeout(() => {
        alert('Error: The requested URL was not found on this server.');
      }, 1200);
    }
  };
  
  return (
    <div className="netscape-browser">
      <div className="netscape-toolbar">
        <div className="netscape-logo">
          <div className="netscape-n">N</div>
        </div>
        <div className="netscape-buttons">
          <button 
            className={`netscape-button ${currentIndex > 0 ? 'active' : 'disabled'}`} 
            onClick={handleBack}
          >
            Back
          </button>
          <button 
            className={`netscape-button ${currentIndex < history.length - 1 ? 'active' : 'disabled'}`} 
            onClick={handleForward}
          >
            Forward
          </button>
          <button className="netscape-button" onClick={handleHome}>Home</button>
          <button className="netscape-button" onClick={handleReload}>Reload</button>
          <button className="netscape-button" onClick={handleToggleImages}>Images</button>
          <button className="netscape-button" onClick={handlePrint}>Print</button>
          <button 
            className={`netscape-button ${searchVisible ? 'active' : ''}`} 
            onClick={handleFind}
          >
            Find
          </button>
          <button className="netscape-button" onClick={handleStop}>Stop</button>
          <button 
            className={`netscape-button ${isBookmarked ? 'active' : ''}`} 
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
        </div>
      </div>
      
      <div className="netscape-addressbar">
        <form onSubmit={handleUrlSubmit} style={{ display: 'flex', width: '100%' }}>
          <span className="netscape-location">Location:</span>
          <input 
            type="text" 
            className="netscape-url" 
            value={urlInput}
            onChange={handleUrlChange}
          />
          <button type="submit" className="netscape-go-button">Go</button>
        </form>
        <div className={`netscape-throbber ${loading ? 'throbbing' : ''}`}></div>
      </div>
      
      {searchVisible && (
        <div className="netscape-search-bar">
          <form onSubmit={handleSearch} style={{ display: 'flex', width: '100%' }}>
            <span className="netscape-search-label">Find:</span>
            <input 
              type="text" 
              className="netscape-search-input" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter text to search"
            />
            <button type="submit" className="netscape-search-button">Find Next</button>
            <button 
              type="button" 
              className="netscape-search-close" 
              onClick={() => setSearchVisible(false)}
            >
              ×
            </button>
          </form>
        </div>
      )}
      
      <div className="netscape-content">
        {loading ? (
          <div className="netscape-loading">
            <div className="netscape-loading-animation"></div>
            <div className="netscape-loading-text">
              Loading {Math.round(progress)}%... {connectionSpeed} connection
            </div>
          </div>
        ) : error ? (
          <div className="netscape-error">
            <div className="netscape-error-icon">!</div>
            <div className="netscape-error-text">
              Error: Connection Failed
            </div>
            <div className="netscape-error-message">
              {error}
            </div>
            <div className="netscape-error-help">
              <p>The document could not be loaded.</p>
              <p>Please check your connection and try again.</p>
            </div>
          </div>
        ) : content ? (
          <iframe 
            ref={iframeRef}
            src={content && content.file ? `/recreated/${content.file}` : ''} 
            title="Netscape Content"
            className="netscape-iframe"
          ></iframe>
        ) : (
          <div className="netscape-no-content">
            <p>Welcome to Netscape Navigator</p>
            <p>Please select a website to continue</p>
          </div>
        )}
      </div>
      
      <div className="netscape-statusbar">
        <div className="netscape-status">
          {loading ? `Opening ${website ? website.file.replace('.html', '.com') : 'page'}... (${Math.round(progress)}%)` : 
           error ? 'Error: Connection Failed' : 
           isBookmarked ? 'Bookmark added for this page' :
           searchVisible ? 'Find: Enter text to search' :
           'Document: Done'}
        </div>
        <div className="netscape-security">
          <div className="netscape-security-icon"></div>
        </div>
      </div>
    </div>
  );
}

export default NetscapeUI;
