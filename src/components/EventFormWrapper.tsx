"use client";

import { useRouter } from "next/navigation";

// contexts.
import { useEvents } from "@/contexts/EventContext";

// types.
import { Event, EventFormData } from "@/types/event";

// sever actions.
import { handleCreateEvent, handleUpdateEvent } from "@/app/actions/events";

// react components.
import EventForm from "./EventForm";

// type definitions.
type Props = { mode: "create" | "edit"; initialData?: Event };

const EventFormWrapper = ({ mode, initialData }: Props) => {
  const router = useRouter();
  const { userId } = useEvents();

  const onSubmit = async (data: EventFormData) => {
    if (mode === "edit" && initialData) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, String(value))
      );
      await handleUpdateEvent(initialData.id, formData);
    } else {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, String(value))
      );

      formData.append("attendees", "0");
      formData.append("createdBy", userId);

      await handleCreateEvent(formData);
    }

    router.push("/my-events");
  };

  return (
    <EventForm
      onSubmit={onSubmit}
      initialData={initialData}
      submitText={mode === "edit" ? "Update Event" : "Create Event"}
    />
  );
};

export default EventFormWrapper;
