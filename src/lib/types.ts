/**
 * Xerovolt ERV Controller - Global Types
 */

// Define the operational modes supported by the ERV hardware
export type DeviceMode = "auto" | "manual" | "sleep" | "boost";

// Define the core state structure for the device
export interface DeviceState {
  power: boolean;
  mode: DeviceMode;
  fanSpeed: number; // Represents percentage (0-100)
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