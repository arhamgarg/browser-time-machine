import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// Import styles
import '../styles/browser.css';

// Browser-specific UI components
import NetscapeUI from './browser-ui/NetscapeUI';
import InternetExplorerUI from './browser-ui/InternetExplorerUI'; 
import FirefoxUI from './browser-ui/FirefoxUI';
import ChromeUI from './browser-ui/ChromeUI';
import ModernUI from './browser-ui/ModernUI';
import MobileUI from './browser-ui/MobileUI';

// Utilities
import { playConnectionSound, stopSound, SOUNDS, playSound } from '../utils/soundEffects';

// Define loading times object globally
const loadingTimes = {
  '14.4k': 20000, // 20 seconds
  '28.8k': 15000, // 15 seconds
  '56k': 10000, // 10 seconds
  'ISDN': 5000, // 5 seconds
  'DSL': 3000, // 3 seconds
  'Cable': 1500, // 1.5 seconds
  'Broadband': 1000, // 1 second
  'Fiber': 500, // 0.5 seconds
  '5G': 200 // 0.2 seconds
};

function BrowserWindow({ era, website, connectionSpeed, soundEnabled }) {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  
  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        stopSound(audioRef.current);
      }
    };
  }, []);
  
  // Simulate connection speed
  useEffect(() => {
    if (!website) return;
    
    setLoading(true);
    setError(null);
    setProgress(0);
    
    // Get the loading time for the selected connection speed
    const loadingTime = loadingTimes[connectionSpeed] || 1000;
    
    // Progress simulation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        // Random fluctuations to simulate network variance
        const increment = Math.random() * 3 + 1; // 1-4% increment
        const newProgress = prev + increment;
        
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, loadingTime / 30); // Divide loading time into ~30 steps
    
    // Set up loading timer
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Simulate occasional failures for old connections
      const failureChance = connectionSpeed === '14.4k' ? 0.2 : 
                           connectionSpeed === '28.8k' ? 0.1 : 
                           connectionSpeed === '56k' ? 0.05 : 0;
      
      if (Math.random() < failureChance) {
        setError('Connection timed out. Please try again.');
        // Play error sound if enabled
        if (soundEnabled) {
          playSound(SOUNDS.ERROR, 0.5);
        }
      } else {
        setContent(website);
        // Play success sound if enabled
        if (soundEnabled && ['DSL', 'Cable', 'Broadband', 'Fiber', '5G'].includes(connectionSpeed)) {
          playSound(SOUNDS.SUCCESS, 0.3);
        }
      }
      
      clearInterval(progressInterval);
    }, loadingTime);
    
    // Clean up previous audio
    if (audioRef.current) {
      stopSound(audioRef.current);
    }
    
    // Play connection sound
    if (soundEnabled) {
      audioRef.current = playConnectionSound(connectionSpeed, soundEnabled);
    }
    
    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
      if (audioRef.current) {
        stopSound(audioRef.current);
      }
    };
  }, [website, connectionSpeed, soundEnabled]);
  
  // Render browser UI based on era
  const renderBrowserUI = () => {
    // Pass common props to all UI components
    const browserProps = {
      loading,
      content,
      error,
      progress,
      website,
      connectionSpeed
    };
    
    switch(era) {
      case '1993-1996':
        return <NetscapeUI {...browserProps} />;
      case '1997-2001':
        return <InternetExplorerUI {...browserProps} />;
      case '2002-2007':
        return <FirefoxUI {...browserProps} />;
      case '2008-2012':
        return <ChromeUI {...browserProps} />;
      case '2013-2018':
        return <MobileUI {...browserProps} />;
      case '2019-2025':
      default:
        return <ModernUI {...browserProps} />;
    }
  };
  
  return (
    <div className="browser-window">
      {!website ? (
        <div className="no-website-message">
          <p>No websites available for this era.</p>
          <p>Please select a website to continue.</p>
        </div>
      ) : (
        renderBrowserUI()
      )}
      
      {/* Loading overlay */}
      <AnimatePresence>
        {loading && website && (
          <motion.div 
            className="loading-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="loading-content">
              <div className="loading-text">
                Connecting via {connectionSpeed}...
              </div>
              <div className="loading-progress-container">
                <div className="loading-progress-bar">
                  <motion.div 
                    className="loading-progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="loading-percentage">{Math.round(progress)}%</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div 
            className="error-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="error-content">
              <div className="error-icon">⚠️</div>
              <div className="error-text">{error}</div>
              <button 
                className="error-retry" 
                onClick={() => {
                  // Play click sound
                  if (soundEnabled) {
                    playSound(SOUNDS.CLICK, 0.3);
                  }
                  
                  setError(null);
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    setContent(website);
                  }, loadingTimes[connectionSpeed] / 2);
                }}
              >
                Retry
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default BrowserWindow;
