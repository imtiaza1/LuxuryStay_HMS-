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

// API endpoints (placeholder for backend integration)
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
  ROOMS: "/api/rooms",
  BOOKINGS: "/api/bookings",
  REVIEWS: "/api/reviews",
  TASKS: "/api/tasks",
  USERS: "/api/users",
  DASHBOARD: "/api/dashboard",
  LOGOUT: "/api/auth/logout",
  // dashborad
  TOTAL_REVENUE: "/api/billings/total-revenue",
  ACTIVE_GUESTS: "/api/guest/active-guests/count",
  AVAILABLE_ROOMS: "/api/rooms/available/rooms",
  RECENT_BOOKINGS: "/api/bookings/",
  HOUSEKEEPING_TASKS: "/api/tasks/",
  TOTAL_BOOKINGS: "/api/bookings/total",
};
