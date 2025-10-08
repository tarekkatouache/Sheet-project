// import React, { useState, useEffect } from "react";
// import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";

// const SubsystemsPerSystem = ({ systemId, onBack, onSubsystemClick }) => {
//   const [subsystems, setSubsystems] = useState([]);
//   const [systemName, setSystemName] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (systemId) {
//       fetchSubsystems();
//     }
//   }, [systemId]);

//   const fetchSubsystems = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       // Fetch system details
//       const systemResponse = await fetch(`/api/systems/${systemId}`);
//       if (!systemResponse.ok) throw new Error("Failed to fetch system details");
//       const systemData = await systemResponse.json();
//       setSystemName(systemData.name);

//       // Fetch subsystems for this system
//       const subsystemsResponse = await fetch(
//         `/api/subsystems?systemId=${systemId}`
//       );
//       if (!subsystemsResponse.ok) throw new Error("Failed to fetch subsystems");
//       const subsystemsData = await subsystemsResponse.json();
//       setSubsystems(subsystemsData);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubsystemClick = (subsystem) => {
//     if (onSubsystemClick) {
//       onSubsystemClick(subsystem);
//     }
//   };

//   const handleBackClick = () => {
//     if (onBack) {
//       onBack();
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
//           <p className="text-gray-600">Loading subsystems...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
//           <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">
//             Error
//           </h2>
//           <p className="text-gray-600 text-center mb-6">{error}</p>
//           <button
//             onClick={handleBackClick}
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
//           >
//             Back to Systems
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <button
//             onClick={handleBackClick}
//             className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5 mr-2" />
//             Back to Systems
//           </button>

//           <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-600">
//             <h1 className="text-3xl font-bold text-gray-900">{systemName}</h1>
//             <p className="text-gray-600 mt-2">
//               {subsystems.length}{" "}
//               {subsystems.length === 1 ? "Subsystem" : "Subsystems"}
//             </p>
//           </div>
//         </div>

//         {/* Subsystems Grid */}
//         {subsystems.length === 0 ? (
//           <div className="bg-white rounded-lg shadow-sm p-12 text-center">
//             <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-gray-700 mb-2">
//               No Subsystems Found
//             </h3>
//             <p className="text-gray-500">
//               This system doesn't have any subsystems yet.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {subsystems.map((subsystem) => (
//               <div
//                 key={subsystem.id}
//                 onClick={() => handleSubsystemClick(subsystem)}
//                 className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-200 hover:border-blue-500 transform hover:-translate-y-1"
//               >
//                 <div className="p-6">
//                   <div className="flex items-start justify-between mb-4">
//                     <h3 className="text-xl font-semibold text-gray-900 flex-1">
//                       {subsystem.name}
//                     </h3>
//                     <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
//                       {subsystem.status || "Active"}
//                     </span>
//                   </div>

//                   {subsystem.description && (
//                     <p className="text-gray-600 text-sm mb-4 line-clamp-3">
//                       {subsystem.description}
//                     </p>
//                   )}

//                   <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
//                     <span>ID: {subsystem.id}</span>
//                     {subsystem.componentCount !== undefined && (
//                       <span>{subsystem.componentCount} components</span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SubsystemsPerSystem;
