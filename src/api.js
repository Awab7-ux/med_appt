const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8181';

export async function apiRequest(path, options = {}) {
  const token = sessionStorage.getItem('token');
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message || 'Something went wrong. Please try again.');
  return result;
}