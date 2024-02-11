import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "RichPanel - FB HelpDesk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // https://assets-global.website-files.com/628202eb7980b612a999fc44/62b3625fb75d80146d5aa97c_favicon.png
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
        {/* <Providers>{children}</Providers> */}
        <Toaster />
      </body>
    </html>
  );
}
