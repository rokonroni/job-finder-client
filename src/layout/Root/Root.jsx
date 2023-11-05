import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";

const Root = () => {
  return (
    <>
      <Helmet>
        <title>Job Finder || Home</title>
      </Helmet>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <Navbar />
          <Outlet />
        </div>
        <Sidebar />
      </div>
      <Footer />
    </>
  );
};

export default Root;
