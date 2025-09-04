"use client";

import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

type EventContextType = { userId: string };

const EventContext = createContext<EventContextType | undefined>(undefined);

const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      let id = localStorage.getItem("userId");

      if (!id) {
        id = generateId();
        localStorage.setItem("userId", id);
      }

      Cookies.set("x-user-id", id, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });

      setUserId(id);
    }
  }, []);

  const value = { userId };

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);

  if (context === undefined) {
    throw new Error("useEvents must be used within an EventProvider");
  }

  return context;
}
