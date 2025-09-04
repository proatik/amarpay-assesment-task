// library function.
import { getEvents } from "@/lib/events";

// react components.
import EventCard from "./EventCard";

// type definitions.
type EventListProps = { search?: string; category?: string };

const EventList = async ({ search, category }: EventListProps) => {
  const events = await getEvents(search, category);

  if (events.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-900 rounded-xl border border-gray-700 mt-6">
        <div className="text-gray-500 mb-4">
          <svg
            className="mx-auto h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className="text-slate-400 text-lg mb-2">
          No events found. Try adjusting your filters.
        </p>
        <p className="text-slate-500 text-sm">
          Or be the first to create an event!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
