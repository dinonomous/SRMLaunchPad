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

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './css/App.css';

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

// Define a placeholder component for dynamic rendering of App
function DynamicApp() {
  const { match } = useRouter(); // Get the matched route params
  const { dynamicRoute } = match.params; // Extract the dynamic part from the route params

  // Pass the dynamicRoute as a prop to the App component
  return <App dynamicRoute={dynamicRoute} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
