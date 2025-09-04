"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

// types.
import { EventFormData } from "@/types/event";

// type definitions.
type EventFormProps = {
  submitText?: string;
  initialData?: EventFormData;
  onSubmit: (data: EventFormData) => Promise<void>;
};

const categories = ["Conference", "Workshop", "Meetup"];

const EventForm = ({
  onSubmit,
  initialData,
  submitText = "Create Event",
}: EventFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormData>({ defaultValues: initialData });

  const handleFormSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={router.back}
        className="inline-flex items-center text-slate-200 hover:text-indigo-400 cursor-pointer mb-6 transition-colors duration-200"
      >
        <ArrowLeft size={18} className="mr-2" />
        Go Back
      </button>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="bg-gray-900 p-5 rounded-md border border-gray-700 shadow-sm backdrop-blur-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label
              htmlFor="title"
              className="block text-xs font-medium text-slate-200 mb-1"
            >
              Event Title *
            </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: "Title is required" })}
              className={`w-full px-3 py-2 border rounded-md bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/80 ${
                errors.title ? "border-red-400" : "border-gray-600"
              }`}
              placeholder="Enter event title"
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-400">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="description"
              className="block text-xs font-medium text-slate-200 mb-1"
            >
              Description *
            </label>
            <textarea
              id="description"
              rows={4}
              {...register("description", {
                required: "Description is required",
              })}
              className={`w-full px-3 py-2 border rounded-md bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/80 ${
                errors.description ? "border-red-400" : "border-gray-600"
              }`}
              placeholder="Describe your event"
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-xs font-medium text-slate-200 mb-1"
            >
              Date *
            </label>
            <input
              type="date"
              id="date"
              {...register("date", { required: "Date is required" })}
              className={`w-full px-3 py-2 border rounded-md bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/80 ${
                errors.date ? "border-red-400" : "border-gray-600"
              }`}
            />
            {errors.date && (
              <p className="mt-1 text-xs text-red-400">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="time"
              className="block text-xs font-medium text-slate-200 mb-1"
            >
              Time *
            </label>
            <input
              type="time"
              id="time"
              {...register("time", { required: "Time is required" })}
              className={`w-full px-3 py-2 border rounded-md bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/80 ${
                errors.time ? "border-red-400" : "border-gray-600"
              }`}
            />
            {errors.time && (
              <p className="mt-1 text-xs text-red-400">{errors.time.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-xs font-medium text-slate-200 mb-1"
            >
              Location *
            </label>
            <input
              type="text"
              id="location"
              {...register("location", { required: "Location is required" })}
              className={`w-full px-3 py-2 border rounded-md bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/80 ${
                errors.location ? "border-red-400" : "border-gray-600"
              }`}
              placeholder="Event location"
            />
            {errors.location && (
              <p className="mt-1 text-xs text-red-400">
                {errors.location.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-xs font-medium text-slate-200 mb-1"
            >
              Category *
            </label>
            <select
              id="category"
              {...register("category", { required: "Category is required" })}
              className="w-full px-3 py-2 border rounded-md bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/80 border-gray-600"
            >
              {categories.map((category) => (
                <option key={category} value={category} className="bg-gray-800">
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-4 py-2 bg-indigo-600/80 text-slate-200 rounded-md cursor-pointer hover:bg-indigo-600/50 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-200"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              submitText
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default EventForm;
