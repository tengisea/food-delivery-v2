"use client";

import axios from "axios";
import { ChangeEvent, useState } from "react";

export const FoodImage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = Array.from(event.target.files as FileList)[0];

    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    const form = new FormData();

    if (!selectedFile) return;

    form.append("upload_preset", "food-delivery");
    form.append("file", selectedFile);
    form.append("folder", "food-delivery");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/drdp3z5so/image/upload",
      { method: "POST", body: form }
    );

    const parsed = await response.json();
    console.log(parsed);

    await axios.post("http://localhost:8000/food", { image: parsed.url });
  };
  console.log(process.env.BACKEND);
  

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
