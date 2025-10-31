## Fullstack Chat App — Frontend

This is the frontend for the Fullstack Chat App (React + Vite + Tailwind). It provides the UI and connects to a backend API and Socket.IO server. This README explains how to set up, run, build, and troubleshoot the frontend locally.

---

## Prerequisites

- Node.js (recommended v18+). The project works with Node >=16 but v18+ is preferred.
- npm (bundled with Node) or Yarn / pnpm. Examples below use npm.

## Quick start

1. Install dependencies

```powershell
npm install
```

2. Start development server

```powershell
npm run dev
```

The dev server runs using Vite and will typically be available at http://localhost:5173 (Vite will print the exact URL).

3. Build for production

```powershell
npm run build
```

4. Preview the production build locally

```powershell
npm run preview
```

5. Lint the code

```powershell
npm run lint
```

---

## What scripts are available

- `npm run dev` — start Vite development server
- `npm run build` — build production assets
- `npm run preview` — locally preview the production build
- `npm run lint` — run ESLint across the project

These scripts are defined in `package.json`.

## Backend / API configuration

By default the frontend expects the backend API and Socket.IO server to be available at `http://localhost:5001` while in development. The code checks `import.meta.env.MODE` and uses:

- `http://localhost:5001` (for auth/store usage)
- `http://localhost:5001/api` (for axios baseURL)

Files to change if you want to point to a different backend URL:

- `src/lib/axios.js` — change the `baseURL` value
- `src/store/useAuthStore.js` — change the `BASE_URL` value

Example: if your backend runs on port 4000, open those files and replace `http://localhost:5001` with `http://localhost:4000`.

Alternatively, you can modify code to read an environment variable (for example `VITE_BACKEND_URL`) and use `import.meta.env.VITE_BACKEND_URL` — Vite exposes env vars prefixed with `VITE_` to the client.

## Environment notes

- This project uses Vite. Client-side environment variables must be prefixed with `VITE_` to be exposed to the browser (e.g. `VITE_BACKEND_URL`).
- If you add `.env` files, follow Vite's conventions: `.env`, `.env.development`, `.env.production`.

## Recommended dev flow

1. Start backend (see backend README in the server repository) on `http://localhost:5001` (or update frontend config to match backend port).
2. In frontend folder run `npm install` then `npm run dev`.
3. Make UI changes; Vite provides fast HMR.

## Troubleshooting

- If the client cannot reach the API, check browser console/network and ensure backend is running at the expected URL and CORS is configured on the server.
- If Socket.IO fails to connect, confirm the backend Socket.IO server is running and uses the same origin/port.
- If you see lint errors, run `npm run lint` and follow ESLint suggestions.

## Contributing

Small fixes, UI improvements and bug reports are welcome. Fork the repo, create a branch, and open a pull request against `main`.
