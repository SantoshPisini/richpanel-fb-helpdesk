"use client";

import Image from "next/image";
import { GitGraph, Inbox, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { callAPI } from "@/lib/http";
import { useRouter } from "next/navigation";

export default function AgentSideNav() {
  const router = useRouter();
  return (
    <nav className="w-20 bg-primary flex flex-col h-screen justify-between items-center py-4">
      <div className="flex flex-col gap-0 w-full items-center justify-center">
        <Link href={""} className="p-2 pb-6">
          <div className="bg-white rounded-sm">
            <GitGraph className="h-8 w-8" color="hsl(221.2 83.2% 53.3%)" />
          </div>
        </Link>
        <Link
          href={""}
          className="bg-white h-16 w-full flex items-center justify-center"
        >
          <Inbox className="h-8 w-8" color="hsl(221.2 83.2% 53.3%)" />
        </Link>
        <Link href={""} className="p-4">
          <Users className="h-8 w-8" color="white" />
        </Link>
        <Link href={""} className="p-4">
          <TrendingUp className="h-8 w-8" color="white" />
        </Link>
      </div>
      <div className="relative">
        <Image
          src="https://i.pravatar.cc/150"
          width={40}
          height={40}
          className="rounded-full cursor-pointer"
          alt="Picture of the author"
          onClick={async () => {
            sessionStorage.clear();
            await callAPI("api/agents/logout", "GET");
            router.replace("/login");
          }}
        />
        <span className="bottom-0 start-7 absolute w-3 h-3 bg-green-500 rounded-full"></span>
      </div>
    </nav>
  );
}
