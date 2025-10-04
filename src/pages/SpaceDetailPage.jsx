// src/pages/SpaceDetailPage.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import studySpaces from "../data/spaces.json";
import { BookingForm } from "../components/BookingForm";

export const SpaceDetailPage = () => {
  const { spaceId } = useParams();
  const space = studySpaces.find((s) => s.id.toString() === spaceId);

  const fixPath = (path) => (path.startsWith("/") ? path : `/${path}`);

  // Track hero image (default is main_image)
  const [heroImage, setHeroImage] = useState(space?.main_image || "");

  if (!space) return <div className="p-8">Space not found.</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Hero Image Section */}
      <div
        className="relative w-full h-80 md:h-96 rounded-xl shadow-lg bg-cover bg-center"
        style={{
          backgroundImage: `url(${fixPath(heroImage)})`,
        }}
      >
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-xl"></div>

        {/* Space name overlay */}
        <div className="absolute bottom-4 left-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            {space.name}
          </h1>
        </div>
      </div>

      {/* Gallery Thumbnails */}
      {space.images && space.images.length > 0 && (
        <div className="mt-4 flex gap-3 overflow-x-auto">
          {/* Back to main image thumbnail */}
          <img
            src={fixPath(space.main_image)}
            alt="Main Image"
            onClick={() => setHeroImage(space.main_image)}
            className={`w-36 h-28 object-cover rounded-md cursor-pointer transition 
                        transform hover:scale-105 hover:shadow-lg ${
                          heroImage === space.main_image
                            ? "ring-2 ring-green-500"
                            : ""
                        }`}
          />

          {/* Other thumbnails */}
          {space.images.map((img, index) => (
            <img
              key={index}
              src={fixPath(img)}
              alt={`${space.name} image ${index + 1}`}
              onClick={() => setHeroImage(img)}
              className={`w-36 h-28 object-cover rounded-md cursor-pointer transition 
                          transform hover:scale-105 hover:shadow-lg ${
                            heroImage === img ? "ring-2 ring-green-500" : ""
                          }`}
            />
          ))}
        </div>
      )}

      {/* Details */}
      <p className="text-gray-600 mt-4">{space.location}</p>
      <p className="mt-4">{space.description}</p>

      {/* Amenities */}
      {space.amenities && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Amenities
          </h2>
          <ul className="flex flex-wrap gap-2">
            {space.amenities.map((amenity, i) => (
              <li
                key={i}
                className="bg-gray-100 px-3 py-1 rounded-md text-sm text-gray-700 border"
              >
                {amenity}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Show Hours */}
      <p className="mt-3 text-gray-700">
        <span className="font-medium">Opening Hours:</span> {space.hours}
      </p>

      {/* Booking Form */}
      <BookingForm space={space} />
    </div>
  );
};
