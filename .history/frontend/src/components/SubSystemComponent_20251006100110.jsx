// export default function SubSystemComponent() {
//   return <div>SubSystemComponent</div>;
// }

import React from "react";

const SubSystemComponent = ({
  rackName = "Server Rack A1",
  location = "Data Center - Floor 2",
  capacity = "42U",
  available = "42U",
  status = "Empty",
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="w-80 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-2xl p-6 border-4 border-gray-700">
        {/* Rack Header Info */}
        <div className="bg-gray-950 rounded-t-lg p-4 mb-4 border-b-2 border-yellow-500">
          <h2 className="text-yellow-400 font-bold text-xl mb-2 tracking-wide">
            {rackName}
          </h2>
          <div className="text-gray-400 text-sm space-y-1">
            <p className="flex justify-between">
              <span>Location:</span>
              <span className="text-gray-300">{location}</span>
            </p>
            <p className="flex justify-between">
              <span>Capacity:</span>
              <span className="text-gray-300">{capacity}</span>
            </p>
            <p className="flex justify-between">
              <span>Available:</span>
              <span className="text-green-400 font-semibold">{available}</span>
            </p>
          </div>
        </div>

        {/* Empty Rack Slots */}
        <div className="space-y-1">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="h-8 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded border border-gray-500 relative overflow-hidden"
            >
              {/* Slot number */}
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-mono">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Mounting holes */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-800 border border-gray-500"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-gray-800 border border-gray-500"></div>
              </div>

              {/* Empty slot indicator */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-30"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Rack Footer Status */}
        <div className="mt-4 bg-gray-950 rounded-b-lg p-3 border-t-2 border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Status:</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-green-400 font-semibold text-sm">
                {status}
              </span>
            </div>
          </div>
        </div>

        {/* Ventilation Grills */}
        <div className="mt-4 flex justify-center gap-1">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-1 h-6 bg-gray-700 rounded-sm"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubSystemComponent;
