export const API_CONFIG = {
  BASE_URL: "http://localhost:3000",
  API_KEY: process.env.EXPO_PUBLIC_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
  },
};

export const fetchUser = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${API_CONFIG.BASE_URL}/api/user?query=${encodeURIComponent(query)}`
    : `${API_CONFIG.BASE_URL}/api/user?sort_by=userName.asc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: API_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Error fetching user: ${response.statusText}`);
  }

  const data = await response.json();

  return data.results;
};
