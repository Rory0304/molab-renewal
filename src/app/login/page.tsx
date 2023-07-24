"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState("sign-in");
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await supabase.auth
        .signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback`,
          },
        })
        .finally(() => setView("check-email"));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await supabase.auth
        .signInWithPassword({
          email,
          password,
        })
        .then(() => {
          router.push("/");
        });
    } catch (err) {
      console.log("fail to login", err);
    }
  };

  return (
    <div className="flex flex-col justify-center flex-1 w-full max-w-sm gap-2">
      {view === "check-email" ? (
        <p className="text-center text-neutral-400">
          <span className="font-bold text-white">{email}</span> 을 확인하여
          회원가입을 진행해주세요.
        </p>
      ) : (
        <form
          className="flex flex-col justify-center flex-1 w-full max-w-sm gap-2"
          onSubmit={view === "sign-in" ? handleSignIn : handleSignUp}
        >
          <label className="text-md text-neutral-400" htmlFor="email">
            이메일
          </label>
          <input
            className="px-4 py-2 mb-6 border rounded-md bg-inherit text-neutral-100"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="you@example.com"
          />
          <label className="text-md text-neutral-400" htmlFor="password">
            비밀번호
          </label>
          <input
            className="px-4 py-2 mb-6 border rounded-md bg-inherit text-neutral-100"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="••••••••"
          />
          {view === "sign-in" ? (
            <>
              <button className="px-4 py-2 mb-6 bg-green-700 rounded text-neutral-200">
                로그인
              </button>
              <p className="text-sm text-center text-neutral-500">
                계정이 없으신가요?
                <button
                  className="ml-1 text-white underline"
                  onClick={() => setView("sign-up")}
                >
                  회원가입
                </button>
              </p>
            </>
          ) : null}
          {view === "sign-up" ? (
            <>
              <button className="px-4 py-2 mb-6 bg-green-700 rounded text-neutral-200">
                회원가입
              </button>
              <p className="text-sm text-center text-neutral-500">
                이미 계정이 있으신가요?
                <button
                  className="ml-1 text-white underline"
                  onClick={() => setView("sign-in")}
                >
                  로그인
                </button>
              </p>
            </>
          ) : null}
        </form>
      )}
    </div>
  );
}
