import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// library functions.
import { getEvent } from "@/lib/events";

// react components.
import EventFormWrapper from "@/components/EventFormWrapper";

// type definitions.
type Props = { params: { id: string } };

const EditEventPage = async ({ params }: Props) => {
  const cookieStore = await cookies();
  const userId = cookieStore.get("x-user-id")?.value;

  const event = await getEvent(params.id);

  if (event?.createdBy !== userId) {
    redirect("/");
  }

  if (!event) {
    return <div className="text-red-400">Event not found.</div>;
  }

  return <EventFormWrapper mode="edit" initialData={event} />;
};

export default EditEventPage;
