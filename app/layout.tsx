import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { AppProvider } from "@/lib/app-context";

export const metadata: Metadata = {
  title: "MXP Brand Offer → Match Explorer",
  description: "Align your creatives to offers and export mappings for activation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[var(--mxp-gray-50)]" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
        <AppProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 ml-52">
              <Header />
              <main className="p-6">
                {children}
              </main>
            </div>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
