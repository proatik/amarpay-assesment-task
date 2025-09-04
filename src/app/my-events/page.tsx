import Link from "next/link";
import { cookies } from "next/headers";

// library functions.
import { getMyEvents } from "@/lib/events";

// react components.
import EventCard from "@/components/EventCard";

const MyEventsPage = async () => {
  const cookieStore = await cookies();
  const userId = cookieStore.get("x-user-id")?.value;

  const events = await getMyEvents(userId);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-200">My Events</h1>
        <Link
          href="/events/create"
          className="px-5 py-2.5 text-base font-medium bg-indigo-600/80 text-slate-200 rounded-md hover:bg-indigo-600/50 hover:text-white transition-all duration-200"
        >
          Create New Event
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="bg-gray-900 rounded-xl border border-gray-700 p-8 md:p-10 text-center max-w-2xl w-full transition-all hover:shadow-md hover:border-gray-600 backdrop-blur-md">
            <p className="text-gray-200 text-base mb-6">
              You haven&apos;t created any events yet.
            </p>
            <Link
              href="/events/create"
              className="px-5 py-2.5 text-base font-medium bg-indigo-600/80 text-slate-200 rounded-md hover:bg-indigo-600/50 hover:text-white transition-all duration-200"
            >
              Create Your First Event
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              event={event}
              key={event.id}
              showEdit={true}
              showDelete={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default MyEventsPage;
