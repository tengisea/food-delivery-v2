import { useEffect, useState } from "react";

export function FetchData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/food-order")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div>
      <h1>Backend-ээс авсан өгөгдөл:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default FetchData;
