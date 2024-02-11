import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="p-24 flex w-full flex-col gap-6 items-center">
      <h1 className="font-bold text-2xl">Welcome to RichPanel - FB HelpDesk</h1>
      <div className="max-w-[200px] w-full space-x-8">
        <Button asChild variant="outline">
          <Link href="/register">Register</Link>
        </Button>
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </div>
  );
}
