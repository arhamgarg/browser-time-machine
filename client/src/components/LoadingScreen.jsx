import React from 'react';
import { motion } from 'framer-motion';
import '../styles/loading.css';

function LoadingScreen({ progress = 0 }) {
  return (
    <motion.div 
      className="loading-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="loading-content">
        <h1 className="loading-title">Browser Time Machine</h1>
        
        <div className="loading-animation">
          <div className="loading-browser-icons">
            <div className="loading-icon netscape-icon"></div>
            <div className="loading-icon ie-icon"></div>
            <div className="loading-icon firefox-icon"></div>
            <div className="loading-icon chrome-icon"></div>
            <div className="loading-icon safari-icon"></div>
          </div>
        </div>
        
        <div className="loading-progress-container">
          <motion.div 
            className="loading-progress-bar"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          ></motion.div>
          <div className="loading-progress-text">{progress}%</div>
        </div>
        
        <div className="loading-message">
          {progress < 20 && "Initializing time circuits..."}
          {progress >= 20 && progress < 40 && "Loading historical browser data..."}
          {progress >= 40 && progress < 60 && "Rendering retro interfaces..."}
          {progress >= 60 && progress < 80 && "Configuring time portal..."}
          {progress >= 80 && progress < 100 && "Almost ready..."}
          {progress === 100 && "Ready to travel through time!"}
        </div>
      </div>
      
      <div className="loading-footer">
        <p>Prepare to travel through the history of the web...</p>
      </div>
    </motion.div>
  );
}

export default LoadingScreen;
