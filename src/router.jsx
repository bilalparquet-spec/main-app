/**
 * router.jsx — Central routing for DriveRent
 *
 * Route map:
 *   /                  → Home (car listing, sections)
 *   /car/:id           → Car detail
 *   /agency/:id        → Agency detail
 *   /favorites         → Saved cars       (protected)
 *   /trips             → My trips         (protected)
 *   /messages          → Messages         (protected)
 *   /profile           → Profile          (protected)
 *   /login             → Login
 *   /register          → Register
 *   /auth/google       → Google OAuth
 *   /auth/apple        → Apple OAuth
 *   /agency-register   → Agency registration
 *   *                  → redirect to /
 */
import { createBrowserRouter, Navigate } from "react-router-dom";
import App                  from "./App.jsx";
import { LoginPage }        from "./components/pages/LoginPage.jsx";
import { RegisterPage }     from "./components/pages/RegisterPage.jsx";
import { GoogleAuthPage }   from "./components/pages/GoogleAuthPage.jsx";
import { AppleAuthPage }    from "./components/pages/AppleAuthPage.jsx";
import { AgencyRegisterPage } from "./components/pages/AgencyRegisterPage.jsx";

const router = createBrowserRouter([
  // ── Shell routes handled inside App ───────────────────────────────────────
  { path: "/",            element: <App /> },
  { path: "/car/:id",     element: <App /> },
  { path: "/agency/:id",  element: <App /> },
  { path: "/favorites",   element: <App /> },
  { path: "/trips",       element: <App /> },
  { path: "/messages",    element: <App /> },
  { path: "/profile",     element: <App /> },

  // ── Full-page auth routes ─────────────────────────────────────────────────
  { path: "/login",           element: <LoginPage /> },
  { path: "/register",        element: <RegisterPage /> },
  { path: "/auth/google",     element: <GoogleAuthPage /> },
  { path: "/auth/apple",      element: <AppleAuthPage /> },
  { path: "/agency-register", element: <AgencyRegisterPage /> },

  // ── Catch-all ─────────────────────────────────────────────────────────────
  { path: "*", element: <Navigate to="/" replace /> },
]);

export default router;
