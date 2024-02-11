import { Card } from "@/components/ui/card";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-primary w-screen h-screen">
      <div className="w-full flex items-center justify-center h-full p-8">
        <Card className="w-full md:w-[500px] rounded-2xl">{children}</Card>
      </div>
    </main>
  );
}
