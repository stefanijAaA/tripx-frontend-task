# TripX Frontend Assignment

A frontend implementation of a login and destinations interface for TripX, demonstrating authentication flow, protected routes, API integration, and client-side state management.

---

## Tech Stack

| Category        | Technology                            |
| --------------- | ------------------------------------- |
| Framework       | Next.js (App Router)                  |
| Language        | TypeScript                            |
| Data Fetching   | React Query (`@tanstack/react-query`) |
| Form Management | React Hook Form                       |
| Validation      | Zod                                   |
| HTTP Client     | Axios                                 |
| Styling         | TailwindCSS                           |
| Icons           | Lucide React                          |

---

## Features

### Authentication

- Login form with validation
- Password visibility toggle
- Failed login attempt lockout
- Temporary client session token generation
- Protected routes for authenticated users

### Destinations

- Fetch destinations from API
- Search by name, country, or alias
- Loading skeletons while fetching data
- Error and empty states

### Booking Code

- Optional booking code entry during login
- Persisted in `localStorage`
- Displayed as a banner on the destinations page

---

## Project Structure

```
src
├── app          # Next.js routes and pages
├── components   # Shared UI components
├── domains      # Feature-specific logic and UI
├── form-fields  # Reusable form field components
├── hooks        # Custom React hooks
├── lib          # Auth and session utilities
├── providers    # App-level providers (React Query, etc.)
├── services     # API service functions
└── utils        # Constants and helper utilities
```

---

## Authentication Approach

The backend login endpoint does not return a session token or cookie. To maintain authenticated state, a **temporary session token is generated client-side** after a successful login response.

Protected routes are guarded using:

```ts
requireAuthenticatedUser();
```

This ensures unauthenticated users cannot access protected pages.

---

## Booking Code Storage

The booking code is treated as non-sensitive UI data and stored in `localStorage`. This allows the destinations page to display the booking code banner without requiring any server-side access.

---

## Getting Started

**1. Install dependencies:**

```bash
npm install
```

**2. Start the development server:**

```bash
npm run dev
```

**3. Open in your browser:**

```
http://localhost:3000
```
