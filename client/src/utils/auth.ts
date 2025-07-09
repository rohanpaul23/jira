// src/utils/auth.ts
export function isTokenValid(): boolean {
  const token = localStorage.getItem('token');
  if (!token) return false;
  try {
    const [, payload] = token.split('.');
    const { exp } = JSON.parse(atob(payload));
    return typeof exp === 'number' && exp * 1000 > Date.now();
  } catch {
    return false;
  }
}
