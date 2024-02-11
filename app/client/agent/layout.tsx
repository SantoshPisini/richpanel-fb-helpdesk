import AgentSideNav from "@/components/site/AgentSideNav";

export default function AgentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-screen h-screen">
      <div className="flex flex-row">
        <AgentSideNav />
        <div className="w-[calc(100vw-80px)]">{children}</div>
      </div>
    </main>
  );
}
