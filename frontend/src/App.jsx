import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ErrorPage from "./pages/ErrorPage";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/sign-up", element: <SignUp /> },
        { path: "/sign-in", element: <SignIn /> },
        { path: "/projects", element: <Projects /> },
        {
          element: <PrivateRoute />,
          children: [{ path: "/dashboard", element: <Dashboard /> }],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
