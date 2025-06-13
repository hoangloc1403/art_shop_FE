import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub?: string;
  role?: string;
  exp?: number;
  email?: string;
}

/**
 * Decodes a JWT token safely.
 * @param {string} token - The JWT token string.
 * @returns {JwtPayload | null} The decoded payload, or null if invalid.
 */
export function decodeJwt(token: string): JwtPayload | null {
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded;
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}

/**
 * Checks if JWT is expired (based on exp field).
 * @param {string} token - The JWT token string.
 * @returns {boolean} True if expired, false otherwise.
 */
export function isJwtExpired(token: string): boolean {
  const payload = decodeJwt(token);
  if (!payload?.exp) return true;

  const nowInSeconds = Math.floor(Date.now() / 1000);
  return payload.exp < nowInSeconds;
}
