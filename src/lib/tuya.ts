/**
 * Tuya IoT Cloud Client — Tuya Spatial / Industry Project compatible
 */

import { createHash, createHmac } from "crypto";

// ─── Config ───────────────────────────────────────────────────────────────────
export const DEVICE_ID  = process.env.TUYA_DEVICE_ID    ?? "";
const ACCESS_ID         = process.env.TUYA_ACCESS_ID    ?? "";
const ACCESS_SECRET     = process.env.TUYA_ACCESS_SECRET ?? "";
const BASE_URL          = process.env.TUYA_BASE_URL     ?? "https://openapi.tuyain.com";

// ─── DPS mapping ──────────────────────────────────────────────────────────────
export const DPS = {
  POWER:     "switch",
  MODE:      "mode",
  FAN_SPEED: "fan_speed",
} as const;

// ─── Token cache ──────────────────────────────────────────────────────────────
interface TokenCache { accessToken: string; expireAt: number; }
let _tokenCache: TokenCache | null = null;

// ─── Signing (Tuya HMAC-SHA256 V1.0) ─────────────────────────────────────────

function sha256Hex(data: string): string {
  return createHash("sha256").update(data).digest("hex");
}

function hmacSha256Upper(secret: string, message: string): string {
  return createHmac("sha256", secret).update(message).digest("hex").toUpperCase();
}

function buildSignHeaders(
  method: string,
  signPath: string,
  body: string,
  accessToken?: string
): Record<string, string> {
  const t        = Date.now().toString();
  const nonce    = "";
  const bodyHash = sha256Hex(body);

  const stringToSign = [method.toUpperCase(), bodyHash, "", signPath].join("\n");

  const signStr = accessToken
    ? `${ACCESS_ID}${accessToken}${t}${nonce}${stringToSign}`
    : `${ACCESS_ID}${t}${nonce}${stringToSign}`;

  const sign = hmacSha256Upper(ACCESS_SECRET, signStr);

  return {
    "client_id":    ACCESS_ID,
    "sign":         sign,
    "t":            t,
    "sign_method":  "HMAC-SHA256",
    "nonce":        nonce,
    "Content-Type": "application/json",
    ...(accessToken ? { "access_token": accessToken } : {}),
  };
}

// ─── Token fetch (FIXED: includes query in signature) ─────────────────────────

async function getAccessToken(): Promise<string> {
  if (_tokenCache && Date.now() < _tokenCache.expireAt - 60_000) {
    return _tokenCache.accessToken;
  }

  const path = "/v1.0/token";
  const query = { grant_type: "1" };

  const qs = "?" + new URLSearchParams(query).toString();
  const signPath = path + qs;

  const headers = buildSignHeaders("GET", signPath, "");

  const res = await fetch(`${BASE_URL}${signPath}`, { headers });

  const json = await res.json() as {
    success: boolean;
    result?: { access_token: string; expire_time: number };
    msg?: string; code?: number;
  };

  if (!json.success || !json.result) {
    throw new Error(`Tuya auth failed: ${json.msg ?? JSON.stringify(json)}`);
  }

  _tokenCache = {
    accessToken: json.result.access_token,
    expireAt:    Date.now() + json.result.expire_time * 1000,
  };

  return _tokenCache.accessToken;
}

// ─── Generic request (UPDATED: query support) ─────────────────────────────────

async function tuyaRequest<T>(
  method: "GET" | "POST",
  path: string,
  query?: Record<string, string>,
  body?: Record<string, unknown>
): Promise<T> {
  if (!ACCESS_ID || !ACCESS_SECRET) {
    throw new Error("Missing TUYA_ACCESS_ID or TUYA_ACCESS_SECRET");
  }
  if (!DEVICE_ID) {
    throw new Error("Missing TUYA_DEVICE_ID");
  }

  const token   = await getAccessToken();
  const bodyStr = body ? JSON.stringify(body) : "";

  const qs = query ? "?" + new URLSearchParams(query).toString() : "";
  const signPath = path + qs;

  const headers = buildSignHeaders(method, signPath, bodyStr, token);

  const res = await fetch(`${BASE_URL}${path}${qs}`, {
    method,
    headers,
    ...(body ? { body: bodyStr } : {}),
  });

  const json = await res.json() as {
    success: boolean;
    result: T;
    msg?: string; code?: number;
  };

  console.log(
  `[Tuya] ${method} ${signPath} → success:${json.success}`,
  !json.success ? { code: json.code, msg: json.msg } : ""
);

  if (!json.success) {
    throw new Error(`${json.msg ?? "unknown"}`);
  }

  return json.result;
}

// ─── Device Status ────────────────────────────────────────────────────────────

export async function fetchDeviceStatus() {
  // Attempt 1: Spatial
  try {
    const path = `/v2.0/cloud/thing/${DEVICE_ID}/shadow/properties`;

    const raw = await tuyaRequest<{
      properties: { code: string; value: unknown }[];
    }>("GET", path);

    const dps: Record<string, unknown> = {};
    for (const p of raw.properties ?? []) dps[p.code] = p.value;

    return parseDps(dps);
  } catch (e1) {
    console.log(`[Tuya] Spatial failed, fallback →`, e1);
  }

  // Attempt 2: Smart Home
  try {
    type DpItem = { code: string; value: unknown };

    const result = await tuyaRequest<DpItem[]>(
      "GET",
      `/v1.0/devices/${DEVICE_ID}/status`
    );

    const dps: Record<string, unknown> = {};
    for (const item of result) dps[item.code] = item.value;

    return parseDps(dps);
  } catch (e2) {
    throw new Error(e2 instanceof Error ? e2.message : String(e2));
  }
}

// ─── Parse DPS ────────────────────────────────────────────────────────────────

function parseDps(dps: Record<string, unknown>) {
  return {
    power:    (dps[DPS.POWER]     ?? false) as boolean,
    mode:     (dps[DPS.MODE]      ?? "auto") as string,
    fanSpeed: (dps[DPS.FAN_SPEED] ?? 50)    as number,
  };
}

// ─── Send Command ─────────────────────────────────────────────────────────────

export async function sendCommand(commands: { code: string; value: unknown }[]) {
  // Attempt 1: Spatial
  try {
    const properties: Record<string, unknown> = {};
    for (const cmd of commands) properties[cmd.code] = cmd.value;

    return await tuyaRequest(
      "POST",
      `/v2.0/cloud/thing/${DEVICE_ID}/shadow/properties/issue`,
      undefined,
      { properties }
    );
  } catch (e1) {
    console.log(`[Tuya] Spatial command failed → fallback`, e1);
  }

  // Attempt 2: Smart Home
  return tuyaRequest(
    "POST",
    `/v1.0/devices/${DEVICE_ID}/commands`,
    undefined,
    { commands }
  );
}