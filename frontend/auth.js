export const API_BASE = "http://localhost:5000";

// Token helpers
export function saveToken(token) {
  localStorage.setItem("auth_token", token);
}
export function getToken() {
  return localStorage.getItem("auth_token");
}
export function clearToken() {
  localStorage.removeItem("auth_token");
}

// Generic fetch
export async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `HTTP ${res.status}`);
  }
  return res.json();
}

// Auth fetch
export async function apiAuth(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : ""
  };
  const res = await fetch(`${API_BASE}${path}`, { headers, ...options });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `HTTP ${res.status}`);
  }
  return res.json();
}