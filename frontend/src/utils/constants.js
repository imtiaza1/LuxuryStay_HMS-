// User roles
export const ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  RECEPTIONIST: "receptionist",
  HOUSEKEEPING: "housekeeping",
  GUEST: "guest",
};

// Dashboard routes based on roles
export const DASHBOARD_ROUTES = {
  [ROLES.ADMIN]: "/dashboard/admin",
  [ROLES.MANAGER]: "/dashboard/manager",
  [ROLES.RECEPTIONIST]: "/dashboard/receptionist",
  [ROLES.HOUSEKEEPING]: "/dashboard/housekeeping",
  [ROLES.GUEST]: "/dashboard/guest",
};

// Room types
export const ROOM_TYPES = {
  STANDARD: "standard",
  DELUXE: "deluxe",
  SUITE: "suite",
  PRESIDENTIAL: "presidential",
};

// Booking status
export const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CHECKED_IN: "checked_in",
  CHECKED_OUT: "checked_out",
  CANCELLED: "cancelled",
};

// Task status
export const TASK_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
};

// API endpoints  for backend integration
export const API_ENDPOINTS = {
  LOGIN: "/api/auth/login",
  GUEST_REGISTER: "/api/guest/register",
  //GUEST
  RECEPTIONIST_REGISTER: "/api/receptionist/register",
  HOUSEKEEPING_REGISTER: "/api/housekeeping/register",
  MANAGER_REGISTER: "/api/manager/register",
  GET_ALL_STAFF: "/api/admin/staff",
  DELETE_STAFF: "/api/admin/staff/delete",
  UPDATE_STAFF: "/api/admin/staff/update",
  //
  REFRESH: "/api/auth/refresh",
  //rooms
  GET_ALL_AVAILABLE_ROOMS: "/api/rooms/available/rooms",
  GET_ALL_ROOMS: "/api/rooms",
  UPDATE_ROOM: "/api/rooms/update",
  CREATE_ROOM: "/api/rooms/create",
  DELETE_ROOM: "/api/rooms/delete",
  GET_SINGLE_ROOM: "/api/rooms",
  OTHERS_ROOMS: "/api/rooms/available/rooms/other",
  UPDATE_TASKS: "/api/tasks/update",
  DELETE_TASKS: "/api/tasks",
  UPDATE_STATUS: "/api/tasks",
  //bookings
  BOOKINGS: "/api/bookings",
  CREATE_BOOKING: "/api/bookings/create",
  UPDATE_BOOKING: "/api/bookings/update",
  DELETE_BOOKING: "/api/bookings/delete",
  // billings
  BILLINGS: "/api/billings",
  // reviews
  REVIEWS: "/api/reviews",
  DELETE_REVIEW: "/api/reviews",
  GET_REVIEWS_BY_ROOM: "/api/reviews",
  // TASK
  GET_ALL_TASK: "/api/tasks",
  GET_ALL_HOUSEKEEPING: "/api/housekeeping",
  CREATE_TASK: "api/tasks/create",

  USERS: "/api/users",
  DASHBOARD: "/api/dashboard",
  LOGOUT: "/api/auth/logout",
  // dashborad
  TOTAL_REVENUE: "/api/billings/total-revenue",
  ACTIVE_GUESTS: "/api/guest/active-guests/count",
  AVAILABLE_ROOMS: "/api/rooms/available/rooms/count",
  RECENT_BOOKINGS: "/api/bookings",
  HOUSEKEEPING_TASKS: "/api/tasks",
  TOTAL_BOOKINGS: "/api/bookings/total",
  //housekeeping /my-tasks"
  MY_TASKS: "/api/housekeeping/my-tasks",
};
