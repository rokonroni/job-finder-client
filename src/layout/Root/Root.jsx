import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";


const Root = () => {
    return (
        <div>
            <Helmet>
                <title>Job Finder || Home</title>
            </Helmet>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;