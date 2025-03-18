export function simulateLoad(speed) {
  const speeds = {
    "14.4k": 30000, // 30 seconds
    "56k": 15000, // 15 seconds
    DSL: 5000, // 5 seconds
    Broadband: 1000, // 1 second
  };
  return speeds[speed] || 1000; // Default to 1 second
}
