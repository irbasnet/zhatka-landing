const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/api/products`);
  if (!res.ok) throw new Error('Failed to load products');
  return res.json();
}

export async function submitFeedback(payload) {
  const res = await fetch(`${BASE_URL}/api/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to submit feedback');
  return res.json();
}

export async function adminLogin(password) {
  const res = await fetch(`${BASE_URL}/api/admin/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) throw new Error('Invalid password');
}

export async function adminLogout() {
  await fetch(`${BASE_URL}/api/admin/logout`, { method: 'POST', credentials: 'include' });
}

export async function adminMe() {
  const res = await fetch(`${BASE_URL}/api/admin/me`, { credentials: 'include' });
  return res.ok;
}

export async function getAdminFeedback(params) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== null && v !== undefined && v !== '')
  );
  const res = await fetch(`${BASE_URL}/api/admin/feedback?${query}`, { credentials: 'include' });
  if (res.status === 401) {
    const err = new Error('Unauthorized');
    err.status = 401;
    throw err;
  }
  if (!res.ok) throw new Error('Failed to load feedback');
  return res.json();
}
