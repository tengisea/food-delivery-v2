"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components/ui";

export const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const url = `${process.env.BACKEND}/auth/sign-in`

      const response = await axios.post(url, { email, password });

      const token = response.data.token;

      localStorage.setItem("token", token);
      router.push("/admin");
    } catch (err) {
      console.error("Login алдаа:", err);
      setError("Нэвтрэхэд алдаа гарлаа");
    }
  };
  
  return (
    <div>
      <h2>Нэвтрэх</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имэйл:</label>

          <Input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Нууц үг:</label>
          <Input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button type="submit">Нэвтрэх</Button>
      </form>
    </div>
  );
};

export default SignInPage;
