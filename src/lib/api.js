// src/lib/api.js
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      // token bo'lsa shu yerda qo'shish mumkin
      // "Authorization": `Bearer ${TOKEN}`
    },
    ...options,
  });

  if (res?.status == "400") {
    console.log(res, "oooo");
  }

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "API request failed");
  }

  // agar body bo'lmasa, JSON parse qilmasdan return qilish mumkin
  if (res.status === 204) return null;

  return res.json();
}

// Shortcut functions
export const get = (endpoint) =>
  apiFetch(endpoint, { method: "GET", cache: "no-store" });

export const post = (endpoint, body) =>
  apiFetch(endpoint, { method: "POST", body: JSON.stringify(body) });

export const put = (endpoint, body) =>
  apiFetch(endpoint, { method: "PUT", body: JSON.stringify(body) });

export const del = (endpoint) => apiFetch(endpoint, { method: "DELETE" });
