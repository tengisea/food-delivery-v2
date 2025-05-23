
export const fetcher = async (url) => {
  const token = localStorage.getItem("token");
  console.log("Token:", token);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Fetch алдаа:", errorText);
    throw new Error(`Fetch failed with status ${res.status}: ${errorText}`);
  }

  return res.json();
};
