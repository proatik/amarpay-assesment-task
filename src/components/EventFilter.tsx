"use client";

import { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const categories = ["All", "Conference", "Workshop", "Meetup"];

const EventFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "All";

  const [value, setValue] = useState(initialSearch);
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(value);
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    const query = new URLSearchParams();
    if (search) query.set("search", search);
    if (category && category !== "All") query.set("category", category);

    const queryString = query.toString();
    router.push(`/?${queryString}`, { scroll: false });
  }, [search, category, router]);

  return (
    <div className="bg-gray-900 p-4 rounded-md border border-gray-700 mb-4 shadow-sm backdrop-blur-md">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search
            size={16}
            className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-teal-400"
          />
          <input
            type="search"
            value={value}
            placeholder="Search events..."
            onChange={(e) => setValue(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:border-transparent text-sm"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-teal-400 flex-shrink-0" />
            <span className="text-slate-200 font-medium text-sm">
              Category:
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1 rounded-md text-xs cursor-pointer font-medium transition-all duration-200 ${
                  category === cat || (category === null && cat === "All")
                    ? "bg-indigo-600/80 text-slate-200"
                    : "bg-gray-800 text-gray-200 hover:bg-indigo-600/50 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventFilter;
