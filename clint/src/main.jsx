import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App.jsx';
import Landing from './pages/Landing.jsx';
import NotesWindow from './pages/NotesWindow.jsx';
import Quiz from './pages/Quiz.jsx'
import Admin from './pages/Admin.jsx';
import Login from './components/auth/login.jsx';
import Register from './components/auth/Register.jsx';
import Logout from './components/auth/logout.jsx';
import { Grid } from 'react-loader-spinner';
import LoaderComp from './components/loader.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './css/App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, // 1 hour
      cacheTime: 1000 * 60 * 60, // 1 hour
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  // Define your route
  {
    path: "/:subject/:unit",
    element: <App />,
  },
  {
    path: "/Notes",
    element: <NotesWindow />,
  },
  {
    path: "/quizapi/:collection/:title",
    element: <Quiz />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/logout",
    element: <Logout />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
