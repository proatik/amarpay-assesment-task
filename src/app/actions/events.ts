"use server";

import { revalidatePath } from "next/cache";
import { createEvent, deleteEvent, updateEvent } from "@/lib/events";

export async function handleCreateEvent(formData: FormData) {
  const newEvent = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    date: formData.get("date") as string,
    time: formData.get("time") as string,
    location: formData.get("location") as string,
    category: formData.get("category") as string,
    attendees: Number(formData.get("attendees") ?? 0),
    createdBy: formData.get("createdBy") as string,
  };

  const createdEvent = await createEvent(newEvent);

  if (createdEvent) {
    revalidatePath("/my-events");
  }
}

export async function handleUpdateEvent(id: string, formData: FormData) {
  const updates = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    date: formData.get("date") as string,
    time: formData.get("time") as string,
    location: formData.get("location") as string,
    category: formData.get("category") as string,
    attendees: Number(formData.get("attendees")),
    createdBy: formData.get("createdBy") as string,
  };

  const updatedEvent = await updateEvent(id, updates);

  if (updatedEvent) {
    revalidatePath("/");
  }
}

export async function handleDeleteEvent(id: string) {
  const isDeleted = await deleteEvent(id);

  if (isDeleted) {
    revalidatePath("/");
  }
}
