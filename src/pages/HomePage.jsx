// src/pages/HomePage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import studySpaces from "../data/spaces.json";

export const HomePage = () => {
  const [search, setSearch] = useState("");

  const filteredSpaces = studySpaces.filter(
    (space) =>
      space.name.toLowerCase().includes(search.toLowerCase()) ||
      space.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ===== Header Section ===== */}
      <div className="relative bg-gray-100 rounded-b-3xl overflow-hidden">
        {/* Background Image */}
        <div className="relative h-[400px] w-full">
          <img
            src="/assets/header.jpg"
            className="w-full h-full object-cover"
            alt="Header"
          />
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Text Overlay */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Discover Your Perfect Study Spot
            </h1>
            <p className="text-gray-200 text-lg mb-8 max-w-2xl">
              Book the best co-working and study hubs near you. Comfortable,
              quiet, and ready when you are.
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-4 px-6 py-4 max-w-3xl w-full">
              <input
                type="text"
                placeholder="Search by name or location"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black outline-none"
              />
              <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*Study Space Cards*/}
      <div className="px-8 md:px-20 py-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-10">
          Available Study Spots
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredSpaces.map((space) => (
            <div
              key={space.id}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={space.main_image}
                alt={space.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {space.name}
                </h3>
                <p className="text-gray-500 text-sm">{space.location}</p>
                <p className="mt-3 text-black font-semibold">₱{space.price}</p>

                <p className="mt-3 text-gray-700">
                  <span className="font-medium">Opening Hours:</span>{" "}
                  {space.hours}
                </p>
                <Link
                  to={`/space/${space.id}`}
                  className="mt-4 inline-block bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}

          {filteredSpaces.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No study spaces found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
