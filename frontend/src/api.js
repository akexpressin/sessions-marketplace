const API_BASE = "http://localhost:8000";

export function getToken() {
  return localStorage.getItem("access");
}

export async function apiFetch(path, options = {}) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    throw new Error("Unauthorized");
  }

  return res.json();
}
