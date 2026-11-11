# Coffice User Frontend

The customer-facing Coffice application is built with React and Vite.

## Development

```powershell
npm install
npm run dev
```

Open `http://localhost:5173`.

The Vite entry point is `src/main.jsx`. Application routes are defined in
`src/App.jsx`; reusable UI is in `src/components`, API clients are in `src/api`,
and shared state providers are in `src/context`.

## Production build

```powershell
npm run build
```