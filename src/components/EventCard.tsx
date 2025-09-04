"use client";

import Link from "next/link";
import { useState } from "react";
import { Calendar, MapPin, Users, Trash2, Edit2 } from "lucide-react";

// server actions.
import { handleDeleteEvent } from "@/app/actions/events";

// types.
import { Event } from "@/types/event";

// type definitions.
type EventCardProps = {
  event: Event;
  showEdit?: boolean;
  showDelete?: boolean;
};

const EventCard = ({
  event,
  showEdit = false,
  showDelete = false,
}: EventCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (dateString: string, timeString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const date = new Date(`${dateString}T${timeString}`);
    return date.toLocaleDateString("en-US", options);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

    setIsDeleting(true);

    try {
      await handleDeleteEvent(event.id);
    } catch (err) {
      console.log("An unexpected error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-md border border-gray-700 overflow-hidden transition-all hover:shadow-md hover:border-gray-600 backdrop-blur-md">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-base font-semibold text-indigo-400 line-clamp-1">
            {event.title}
          </h3>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-600/50 text-indigo-200">
            {event.category}
          </span>
        </div>

        <p className="text-gray-200 text-xs mb-3 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-1.5 mb-3">
          <div className="flex items-center text-xs text-slate-200">
            <Calendar size={14} className="mr-2 flex-shrink-0 text-teal-400" />
            <span>{formatDate(event.date, event.time)}</span>
          </div>

          <div className="flex items-center text-xs text-slate-200">
            <MapPin size={14} className="mr-2 flex-shrink-0 text-teal-400" />
            <span className="line-clamp-1">{event.location}</span>
          </div>

          <div className="flex items-center text-xs text-slate-200">
            <Users size={14} className="mr-2 flex-shrink-0 text-teal-400" />
            <span>{event.attendees} attending</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Link
            href={`/events/${event.id}`}
            className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-indigo-600/80 text-slate-200 rounded-md hover:bg-indigo-600/50 hover:text-white transition-all duration-200"
          >
            View Details
          </Link>

          <div className="flex gap-3">
            {showEdit && (
              <Link
                href={`/events/${event.id}/edit`}
                className={`inline-flex items-center p-1.5 text-blue-400 rounded-md cursor-pointer border border-blue-400/40 transition-all duration-200 ${
                  isDeleting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:text-blue-400 hover:bg-blue-400/20"
                }`}
                aria-label="Delete event"
              >
                <Edit2 size={14} />
              </Link>
            )}

            {showDelete && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`inline-flex items-center p-1.5 text-red-400 rounded-md cursor-pointer border border-red-400/40 transition-all duration-200 ${
                  isDeleting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:text-red-400 hover:bg-red-400/20"
                }`}
                aria-label="Delete event"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
