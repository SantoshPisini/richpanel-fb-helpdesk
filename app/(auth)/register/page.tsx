"use client";

import Link from "next/link";
import { RegisterForm } from "../../../components/site/RegisterForm";

export default function RegistrationPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 pt-12 px-10">
        <h1 className="font-semibold text-2xl">Create Account</h1>
        <RegisterForm />
        <p className="py-4 text-center text-sm">
          {"Already have an account? "}
          <Link href="/login" className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </>
  );
}
