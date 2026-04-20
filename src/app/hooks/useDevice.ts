"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { DeviceState, DeviceMode } from "@/lib/types";

const POLL_INTERVAL = 4000; // ms

const DEFAULT_STATE: DeviceState = {
  power: false,
  mode: "Supply",
  fanSpeed: 1,
  anion: false,
  light: true,
};

export function useDevice() {
  const [state, setState] = useState<DeviceState>(DEFAULT_STATE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchState = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const res = await fetch("/api/device");
      const json = await res.json();
      if (json.success && json.data) {
        setState(json.data as DeviceState);
        setError(null);
      } else {
        setError(json.error ?? "Failed to fetch device state");
      }
    } catch {
      setError("Network error — check connection");
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchState(false);
    pollRef.current = setInterval(() => fetchState(true), POLL_INTERVAL);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [fetchState]);

  const sendCommand = useCallback(
    async (
      endpoint: string,
      payload: Record<string, unknown>,
      optimisticUpdate: Partial<DeviceState>
    ) => {
      setState((prev: DeviceState) => ({ ...prev, ...optimisticUpdate }));
      setSyncing(true);
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!json.success) {
          await fetchState(true);
          setError(json.error ?? "Command failed");
        } else {
          setError(null);
        }
      } catch {
        await fetchState(true);
        setError("Network error — command failed");
      } finally {
        setSyncing(false);
      }
    },
    [fetchState]
  );

  const togglePower = useCallback(() => {
    const newValue = !state.power;
    sendCommand("/api/device/power", { value: newValue }, { power: newValue });
  }, [state.power, sendCommand]);

  const setMode = useCallback(
    (mode: DeviceMode) => {
      sendCommand("/api/device/mode", { value: mode }, { mode });
    },
    [sendCommand]
  );

  const setFanSpeed = useCallback(
    (fanSpeed: 1 | 2 | 3) => {
      sendCommand("/api/device/fan", { value: fanSpeed }, { fanSpeed });
    },
    [sendCommand]
  );

  // --- New Accessory Handlers ---

  const toggleLight = useCallback(() => {
    const newValue = !state.light;
    sendCommand("/api/device/light", { value: newValue }, { light: newValue });
  }, [state.light, sendCommand]);

  const toggleAnion = useCallback(() => {
    const newValue = !state.anion;
    sendCommand("/api/device/anion", { value: newValue }, { anion: newValue });
  }, [state.anion, sendCommand]);

  return {
    state,
    loading,
    error,
    syncing,
    togglePower,
    setMode,
    setFanSpeed,
    toggleLight, // Added
    toggleAnion, // Added
    refresh: () => fetchState(true),
  };
}