/**
 * Resolution Manager Utility
 * Handles display resolution settings for different eras
 */

// Define resolution presets for each era
export const RESOLUTION_PRESETS = {
  original: {
    '1993-1996': { width: 640, height: 480, name: 'VGA' },
    '1997-2001': { width: 800, height: 600, name: 'SVGA' },
    '2002-2007': { width: 1024, height: 768, name: 'XGA' },
    '2008-2012': { width: 1280, height: 800, name: 'WXGA' },
    '2013-2018': { width: 375, height: 667, name: 'iPhone 6-8' }, // Mobile era
    '2019-2025': { width: 1920, height: 1080, name: 'Full HD' }
  },
  modern: {
    '1993-1996': { width: 1024, height: 768, name: 'Modern VGA' },
    '1997-2001': { width: 1280, height: 800, name: 'Modern SVGA' },
    '2002-2007': { width: 1366, height: 768, name: 'Modern XGA' },
    '2008-2012': { width: 1440, height: 900, name: 'Modern WXGA' },
    '2013-2018': { width: 414, height: 896, name: 'Modern Mobile' },
    '2019-2025': { width: 1920, height: 1080, name: 'Full HD' }
  },
  responsive: {
    scale: true,
    name: 'Responsive'
  }
};

/**
 * Get appropriate dimensions based on era and resolution setting
 * @param {string} era - The selected era ('1993-1996', etc.)
 * @param {string} resolutionSetting - The resolution setting (original, modern, responsive)
 * @param {object} containerRef - Reference to the container element
 * @returns {object} - The calculated dimensions object with width and height
 */
export const getDeviceDimensions = (era, resolutionSetting, containerRef) => {
  // Default to modern if resolution setting is invalid
  const setting = RESOLUTION_PRESETS[resolutionSetting] ? resolutionSetting : 'modern';
  
  // Handle responsive setting
  if (setting === 'responsive') {
    // Default sizes if we can't measure container
    let width = window.innerWidth * 0.8;
    let height = window.innerHeight * 0.7;
    
    // Get dimensions from container if available
    if (containerRef && containerRef.current) {
      width = containerRef.current.offsetWidth || width;
      height = containerRef.current.offsetHeight || height;
    }
    
    // Set reasonable minimum sizes
    width = Math.max(width, 320);
    height = Math.max(height, 480);
    
    return {
      width,
      height,
      scale: true,
      name: 'Responsive'
    };
  }
  
  // Return preset dimensions for era, or default to first era if not found
  return RESOLUTION_PRESETS[setting][era] || RESOLUTION_PRESETS[setting]['1993-1996'];
};

/**
 * Calculate appropriate scaling for device frame
 * @param {object} dimensions - The dimensions object with width and height
 * @param {object} containerRef - Reference to the container element
 * @returns {number} - The scaling factor
 */
export const calculateScaling = (dimensions, containerRef) => {
  if (!containerRef || !containerRef.current) {
    return 1;
  }
  
  const containerWidth = containerRef.current.offsetWidth;
  const containerHeight = containerRef.current.offsetHeight;
  
  // Calculate scaling factors for width and height
  const scaleX = (containerWidth * 0.9) / dimensions.width;
  const scaleY = (containerHeight * 0.9) / dimensions.height;
  
  // Use the smaller scaling factor to fit both dimensions
  return Math.min(scaleX, scaleY, 1); // Cap at 1 to prevent oversizing
};

/**
 * Get display name for current resolution setting
 * @param {string} resolutionSetting - The resolution setting
 * @param {string} era - The current era
 * @returns {string} - User-friendly display name
 */
export const getResolutionDisplayName = (resolutionSetting, era) => {
  if (resolutionSetting === 'responsive') {
    return 'Responsive';
  }
  
  const presets = RESOLUTION_PRESETS[resolutionSetting] || RESOLUTION_PRESETS.modern;
  const dimensions = presets[era] || presets['1993-1996'];
  
  return `${dimensions.name} (${dimensions.width}×${dimensions.height})`;
};

export default {
  RESOLUTION_PRESETS,
  getDeviceDimensions,
  calculateScaling,
  getResolutionDisplayName
};
