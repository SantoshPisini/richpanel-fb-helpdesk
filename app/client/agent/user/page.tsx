import AgentChat from "@/components/site/AgentChat";
import AgentConversations from "@/components/site/AgentConversations";
import UserProfile from "@/components/site/UserProfile";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function UserPage() {
  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel minSize={20} defaultSize={25} maxSize={30}>
          <AgentConversations />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={50} defaultSize={60} maxSize={80}>
          <AgentChat />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={20} defaultSize={25} maxSize={30}>
          <UserProfile />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
