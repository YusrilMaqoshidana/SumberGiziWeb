"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, User, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("manager");
  const [password, setPassword] = useState("password123");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      if (username && password) {
        setAuth(
          {
            id: "US-b2c3d4e5-f6a7-8901-bcde-f23456789012",
            username,
            name: username === "admin" ? "System Administrator" : "Budi Manager Pabrik",
            email: `${username}@sumbergizi.com`,
            role: username === "admin" ? "ADMIN" : "MANAGER",
          },
          "mock-jwt-token-123456"
        );
        router.push("/");
      } else {
        setError("Username dan password wajib diisi");
      }
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[16px] border border-[#DDE3DE] p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-[10px] bg-[#4F7C59] flex items-center justify-center text-white font-bold text-xl">
            T
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#172019]">Tahu SCM</h1>
            <p className="text-xs text-[#5F6961]">Sumber Gizi Intelligence System</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-bold text-[#172019]">Masuk ke Akun Anda</h2>
          <p className="text-xs text-[#5F6961]">
            Silakan masukkan kredensial untuk mengakses sistem SCM.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-[#FCEEEE] border border-[#C94A4A]/30 rounded-[8px] text-xs text-[#C94A4A] font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Username"
            placeholder="Masukkan username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="pt-2">
            <Button variant="primary" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? "Memproses..." : "Masuk ke System"}
            </Button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-[#E8ECE8] text-xs text-[#5F6961] bg-[#F8FAF8] p-3 rounded-[8px]">
          <div className="font-semibold text-[#172019] mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#4F7C59]" />
            Demo Credentials Quick Selection:
          </div>
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={() => {
                setUsername("manager");
                setPassword("password123");
              }}
              className="px-2 py-1 bg-white border border-[#DDE3DE] rounded text-[11px] font-medium hover:bg-[#E5EEE6]"
            >
              Manager Role
            </button>
            <button
              type="button"
              onClick={() => {
                setUsername("admin");
                setPassword("password123");
              }}
              className="px-2 py-1 bg-white border border-[#DDE3DE] rounded text-[11px] font-medium hover:bg-[#E5EEE6]"
            >
              Admin Role
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
