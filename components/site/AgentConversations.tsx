"use client";

import { AlignLeft, RotateCw } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { callAPI } from "@/lib/http";
import { useEffect, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { ConvoResponseModel } from "@/models/Response/ConvoResponseModel";

export default function AgentConversations({
  setActiveChat,
}: {
  setActiveChat: any;
}) {
  const [conversations, setConversations] = useState<
    ConvoResponseModel[] | null
  >(null);

  async function fetchData() {
    const response = await callAPI("api/conversations", "GET");
    if (response) {
      setConversations(response);
      setActiveChat(response[0]);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  async function refreshAll() {
    const response = await callAPI("api/integration/refresh", "GET");
    if (response) {
      await callAPI("api/integration/sync", "GET");
      await fetchData();
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-row justify-between items-center h-16">
        <span className="flex flex-row gap-4 ml-4 items-center">
          <AlignLeft className="h-6 w-6" color="gray" />
          <h2 className="text-2xl font-semibold">Conversations</h2>
        </span>
        <Button variant="ghost" className="mt-[2px]" onClick={refreshAll} id="force-refresh">
          <RotateCw className="h-6 w-6" />
        </Button>
      </div>
      <div className="divide-y divide-slate-200 border-y border-slate-200">
        {conversations === null && "Loading..."}
        {conversations && conversations.length === 0 && "No Conversations"}
        {conversations &&
          conversations?.map((conversation: ConvoResponseModel, index) => {
            return (
              <div
                className="flex flex-col gap-4 p-4 cursor-pointer"
                key={conversation.conversation_id}
                onClick={() => {
                  setActiveChat(conversation);
                }}
              >
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row gap-2 items-center">
                    <Checkbox></Checkbox>
                    <div className="flex flex-col ml-2">
                      <span className="font-semibold">
                        {conversation.messages[0].message_from_name}
                      </span>
                      <span className="text-sm">
                        {conversation.messages[0].message_to_name}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm">
                    {formatDistanceToNowStrict(
                      new Date(conversation.updated_time)
                    )}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm line-clamp-1">
                    {conversation.messages[0].message}
                  </span>
                  <span className="text-sm text-muted-foreground line-clamp-1">
                    {conversation.messages[1]?.message}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
