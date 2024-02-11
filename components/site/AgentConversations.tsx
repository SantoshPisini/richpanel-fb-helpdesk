"use client";

import { AlignLeft, RotateCw } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { callAPI } from "@/lib/http";
import { useEffect, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";

export default function AgentConversations() {
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await callAPI("api/conversations", "GET");
      if (response) {
        setConversations(response);
      }
    }
    fetchData();
  }, []);

  async function refreshAll() {
    const response = await callAPI("api/integration/refresh", "GET");
    if (response) {
      await callAPI("api/integration/sync", "GET");
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-row justify-between items-center h-16">
        <span className="flex flex-row gap-4 ml-4 items-center">
          <AlignLeft className="h-6 w-6" color="gray" />
          <h2 className="text-2xl font-semibold">Conversations</h2>
        </span>
        <Button variant="ghost" className="mt-[2px]" onClick={refreshAll}>
          <RotateCw className="h-6 w-6" />
        </Button>
      </div>
      <div className="divide-y divide-slate-200 border-y border-slate-200">
        {conversations.length == 0 && "Loading..."}
        {conversations.map((conversation: any, index) => {
          return (
            <div
              className="flex flex-col gap-4 p-4 cursor-pointer"
              key={conversation.conversation_id}
            >
              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-2 items-center">
                  <Checkbox></Checkbox>
                  <div className="flex flex-col ml-2">
                    <span className="font-semibold">Santosh Pisini</span>
                    <span className="text-sm">Facebook DM</span>
                  </div>
                </div>
                <span className="text-sm">
                  {formatDistanceToNowStrict(
                    new Date(conversation.updated_time)
                  )}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm line-clamp-1">Are you?</span>
                <span className="text-sm text-muted-foreground line-clamp-1">
                  Hi do you sell t shirts for all ages i want to buy those?
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
