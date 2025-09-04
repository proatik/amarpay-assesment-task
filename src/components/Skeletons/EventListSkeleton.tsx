const EventCardSkeleton = () => (
  <div className="bg-gray-900 rounded-md border border-gray-700 p-4 animate-pulse space-y-3">
    <div className="h-4 w-3/4 bg-gray-700 rounded"></div>
    <div className="h-3 w-full bg-gray-700 rounded"></div>
    <div className="h-3 w-5/6 bg-gray-700 rounded"></div>
    <div className="h-3 w-1/2 bg-gray-700 rounded"></div>
    <div className="h-8 w-24 bg-indigo-600/50 rounded-md mt-4"></div>
  </div>
);

const EventListSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
    {Array.from({ length: 6 }).map((_, i) => (
      <EventCardSkeleton key={i} />
    ))}
  </div>
);

export default EventListSkeleton;
