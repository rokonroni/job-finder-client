import { useState } from "react";
import AllJobsTable from "../../components/AllJobsTable/AllJobsTable";
import { useLoaderData } from "react-router-dom";

const AllJobs = () => {
  const allJobs = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = allJobs.filter((job) =>
    job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-center text-4xl my-4 uppercase font-bold text-blue-500 underline ">All Jobs</h2>
      <div className="text-center">
        <div className=" join w-full px-5 lg:px-0 lg:w-1/2 flex-row items-center  pb-10">
        <input
          className="input w-full input-bordered join-item focus:outline-none"
          placeholder="Search here...."
           value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="btn font-semibold text-white join-item rounded-md bg-[#FF444A]"
        >
          Search
        </button>
      </div>
      </div>
      <AllJobsTable allJobs={filteredJobs} />
    </div>
  );
};

export default AllJobs;
