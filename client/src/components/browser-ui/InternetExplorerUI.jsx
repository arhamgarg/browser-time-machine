import React, { useState, useRef } from 'react';
import '../../styles/browser-ui/ie.css';

function InternetExplorerUI({ loading, content, error, progress, website, connectionSpeed }) {
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const [addressValue, setAddressValue] = useState(content ? `http://www.${content?.file.replace('.html', '')}.com/` : '');
  const [showFindDialog, setShowFindDialog] = useState(false);
  const [findText, setFindText] = useState('');
  const iframeRef = useRef(null);
  
  // Simulate menu clicks
  const handleMenuClick = (menu) => {
    if (menuOpen === menu) {
      setMenuOpen(null);
    } else {
      setMenuOpen(menu);
    }
  };
  
  // Handle navigation
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
    // Simulate stopping page load
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };
  
  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };
  
  const handleHome = () => {
    setAddressValue('http://www.msn.com/');
    // Add to history
    const newHistory = [...history.slice(0, currentIndex + 1), 'http://www.msn.com/'];
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
    
    // Simulate navigation then return to actual content
    setTimeout(() => {
      setAddressValue(content ? `http://www.${content.file.replace('.html', '')}.com/` : '');
    }, 1500);
  };
  
  const handleSearch = () => {
    setAddressValue('http://search.msn.com/');
    // Simulate navigation then return to actual content
    setTimeout(() => {
      setAddressValue(content ? `http://www.${content.file.replace('.html', '')}.com/` : '');
    }, 1500);
  };
  
  const handleFavorites = () => {
    setIsFavorited(!isFavorited);
    if (!isFavorited) {
      alert('Page added to Favorites');
    } else {
      alert('Page removed from Favorites');
    }
  };
  
  const handleHistory = () => {
    alert('Browsing History:\n' + history.join('\n'));
  };
  
  const handleMail = () => {
    alert('Opening Outlook Express...');
  };
  
  const handlePrint = () => {
    alert('Printing page...');
  };
  
  const handleAddressChange = (e) => {
    setAddressValue(e.target.value);
  };
  
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    
    // Simulate visiting a new URL
    if (addressValue && addressValue !== (content ? `http://www.${content.file.replace('.html', '')}.com/` : '')) {
      // Add to history
      const newHistory = [...history.slice(0, currentIndex + 1), addressValue];
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
      
      // Simulate navigation then show error
      setTimeout(() => {
        alert('The page cannot be displayed\n\nThe page you are looking for is currently unavailable.');
        setAddressValue(content ? `http://www.${content.file.replace('.html', '')}.com/` : '');
      }, 1500);
    }
  };
  
  const handleFindInPage = () => {
    setShowFindDialog(!showFindDialog);
  };
  
  const handleFindSubmit = (e) => {
    e.preventDefault();
    if (!findText.trim()) return;
    
    const iframe = iframeRef.current;
    if (iframe && iframe.contentDocument) {
      // Simple search implementation
      const textNodes = [];
      const walker = document.createTreeWalker(
        iframe.contentDocument.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );
      
      let node;
      while (node = walker.nextNode()) {
        if (node.textContent.toLowerCase().includes(findText.toLowerCase())) {
          textNodes.push(node);
        }
      }
      
      if (textNodes.length > 0) {
        // Highlight the first occurrence
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
        
        alert(`Found ${textNodes.length} matches.`);
      } else {
        alert('Cannot find "' + findText + '"');
      }
    }
  };
  
  const renderMenuDropdown = () => {
    if (!menuOpen) return null;
    
    let menuItems = [];
    switch (menuOpen) {
      case 'File':
        menuItems = ['New', 'Open...', 'Save', 'Save As...', 'Print...', 'Properties', 'Work Offline', 'Close'];
        break;
      case 'Edit':
        menuItems = ['Cut', 'Copy', 'Paste', 'Select All', 'Find...'];
        break;
      case 'View':
        menuItems = ['Toolbars', 'Status Bar', 'Explorer Bar', 'Go To', 'Stop', 'Refresh', 'Text Size', 'Source'];
        break;
      case 'Favorites':
        menuItems = ['Add to Favorites...', 'Organize Favorites...', 'Links'];
        break;
      case 'Tools':
        menuItems = ['Mail and News', 'Synchronize...', 'Windows Update', 'Show Related Links', 'Internet Options...'];
        break;
      case 'Help':
        menuItems = ['Contents and Index', 'Tip of the Day', 'For Netscape Users', 'About Internet Explorer'];
        break;
      default:
        menuItems = [];
    }
    
    return (
      <div className="ie-menu-dropdown">
        {menuItems.map((item, index) => (
          <div 
            key={index} 
            className="ie-menu-dropdown-item"
            onClick={() => {
              if (item === 'Find...') {
                handleFindInPage();
              } else if (item === 'About Internet Explorer') {
                alert('Microsoft Internet Explorer 6.0\nCopyright 1995-2001 Microsoft Corporation.');
              } else if (item === 'Print...') {
                handlePrint();
              }
              setMenuOpen(null);
            }}
          >
            {item}
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="ie-browser">
      <div className="ie-titlebar">
        <div className="ie-title">
          {content ? content.title : 'Internet Explorer'} - Microsoft Internet Explorer
        </div>
        <div className="ie-window-controls">
          <span className="ie-control ie-minimize">_</span>
          <span className="ie-control ie-maximize">□</span>
          <span className="ie-control ie-close">X</span>
        </div>
      </div>
      
      <div className="ie-menubar">
        {['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help'].map((menu) => (
          <span 
            key={menu} 
            className={`ie-menu-item ${menuOpen === menu ? 'active' : ''}`}
            onClick={() => handleMenuClick(menu)}
          >
            {menu}
          </span>
        ))}
        {renderMenuDropdown()}
      </div>
      
      <div className="ie-toolbar">
        <button 
          className={`ie-button ie-back ${currentIndex > 0 ? 'active' : 'disabled'}`}
          onClick={handleBack}
        >
          Back
        </button>
        <button 
          className={`ie-button ie-forward ${currentIndex < history.length - 1 ? 'active' : 'disabled'}`}
          onClick={handleForward}
        >
          Forward
        </button>
        <button className="ie-button ie-stop" onClick={handleStop}>Stop</button>
        <button className="ie-button ie-refresh" onClick={handleRefresh}>Refresh</button>
        <button className="ie-button ie-home" onClick={handleHome}>Home</button>
        <button className="ie-button ie-search" onClick={handleSearch}>Search</button>
        <button 
          className={`ie-button ie-favorites ${isFavorited ? 'active' : ''}`}
          onClick={handleFavorites}
        >
          Favorites
        </button>
        <button className="ie-button ie-history" onClick={handleHistory}>History</button>
        <button className="ie-button ie-mail" onClick={handleMail}>Mail</button>
        <button className="ie-button ie-print" onClick={handlePrint}>Print</button>
      </div>
      
      <div className="ie-addressbar">
        <form onSubmit={handleAddressSubmit} style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
          <span className="ie-address-label">Address</span>
          <input 
            type="text" 
            className="ie-address-input" 
            value={addressValue} 
            onChange={handleAddressChange} 
          />
          <button type="submit" className="ie-go-button">Go</button>
        </form>
      </div>
      
      {showFindDialog && (
        <div className="ie-find-dialog">
          <div className="ie-find-header">
            <span>Find</span>
            <button onClick={() => setShowFindDialog(false)} className="ie-find-close">X</button>
          </div>
          <form onSubmit={handleFindSubmit}>
            <div className="ie-find-content">
              <div>
                <label htmlFor="findWhat">Find what:</label>
                <input 
                  id="findWhat" 
                  type="text" 
                  value={findText}
                  onChange={(e) => setFindText(e.target.value)}
                />
              </div>
              <div className="ie-find-options">
                <label>
                  <input type="checkbox" /> Match whole word only
                </label>
                <label>
                  <input type="checkbox" /> Match case
                </label>
              </div>
              <div className="ie-find-direction">
                <span>Direction:</span>
                <label>
                  <input type="radio" name="direction" defaultChecked /> Up
                </label>
                <label>
                  <input type="radio" name="direction" /> Down
                </label>
              </div>
            </div>
            <div className="ie-find-buttons">
              <button type="submit">Find Next</button>
              <button type="button" onClick={() => setShowFindDialog(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      
      <div className="ie-content">
        {loading ? (
          <div className="ie-loading">
            <div className="ie-loading-icon"></div>
            <div className="ie-loading-text">
              Internet Explorer is waiting for a response from the website...
              <div className="ie-loading-progress">
                {Math.round(progress)}% Complete
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="ie-error">
            <div className="ie-error-icon">×</div>
            <div className="ie-error-title">
              The page cannot be displayed
            </div>
            <div className="ie-error-message">
              {error}
            </div>
            <div className="ie-error-help">
              <p>The page you are looking for might be temporarily unavailable.</p>
              <ul>
                <li>Click the <strong>Refresh</strong> button, or try again later.</li>
                <li>If you typed the page address, make sure that it is spelled correctly.</li>
                <li>To check your connection settings, click the <strong>Tools</strong> menu, and then click <strong>Internet Options</strong>.</li>
              </ul>
            </div>
          </div>
        ) : (
          <iframe 
            ref={iframeRef}
            src={content ? `/recreated/${content.file}` : ''} 
            title="Internet Explorer Content"
            className="ie-iframe"
          ></iframe>
        )}
      </div>
      
      <div className="ie-statusbar">
        <div className="ie-status-text">
          {loading ? `Opening page... (${Math.round(progress)}%)` : 
           error ? 'Error: Page cannot be displayed' : 
           isFavorited ? 'Added to Favorites' :
           'Done'}
        </div>
        <div className="ie-security-zone">Internet | {connectionSpeed}</div>
      </div>
    </div>
  );
}

export default InternetExplorerUI;
