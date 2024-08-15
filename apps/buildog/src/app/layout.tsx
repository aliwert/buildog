"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import "@repo/ui/styles/global.css";
import { useEffect } from "react";
import { Auth } from "@/web-sdk";
import { Toaster } from "@ui/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });

/*export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};*/

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    Auth.onAuthenticationChange((eventMessage) => {
      if (eventMessage === "authentication_failed" && pathname !== "/signup/") {
        if (pathname !== "/") router.push("/login");
      }
    });

    return () => {
      Auth.removeAllListeners();
    };
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          <div className="flex w-full min-h-screen justify-center">{children}</div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
