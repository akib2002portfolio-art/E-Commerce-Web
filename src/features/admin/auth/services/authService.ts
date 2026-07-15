/**
 * Mock admin authentication service.
 *
 * This is the single abstraction layer the rest of the admin CMS talks to.
 *
 * Today:
 *  - Mock authentication
 *  - No persistence
 *  - No React
 *  - No Supabase
 *
 * Later:
 *  - Replace ONLY this file with Supabase Auth.
 *  - Hooks, guards, routes and UI remain unchanged.
 */

export type AdminRole = "owner" | "admin" | "editor";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
}

export interface LoginSuccess {
  success: true;
  user: AdminUser;
}

export interface LoginFailure {
  success: false;
  error: string;
}

export type LoginResult = LoginSuccess | LoginFailure;

export interface LogoutResult {
  success: true;
}

/**
 * Single mock admin user.
 * Reused throughout the mock service to avoid duplicate literals.
 */
export const mockAdminUser: AdminUser = {
  id: "admin-1",
  name: "Administrator",
  email: "admin@bdcollection.com",
  role: "admin",
};

/**
 * Simulates API latency.
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function login(
  email: string,
  password: string,
): Promise<LoginResult> {
  await delay(400);

  if (!email.trim() || !password.trim()) {
    return {
      success: false,
      error: "Invalid credentials",
    };
  }

  return {
    success: true,
    user: {
      ...mockAdminUser,
      email,
    },
  };
}

async function logout(): Promise<LogoutResult> {
  await delay(200);

  return {
    success: true,
  };
}

/**
 * Returns the current authenticated admin.
 *
 * NOTE:
 * Returns AdminUser | null because this matches how
 * Supabase/Auth providers behave in production.
 */
async function getCurrentUser(): Promise<AdminUser | null> {
  await delay(150);

  return mockAdminUser;

  // Later:
  // return null;
}

async function isAuthenticated(): Promise<boolean> {
  await delay(100);

  return true;

  // Later:
  // return !!session;
}

export const authService = Object.freeze({
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
});