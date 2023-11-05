import { useLoaderData } from "react-router-dom";

const JobDetails = () => {
    const job = useLoaderData();
    const {_id} = job; 
    return (
        <div>
            Job Details {_id}
        </div>
    );
};

export default JobDetails;