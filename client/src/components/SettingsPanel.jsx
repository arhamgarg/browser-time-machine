import React from 'react';
import { motion } from 'framer-motion';
import '../styles/settings.css';

function SettingsPanel({ 
  onClose, 
  resolution, 
  onResolutionChange, 
  connectionSpeed, 
  onSpeedChange, 
  soundEnabled, 
  onSoundToggle 
}) {
  return (
    <motion.div 
      className="settings-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="settings-header">
        <h2>Settings</h2>
        <button className="settings-close" onClick={onClose}>×</button>
      </div>
      
      <div className="settings-content">
        <div className="settings-section">
          <h3>Display Settings</h3>
          
          <div className="settings-option">
            <label htmlFor="resolution">Screen Resolution:</label>
            <select 
              id="resolution" 
              value={resolution} 
              onChange={(e) => onResolutionChange(e.target.value)}
            >
              <option value="640x480">640x480 (VGA)</option>
              <option value="800x600">800x600 (SVGA)</option>
              <option value="1024x768">1024x768 (XGA)</option>
              <option value="1280x1024">1280x1024 (SXGA)</option>
              <option value="1920x1080">1920x1080 (FHD)</option>
              <option value="mobile-portrait">Mobile (Portrait)</option>
              <option value="mobile-landscape">Mobile (Landscape)</option>
            </select>
          </div>
          
          <div className="settings-option">
            <label>CRT Effect:</label>
            <div className="toggle-switch">
              <input type="checkbox" id="crt-effect" />
              <label htmlFor="crt-effect"></label>
            </div>
          </div>
          
          <div className="settings-option">
            <label>Dark Mode:</label>
            <div className="toggle-switch">
              <input type="checkbox" id="dark-mode" />
              <label htmlFor="dark-mode"></label>
            </div>
          </div>
        </div>
        
        <div className="settings-section">
          <h3>Network Settings</h3>
          
          <div className="settings-option">
            <label htmlFor="connection-speed">Connection Speed:</label>
            <select 
              id="connection-speed" 
              value={connectionSpeed} 
              onChange={(e) => onSpeedChange(e.target.value)}
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
        </div>
        
        <div className="settings-section">
          <h3>Audio Settings</h3>
          
          <div className="settings-option">
            <label>Sound Effects:</label>
            <div className="toggle-switch">
              <input 
                type="checkbox" 
                id="sound-enabled" 
                checked={soundEnabled}
                onChange={onSoundToggle}
              />
              <label htmlFor="sound-enabled"></label>
            </div>
          </div>
          
          <div className="settings-option">
            <label>Dial-up Sounds:</label>
            <div className="toggle-switch">
              <input type="checkbox" id="dialup-sounds" checked={soundEnabled} onChange={onSoundToggle} />
              <label htmlFor="dialup-sounds"></label>
            </div>
          </div>
        </div>
        
        <div className="settings-section">
          <h3>Developer Options</h3>
          
          <div className="settings-option">
            <label>Show DevTools:</label>
            <div className="toggle-switch">
              <input type="checkbox" id="show-devtools" />
              <label htmlFor="show-devtools"></label>
            </div>
          </div>
          
          <div className="settings-option">
            <label>HTML Validation:</label>
            <div className="toggle-switch">
              <input type="checkbox" id="html-validation" />
              <label htmlFor="html-validation"></label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="settings-footer">
        <button className="settings-button" onClick={onClose}>Close</button>
        <button className="settings-button primary">Apply</button>
      </div>
    </motion.div>
  );
}

export default SettingsPanel;
