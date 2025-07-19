// import axios from "axios";
// import { useEffect, useState } from "react";

// const HousekeepingPage = () => {
//   const [rooms, setRooms] = useState([]);
//   const [filteredRooms, setFilteredRooms] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const [sortKey, setSortKey] = useState("roomNumber");

//   useEffect(() => {
//     fetchRooms();
//   }, []);

//   const fetchRooms = async () => {
//     try {
//       const res = await axios.get("/api/rooms");
//       setRooms(res.data);
//       setFilteredRooms(res.data);
//     } catch (error) {
//       console.error("Failed to fetch rooms", error);
//     }
//   };

//   const handleFilterChange = (value) => {
//     setFilter(value);
//     if (value === "all") return setFilteredRooms(rooms);
//     const filtered = rooms.filter((room) => room.status === value);
//     setFilteredRooms(filtered);
//   };

//   const handleSortChange = (value) => {
//     setSortKey(value);
//     const sorted = [...filteredRooms].sort((a, b) => {
//       if (value === "roomNumber")
//         return a.roomNumber.localeCompare(b.roomNumber);
//       if (value === "status") return a.status.localeCompare(b.status);
//       if (value === "staff")
//         return a.assignedStaff?.name.localeCompare(b.assignedStaff?.name);
//     });
//     setFilteredRooms(sorted);
//   };

//   const handleAction = async (roomId, actionType) => {
//     try {
//       await axios.put(`/api/rooms/${roomId}/action`, { actionType });
//       fetchRooms();
//     } catch (err) {
//       console.error("Action failed", err);
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-semibold">Housekeeping Management</h2>
//         <div className="flex gap-4">
//           <Select onValueChange={handleFilterChange}>
//             <SelectTrigger>
//               <SelectValue placeholder="Filter Status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All</SelectItem>
//               <SelectItem value="available">Available</SelectItem>
//               <SelectItem value="occupied">Occupied</SelectItem>
//               <SelectItem value="cleaning">Cleaning</SelectItem>
//               <SelectItem value="maintenance">Maintenance</SelectItem>
//             </SelectContent>
//           </Select>
//           <Select onValueChange={handleSortChange}>
//             <SelectTrigger>
//               <SelectValue placeholder="Sort By" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="roomNumber">Room Number</SelectItem>
//               <SelectItem value="status">Cleaning Status</SelectItem>
//               <SelectItem value="staff">Assigned Staff</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {filteredRooms.length === 0 ? (
//           <p>No rooms found.</p>
//         ) : (
//           filteredRooms.map((room) => (
//             <Card key={room._id}>
//               <CardContent className="p-4">
//                 <p className="font-medium text-lg">Room {room.roomNumber}</p>
//                 <p>Type: {room.type}</p>
//                 <p>Status: {room.status}</p>
//                 <p>
//                   Last Cleaned:{" "}
//                   {room.lastCleanedTime
//                     ? new Date(room.lastCleanedTime).toLocaleString()
//                     : "N/A"}
//                 </p>
//                 <p>
//                   Assigned Staff: {room.assignedStaff?.name || "Unassigned"}
//                 </p>
//                 <p className="text-sm text-red-600">
//                   Maintenance: {room.maintenanceNote || "None"}
//                 </p>
//                 <div className="flex gap-2 mt-2">
//                   <Button
//                     size="sm"
//                     onClick={() => handleAction(room._id, "assign")}
//                   >
//                     Assign
//                   </Button>
//                   <Button
//                     size="sm"
//                     onClick={() => handleAction(room._id, "cleaned")}
//                   >
//                     Mark Cleaned
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="destructive"
//                     onClick={() => handleAction(room._id, "report")}
//                   >
//                     Report Issue
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default HousekeepingPage;

const HousekeepingPage = () => {
  return <div>HousekeepingPage lol should i make this page or not 😂</div>;
};

export default HousekeepingPage;
