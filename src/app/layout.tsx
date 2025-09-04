import "./globals.css";
import { type Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eventify - Event Management System",
  description: "Manage and discover events with ease",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

// contexts.
import { EventProvider } from "@/contexts/EventContext";

// react components.
import Header from "@/components/Header";

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <EventProvider>
          <div className="min-h-screen bg-zinc-950">
            <Header />
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
          </div>
        </EventProvider>
      </body>
    </html>
  );
};

export default RootLayout;
