import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Root from "../layout/Root/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register"
import AllJobs from "../pages/AllJobs/AllJobs";
import AppliedJobs from "../pages/AppliedJobs/AppliedJobs";
import AddJob from "../pages/AddJob/AddJob";
import MyJobs from "../pages/MyJobs/MyJobs";
import Blogs from "../pages/Blogs/Blogs";
import PrivateRoute from "./PrivateRoute";
import JobDetails from "../pages/JobDetails/JobDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch("https://job-finder-server-tau.vercel.app/allJobs"),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "allJobs",
        element: <AllJobs />,
        loader: () => fetch("https://job-finder-server-tau.vercel.app/allJobs"),
      },
      {
        path: "addJob",
        element: <PrivateRoute><AddJob/></PrivateRoute>
      },
      {
        path: "appliedJobs",
        element: <PrivateRoute><AppliedJobs/></PrivateRoute>,
      },
      {
        path: "myJobs",
        element: <PrivateRoute><MyJobs /></PrivateRoute>,
      },
      {
        path: "job/:id",
        element: <PrivateRoute><JobDetails /></PrivateRoute>,
        loader: ({ params }) =>fetch(`https://job-finder-server-tau.vercel.app/jobDetails/${[params.id]}`),
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
    ],
  },
]);
export default router;