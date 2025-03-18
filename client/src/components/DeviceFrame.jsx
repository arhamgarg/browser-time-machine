import React, { useEffect, useRef } from 'react';
import '../styles/device.css';

function DeviceFrame({ era, children, dimensions }) {
  const deviceType = getDeviceTypeForEra(era);
  const deviceClasses = `device-frame ${deviceType}`;
  const frameRef = useRef(null);
  
  // Apply dimensions if provided
  const frameStyle = dimensions ? {
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
  } : {};
  
  // Add 3D rotation effect on hover
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    
    const handleMouseMove = (e) => {
      const { left, top, width, height } = frame.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      // Calculate mouse position relative to center of frame
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      // Calculate rotation (limited to +/- 5 degrees)
      const rotateY = (mouseX / (width / 2)) * 5;
      const rotateX = -(mouseY / (height / 2)) * 5;
      
      // Apply rotation transform
      frame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    
    const handleMouseLeave = () => {
      // Reset transform when mouse leaves
      frame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };
    
    // Only apply effect for modern browsers
    if (['modern', 'lcd'].includes(deviceType)) {
      frame.addEventListener('mousemove', handleMouseMove);
      frame.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      if (frame) {
        frame.removeEventListener('mousemove', handleMouseMove);
        frame.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [deviceType]);
  
  return (
    <div className={deviceClasses} style={frameStyle} ref={frameRef}>
      <div className="device-screen">
        {children}
      </div>
      {deviceType === 'crt' && (
        <div className="crt-effect">
          <div className="crt-scanlines"></div>
          <div className="crt-glow"></div>
          <div className="crt-flicker"></div>
        </div>
      )}
      {deviceType === 'mobile' && (
        <div className="mobile-device-features">
          <div className="mobile-notch"></div>
          <div className="mobile-home-btn"></div>
          <div className="mobile-volume-btn"></div>
          <div className="mobile-power-btn"></div>
        </div>
      )}
    </div>
  );
}

function getDeviceTypeForEra(era) {
  // Map era to device type
  switch(era) {
    case '1993-1996':
    case '1997-2001':
      return 'crt';
    case '2002-2007':
    case '2008-2012':
      return 'lcd';
    case '2013-2018':
      return 'mobile';
    case '2019-2025':
    default:
      return 'modern';
  }
}

export default DeviceFrame;