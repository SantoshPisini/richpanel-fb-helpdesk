"use client";

import AgentChat from "@/components/site/AgentChat";
import AgentConversations from "@/components/site/AgentConversations";
import UserProfile from "@/components/site/UserProfile";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ConvoResponseModel } from "@/models/Response/ConvoResponseModel";
import { useState } from "react";

export default function UserPage() {
  const [activeChat, setActiveChat] = useState<ConvoResponseModel | null>(null);
  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel minSize={20} defaultSize={25} maxSize={30}>
          <AgentConversations setActiveChat={setActiveChat} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={50} defaultSize={60} maxSize={80}>
          <AgentChat data={activeChat} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={20} defaultSize={25} maxSize={30}>
          {activeChat && <UserProfile data={activeChat} />}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
