"use client";

import Link from "next/link";
import { LoginForm } from "../../../components/site/LoginForm";

export default function LoginPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 pt-12 px-10">
        <h1 className="font-semibold text-2xl">Login to your account</h1>
        <LoginForm />
        <p className="py-4 text-center text-sm">
          {"New to MyApp? "}
          <Link href="/register" className="text-primary">
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
}
