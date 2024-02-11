"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast, useToast } from "@/components/ui/use-toast";
import { callAPI } from "@/lib/http";
import { parseHash } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientPage() {
  const router = useRouter();
  const _toast = useToast();
  const [pageName, setPageName] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchFBPageData(tokenInfo: any) {
      setIsLoading(true);
      await getPages(tokenInfo);
      setIsLoading(false);
    }
    // To process token
    if (sessionStorage.getItem("auth-hash")) {
      console.log(parseHash(sessionStorage.getItem("auth-hash") || "{}"));
      const tokenInfo = parseHash(sessionStorage.getItem("auth-hash") || "{}");
      fetchFBPageData(tokenInfo);
      sessionStorage.removeItem("auth-hash");
    }
    // To process hash
    if (window.location.hash) {
      sessionStorage.removeItem("auth-hash");
      if (window.location.hash.includes("error")) {
        toast({
          title: "Uh oh!",
          variant: "destructive",
          description: "Connecting to Facebook failed.",
        });
      } else {
        sessionStorage.setItem("auth-hash", window.location.hash);
        router.replace("/client");
        return;
      }
    }
  }, []);

  useEffect(() => {
    async function fetchPageData() {
      setIsLoading(true);
      const response = await callAPI("api/integration", "GET");
      if (response) {
        setPageName(response.page_name);
      }
      setIsLoading(false);
    }
    fetchPageData();
  }, []);

  function connectWithFB() {
    window.location.href = process.env.NEXT_PUBLIC_FACEBOOK_AUTH_URL!;
  }

  async function deleteIntegration() {
    setIsLoading(true);
    const response = await callAPI("api/integration", "DELETE");
    if (response) {
      setPageName(undefined);
    }
    setIsLoading(false);
  }

  async function getPages(tokenInfo: any) {
    // Me
    const me = await fetch(
      `https://graph.facebook.com/v19.0/me?access_token=${tokenInfo.access_token}`,
      {
        method: "GET",
      }
    );
    if (me.ok) {
      const _me = await me.json();
      // Accounts
      const accounts = await fetch(
        `https://graph.facebook.com/v19.0/${_me.id}/accounts?access_token=${tokenInfo.access_token}`,
        {
          method: "GET",
        }
      );
      if (accounts.ok) {
        const _accounts = await accounts.json();
        if (_accounts.data.length != 1) {
          toast({
            title: "Uh oh!",
            variant: "destructive",
            description: "Please select a single Facebook page!",
          });
          return;
        } else {
          // TODO: Check MESSAGING or MODERATE task.
          const response = await callAPI("api/integration", "POST", {
            user_id: _me.id,
            page_id: _accounts.data[0].id,
            page_name: _accounts.data[0].name,
            page_access_token: _accounts.data[0].access_token,
            refresh_token: tokenInfo.long_lived_token,
            data_access_expiration_time: tokenInfo.data_access_expiration_time,
          });
          console.log(response);
          router.refresh();
        }
      }
    }
    
  }

  return (
    <main className="bg-primary w-screen h-screen">
      <div className="w-full flex items-center justify-center h-full p-8">
        <Card className="w-full md:w-[500px] rounded-2xl">
          <div className="flex flex-col items-center justify-center gap-4 p-10">
            <h1 className="font-semibold text-2xl">
              Facebook Page Integration
            </h1>
            {isLoading && <Loader2 className="h-18 animate-spin" />}
            {!isLoading &&
              (!pageName ? (
                <Button className="w-full text-lg mt-8" onClick={connectWithFB}>
                  Connect Page
                </Button>
              ) : (
                <>
                  <p className="my-4">
                    {"Integrated Page: "}
                    <span className="font-bold">{pageName}</span>
                  </p>
                  <Button
                    className="w-full text-lg"
                    variant="destructive"
                    onClick={deleteIntegration}
                  >
                    Delete Integration
                  </Button>
                  <Button
                    className="w-full text-lg"
                    onClick={() => router.push("/client/agent")}
                  >
                    Reply To Messages
                  </Button>
                </>
              ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
