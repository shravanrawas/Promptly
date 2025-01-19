import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ReduxProvider from "@/components/reduxprovider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Promptly",
  description: "Ask any thing just by prompt",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          avatarBox: "w-10 h-10",
        },
      }}
    >
      <html lang="en">
        <body className={`${inter.className}`}>
          <ReduxProvider>{children}</ReduxProvider>
          <Toaster/>
        </body>
      </html>
    </ClerkProvider>
  );
}
