import { Suspense } from "react";

// react components.
import EventList from "@/components/EventList";
import EventFilter from "@/components/EventFilter";
import EventListSkeleton from "@/components/Skeletons/EventListSkeleton";

// type definitions.
type SearchParams = { search?: string; category?: string };
type HomePageProps = { searchParams: Promise<SearchParams> };

const HomePage = async ({ searchParams }: HomePageProps) => {
  const { search, category } = await searchParams;

  return (
    <div className="px-4 sm:px-8 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-indigo-400 mb-2">
          Discover Events
        </h1>
        <p className="text-slate-300">
          Find and join amazing events happening around you
        </p>
      </div>

      <EventFilter />

      <Suspense fallback={<EventListSkeleton />}>
        <EventList search={search} category={category} />
      </Suspense>
    </div>
  );
};

export default HomePage;
