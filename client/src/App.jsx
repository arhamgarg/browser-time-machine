import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import ReactSlider from 'react-slider';
import { FaCog, FaVolumeUp, FaVolumeMute, FaQuestionCircle, FaInfo } from 'react-icons/fa';

// Components
import BrowserWindow from './components/BrowserWindow';
import DeviceFrame from './components/DeviceFrame';
import TimelineNav from './components/TimelineNav';
import TechSpecs from './components/TechSpecs';
import LoadingScreen from './components/LoadingScreen';

// Utils
import { getDeviceDimensions, calculateScaling, getResolutionDisplayName } from './utils/resolutionManager';

// Styles
import './index.css';

function App() {
  // Refs
  const browserContainerRef = useRef(null);
  
  // State
  const [eras, setEras] = useState([]);
  const [selectedEra, setSelectedEra] = useState(null);
  const [websites, setWebsites] = useState([]);
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const [resolution, setResolution] = useState('modern');
  const [deviceDimensions, setDeviceDimensions] = useState({});
  const [scale, setScale] = useState(1);
  const [connectionSpeed, setConnectionSpeed] = useState('56k');
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showTechSpecs, setShowTechSpecs] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [year, setYear] = useState(1996);
  
  // Mock loading progress
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 5;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  // Get data from API
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Simulate data loading
        setTimeout(async () => {
          try {
            const erasResponse = await axios.get('http://localhost:3000/api/eras');
            
            if (erasResponse.data && erasResponse.data.length > 0) {
              setEras(erasResponse.data);
              // Default to the first era
              setSelectedEra(erasResponse.data[0].id);
            }
          } catch (error) {
            console.error("Error fetching initial data:", error);
            // Create fallback data if API fails
            const fallbackEras = [
              { id: '1993-1996', name: 'Early Web', browser: 'Netscape Navigator' },
              { id: '1997-2001', name: 'Dot-com Era', browser: 'Internet Explorer' },
              { id: '2002-2007', name: 'Web 2.0', browser: 'Firefox' },
              { id: '2008-2012', name: 'Modern Web', browser: 'Chrome' },
              { id: '2013-2018', name: 'Mobile Revolution', browser: 'Mobile Browsers' },
              { id: '2019-2025', name: 'Current Web', browser: 'Modern Browsers' }
            ];
            setEras(fallbackEras);
            setSelectedEra(fallbackEras[0].id);
          } finally {
            setLoading(false);
          }
        }, 2000); // Simulated loading delay
      } catch (error) {
        console.error("Error setting up data fetch:", error);
        setLoading(false);
      }
    };
    
    fetchInitialData();
  }, []);
  
  // Load websites when era changes
  useEffect(() => {
    if (!selectedEra) return;
    
    const fetchWebsites = async () => {
      try {
        const websitesResponse = await axios.get(`http://localhost:3000/api/websites?era=${selectedEra}`);
        
        if (websitesResponse.data && websitesResponse.data.length > 0) {
          setWebsites(websitesResponse.data);
          setSelectedWebsite(websitesResponse.data[0]);
        } else {
          // Fallback data if no websites are returned
          const fallbackWebsites = [
            { era: selectedEra, title: "Example Website", file: "example.html" }
          ];
          setWebsites(fallbackWebsites);
          setSelectedWebsite(fallbackWebsites[0]);
        }
      } catch (error) {
        console.error("Error fetching websites:", error);
        // Fallback data if API fails
        const fallbackWebsites = [
          { era: selectedEra, title: "Example Website", file: "example.html" }
        ];
        setWebsites(fallbackWebsites);
        setSelectedWebsite(fallbackWebsites[0]);
      }
    };
    
    fetchWebsites();
  }, [selectedEra]);
  
  // Update year when era changes
  useEffect(() => {
    if (!selectedEra) return;
    
    // Extract the start year from the era ID (format: "1993-1996")
    const startYear = parseInt(selectedEra.split('-')[0]);
    const endYear = parseInt(selectedEra.split('-')[1]);
    
    // Set year to middle of the range
    setYear(Math.floor((startYear + endYear) / 2));
  }, [selectedEra]);
  
  // Handle device dimensions based on resolution settings and era
  useEffect(() => {
    if (!selectedEra) return;
    
    // Get device dimensions based on resolution setting and era
    const dimensions = getDeviceDimensions(selectedEra, resolution, browserContainerRef);
    setDeviceDimensions(dimensions);
    
    // Calculate appropriate scaling
    const newScale = calculateScaling(dimensions, browserContainerRef);
    setScale(newScale);
    
    // Add window resize event listener
    const handleResize = () => {
      if (resolution === 'responsive') {
        const updatedDimensions = getDeviceDimensions(selectedEra, resolution, browserContainerRef);
        setDeviceDimensions(updatedDimensions);
        
        const updatedScale = calculateScaling(updatedDimensions, browserContainerRef);
        setScale(updatedScale);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedEra, resolution, browserContainerRef]);
  
  // Handle era selection
  const handleEraSelect = (eraId) => {
    setSelectedEra(eraId);
  };
  
  // Handle website selection
  const handleWebsiteSelect = (website) => {
    setSelectedWebsite(website);
  };
  
  // Handle year slider change
  const handleYearChange = (newYear) => {
    setYear(newYear);
    
    // Find the era that contains this year
    const matchingEra = eras.find(era => {
      const [startYear, endYear] = era.id.split('-').map(y => parseInt(y));
      return newYear >= startYear && newYear <= endYear;
    });
    
    if (matchingEra && matchingEra.id !== selectedEra) {
      setSelectedEra(matchingEra.id);
    }
  };
  
  // Handle resolution change
  const handleResolutionChange = (newResolution) => {
    setResolution(newResolution);
  };
  
  // Determine min and max years for the slider
  const minYear = eras.length > 0 ? parseInt(eras[0].id.split('-')[0]) : 1993;
  const maxYear = eras.length > 0 ? parseInt(eras[eras.length - 1].id.split('-')[1]) : 2025;
  
  if (loading) {
    return <LoadingScreen progress={loadingProgress} />;
  }
  
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Browser Time Machine</h1>
        <div className="app-controls">
          <button 
            className="app-btn"
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? "Mute sounds" : "Enable sounds"}
          >
            {soundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
          </button>
          
          <button 
            className="app-btn"
            onClick={() => setShowTechSpecs(!showTechSpecs)}
            title="Toggle tech specs"
          >
            <FaInfo />
          </button>
          
          <button 
            className="app-btn"
            onClick={() => setShowHelp(!showHelp)}
            title="Help"
          >
            <FaQuestionCircle />
          </button>
          
          <button 
            className="app-btn"
            onClick={() => setShowSettings(!showSettings)}
            title="Settings"
          >
            <FaCog />
          </button>
        </div>
      </header>
      
      <main className="main-content">
        <div className="time-navigation">
          <TimelineNav 
            eras={eras} 
            selectedEra={selectedEra} 
            onSelectEra={handleEraSelect} 
          />
          
          <div className="year-slider-container">
            <div className="year-label">Year: {year}</div>
            <ReactSlider
              className="year-slider"
              thumbClassName="year-slider-thumb"
              trackClassName="year-slider-track"
              min={minYear}
              max={maxYear}
              value={year}
              onChange={handleYearChange}
              renderThumb={(props, state) => (
                <div {...props}>
                  <div className="year-tooltip">{state.valueNow}</div>
                </div>
              )}
            />
          </div>
        </div>
        
        {selectedEra && (
          <div className="browser-container" ref={browserContainerRef}>
            <div className="website-selector">
              {websites.map(website => (
                <button
                  key={website.file}
                  className={`app-btn ${selectedWebsite && selectedWebsite.file === website.file ? 'primary' : ''}`}
                  onClick={() => handleWebsiteSelect(website)}
                >
                  {website.title}
                </button>
              ))}
            </div>
            
            <div className="display-options">
              <select 
                value={resolution} 
                onChange={(e) => handleResolutionChange(e.target.value)}
                className="resolution-selector"
              >
                <option value="original">Original ({getResolutionDisplayName('original', selectedEra)})</option>
                <option value="modern">Modern ({getResolutionDisplayName('modern', selectedEra)})</option>
                <option value="responsive">Responsive</option>
              </select>
              
              <select 
                value={connectionSpeed} 
                onChange={(e) => setConnectionSpeed(e.target.value)}
                className="speed-selector"
              >
                <option value="14.4k">14.4k Modem</option>
                <option value="28.8k">28.8k Modem</option>
                <option value="56k">56k Modem</option>
                <option value="ISDN">ISDN (128k)</option>
                <option value="DSL">DSL (1.5 Mbps)</option>
                <option value="Cable">Cable (5 Mbps)</option>
                <option value="Broadband">Broadband (10+ Mbps)</option>
                <option value="Fiber">Fiber (100+ Mbps)</option>
                <option value="5G">5G (1+ Gbps)</option>
              </select>
            </div>
            
            <div className="device-frame-container" style={{ 
              transform: `scale(${scale})`,
              width: deviceDimensions.width ? `${deviceDimensions.width}px` : '100%',
              height: deviceDimensions.height ? `${deviceDimensions.height}px` : '100%',
              margin: '0 auto'
            }}>
              <DeviceFrame era={selectedEra} dimensions={deviceDimensions}>
                <BrowserWindow 
                  era={selectedEra} 
                  website={selectedWebsite}
                  connectionSpeed={connectionSpeed}
                  soundEnabled={soundEnabled}
                />
              </DeviceFrame>
            </div>
          </div>
        )}
      </main>
      
      {/* Tech Specs Panel */}
      <AnimatePresence>
        {showTechSpecs && selectedEra && (
          <motion.div 
            className="tech-specs-panel"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <button 
              className="close-button"
              onClick={() => setShowTechSpecs(false)}
            >
              ×
            </button>
            <TechSpecs era={selectedEra} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Settings Panel - Simplified to use resolution manager */}
      <AnimatePresence>
        {showSettings && (
          <motion.div 
            className="help-dialog"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <button 
              className="close-button"
              onClick={() => setShowSettings(false)}
            >
              ×
            </button>
            <h2>Browser Time Machine Settings</h2>
            <div className="settings-content">
              <h3>Display Options</h3>
              <div className="settings-row">
                <label>Resolution:</label>
                <select 
                  value={resolution}
                  onChange={(e) => handleResolutionChange(e.target.value)}
                >
                  <option value="original">Original ({getResolutionDisplayName('original', selectedEra)})</option>
                  <option value="modern">Modern ({getResolutionDisplayName('modern', selectedEra)})</option>
                  <option value="responsive">Responsive</option>
                </select>
              </div>
              
              <div className="settings-row">
                <label>Connection Speed:</label>
                <select 
                  value={connectionSpeed}
                  onChange={(e) => setConnectionSpeed(e.target.value)}
                >
                  <option value="14.4k">14.4k Modem</option>
                  <option value="28.8k">28.8k Modem</option>
                  <option value="56k">56k Modem</option>
                  <option value="ISDN">ISDN (128k)</option>
                  <option value="DSL">DSL (1.5 Mbps)</option>
                  <option value="Cable">Cable (5 Mbps)</option>
                  <option value="Broadband">Broadband (10+ Mbps)</option>
                  <option value="Fiber">Fiber (100+ Mbps)</option>
                  <option value="5G">5G (1+ Gbps)</option>
                </select>
              </div>
              
              <div className="settings-row">
                <label>Sound Effects:</label>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="sound-toggle" 
                    checked={soundEnabled}
                    onChange={() => setSoundEnabled(!soundEnabled)}
                  />
                  <label htmlFor="sound-toggle"></label>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Help Dialog */}
      <AnimatePresence>
        {showHelp && (
          <motion.div 
            className="help-dialog"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <button 
              className="close-button"
              onClick={() => setShowHelp(false)}
            >
              ×
            </button>
            <h2>Browser Time Machine Help</h2>
            <div className="help-content">
              <p>Welcome to the Browser Time Machine! This interactive exhibit allows you to experience the web as it was throughout its history.</p>
              
              <h3>How to use:</h3>
              <ul>
                <li><strong>Timeline:</strong> Click on an era or use the year slider to travel to different time periods.</li>
                <li><strong>Websites:</strong> Select from popular websites from each era.</li>
                <li><strong>Resolution:</strong> Choose from original era resolution, modern optimized, or responsive display.</li>
                <li><strong>Connection Speed:</strong> Experience loading times from different internet speeds.</li>
                <li><strong>Settings:</strong> Access additional customization options.</li>
                <li><strong>Tech Specs:</strong> View technical specifications for each era.</li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <footer className="app-footer">
        <p>Browser Time Machine 2025 - A nostalgic journey through web history</p>
      </footer>
    </div>
  );
}

export default App;