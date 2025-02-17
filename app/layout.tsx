import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster";

import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const ibmPlexSans = localFont({
  src: [
    { path: "./fonts/IBMPlexSans-Regular.ttf", style: "normal", weight: "400" },
    { path: "./fonts/IBMPlexSans-Medium.ttf", style: "normal", weight: "500" },
    {
      path: "./fonts/IBMPlexSans-SemiBold.ttf",
      style: "normal",
      weight: "600",
    },
    { path: "./fonts/IBMPlexSans-Bold.ttf", style: "normal", weight: "700" },
  ],
});
const bebasNeue = localFont({
  src: [
    { path: "./fonts/BebasNeue-Regular.ttf", style: "normal", weight: "400" },
  ],
  variable: "--bebas-neue",
});

export const metadata: Metadata = {
  title: "BookWise",
  description: "BookWise is a book university library management solution.",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}
        >
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
