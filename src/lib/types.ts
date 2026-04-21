/**
 * Xerovolt ERV Controller - Global Types
 */

// Define the operational modes supported by the ERV hardware
export type DeviceMode =  "Supply" | "exhaust" | "ventilate";

// Define the core state structure for the device
export interface DeviceState {
  power: boolean;
  mode: DeviceMode;
  fanSpeed: 1 | 2 | 3; 
  anion: boolean;
  light: boolean;
  powerful: boolean; 
  co2Value: number;       
  co2Threshold: number;   
  co2Switch: boolean;   
  freeCooling: boolean;
}

// Standardized structure for API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  syncing?: boolean;
}

// Tuya-specific DP (Data Point) structure for internal use
export interface TuyaStatusResponse {
  code: string;
  value: string | number | boolean;
}