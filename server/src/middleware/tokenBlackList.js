// backend/src/middleware/tokenBlacklist.js
const revokedTokens = new Set();

export function revokeToken(token) {
  revokedTokens.add(token);
}

export function isTokenRevoked(token) {
  return revokedTokens.has(token);
}

export function clearRevokedTokens() {
  revokedTokens.clear();
}
