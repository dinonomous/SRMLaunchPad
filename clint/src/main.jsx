import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App.jsx';
import Landing from './pages/Landing.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './css/index.css';

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
