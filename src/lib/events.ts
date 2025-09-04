"use server";

import { Event } from "@/types/event";
import { readData, writeData, generateId } from "@/utils/storage";

export async function getEvents(
  search?: string,
  category?: string
): Promise<Event[]> {
  let { events } = readData();

  if (search) {
    const lowerSearch = search.toLowerCase();
    events = events.filter(
      (e) =>
        e.title.toLowerCase().includes(lowerSearch) ||
        e.description.toLowerCase().includes(lowerSearch)
    );
  }

  if (category && category !== "All") {
    events = events.filter((e) => e.category === category);
  }

  return events;
}

export async function getMyEvents(userId?: string): Promise<Event[]> {
  const { events } = readData();
  return events.filter((e) => e.createdBy === userId);
}

export async function getEvent(id: string): Promise<Event | undefined> {
  const { events } = readData();
  return events.find((event) => event.id === id);
}

export async function createEvent(event: Omit<Event, "id">): Promise<Event> {
  const { events } = readData();

  const newEvent: Event = {
    id: generateId(),
    ...event,
  };

  const updated = [...events, newEvent];
  writeData({ events: updated });
  return newEvent;
}

export async function updateEvent(
  id: string,
  updatedData: Partial<Event>
): Promise<Event | null> {
  const { events } = readData();
  const index = events.findIndex((e) => e.id === id);

  if (index === -1) return null;

  const updatedEvent = { ...events[index], ...updatedData };
  events[index] = updatedEvent;

  writeData({ events });
  return updatedEvent;
}

export async function deleteEvent(id: string): Promise<boolean> {
  const { events } = readData();
  const filtered = events.filter((event) => event.id !== id);
  const isDeleted = filtered.length !== events.length;

  if (isDeleted) {
    writeData({ events: filtered });
  }

  return isDeleted;
}
