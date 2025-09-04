import Link from "next/link";
import { Calendar, MapPin, Users, ArrowLeft } from "lucide-react";

// library functions.
import { getEvent } from "@/lib/events";

// Type definitions
type EventDetailPageProps = { params: Promise<{ id: string }> };

const EventDetailPage = async ({ params }: EventDetailPageProps) => {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-8 md:p-10 text-center max-w-2xl w-full transition-all hover:shadow-md hover:border-gray-600 backdrop-blur-md">
          <h2 className="text-3xl font-bold text-slate-200 mb-4">
            Event Not Found
          </h2>
          <p className="text-gray-200 text-base mb-6">
            Sorry, we couldn&apos;t find the event you&apos;re looking for. It
            may have been removed or doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-5 py-1.5 text-base font-medium bg-indigo-600/80 text-slate-200 rounded-md hover:bg-indigo-600/50 hover:text-white transition-all duration-200"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string, timeString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const date = new Date(`${dateString}T${timeString}`);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div>
      <Link
        href="/"
        className="inline-flex items-center text-slate-200 hover:text-indigo-400 mb-6 transition-colors duration-200"
      >
        <ArrowLeft size={18} className="mr-2" />
        Back to Events
      </Link>

      <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden transition-all hover:shadow-md hover:border-gray-600 backdrop-blur-md">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-600/50 text-indigo-200">
                  {event.category}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-200 mb-3">
                {event.title}
              </h1>
              <p className="text-gray-200 text-sm">{event.description}</p>
            </div>

            <form action={`/api/events/${event.id}/rsvp`} method="POST">
              <button
                disabled
                type="submit"
                className="px-6 py-2 bg-indigo-600/50 text-slate-200 rounded-md cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap disabled:cursor-not-allowed"
              >
                RSVP Now
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <Calendar
                className="text-teal-400 mr-4 mt-0.5 flex-shrink-0"
                size={20}
              />
              <div>
                <p className="text-sm text-gray-400 mb-1">Date & Time</p>
                <p className="font-medium text-slate-200">
                  {formatDate(event.date, event.time)}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin
                className="text-teal-400 mr-4 mt-0.5 flex-shrink-0"
                size={20}
              />
              <div>
                <p className="text-sm text-gray-400 mb-1">Location</p>
                <p className="font-medium text-slate-200">{event.location}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Users
                className="text-teal-400 mr-4 mt-0.5 flex-shrink-0"
                size={20}
              />
              <div>
                <p className="text-sm text-gray-400 mb-1">Attendees</p>
                <p className="font-medium text-slate-200">
                  {event.attendees} people attending
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
