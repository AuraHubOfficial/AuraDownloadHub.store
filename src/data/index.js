// Import all data files
import { softwareData } from './softwareData';
import { pluginData } from './pluginData';
import { extensionData } from './extensionData';
import { leaksData } from './leaksData';
import { clipsData } from './clipsData';
import { scriptsData } from './scriptsData';

// Combine all data into a single array for the main application
export const toolsData = [
  ...softwareData,
  ...pluginData,
  ...extensionData,
  ...leaksData,
  ...clipsData,
  ...scriptsData
];

// Export individual data arrays for specific use cases
export {
  softwareData,
  pluginData,
  extensionData,
  leaksData,
  clipsData,
  scriptsData
};