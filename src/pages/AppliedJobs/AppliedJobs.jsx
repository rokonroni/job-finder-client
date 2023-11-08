import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import MyAppliedJobsTable from "../../components/MyAppliedJobsTable/MyAppliedJobsTable";
import { Link } from "react-router-dom";

const AppliedJobs = () => {
  const { user } = useContext(AuthContext);
  const [myAppliedJobs, setMyAppliedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const url = `https://job-finder-server-tau.vercel.app/myAppliedJobs?email=${user.email}`;

  useEffect(() => {
    fetch(url,{credentials: "include"})
      .then((res) => res.json())
      .then((data) => setMyAppliedJobs(data));
  }, [url]);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredJobs = myAppliedJobs.filter((appliedJob) => {
    const job = appliedJob.job;
    const jobCategory = job?.jobCategory?.toLowerCase() || "";
    const jobTitle = job?.jobTitle?.toLowerCase() || "";
    const sanitizedSearchTerm = searchTerm.toLowerCase().trim();

    if (
      (!selectedCategory || jobCategory.includes(selectedCategory.toLowerCase())) &&
      (sanitizedSearchTerm === "all job" || jobTitle.includes(sanitizedSearchTerm))
    ) {
      return true;
    }
    return false;
  });

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  if (myAppliedJobs.length > 0) {
    return (
      <>
        <Helmet>
          <title>Job Finder || Applied Jobs</title>
        </Helmet>
        <div>
          <h2 className="text-center text-4xl my-4 uppercase font-bold text-blue-500 underline">
            Applied Jobs
          </h2>
          <div className="text-center">
            <div className="join w-full px-5 lg:px-0 lg:w-1/2 flex-row items-center pb-10">
              <input
                className="input w-full input-bordered join-item focus:outline-none"
                placeholder="Search here...."
                value={searchTerm}
                onChange={handleSearchTermChange}
              />
              <select
                className="select select-bordered"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">All Job</option>
                <option value="ON SITE">ON SITE</option>
                <option value="REMOTE">REMOTE</option>
                <option value="HYBRID">HYBRID</option>
                <option value="PART TIME">PART TIME</option>
              </select>
            </div>
          </div>
          <MyAppliedJobsTable allJobs={filteredJobs} selectedCategory={selectedCategory} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <Helmet>
          <title>Job Finder || My Jobs</title>
        </Helmet>
        <div className="bg-red-100 border flex items-center justify-center border-red-400 text-red-700 px-4 py-2 rounded relative  min-h-[60vh]" role="alert">
          <div className="flex flex-col justify-center items-center">
            <strong className="font-bold">
              Error: <span className="block sm:inline"> No jobs applied yet</span>
            </strong>
            <Link to="/allJobs">
              <button className="btn btn-info mt-5 text-white font-bold">
                See All Job
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }
};

export default AppliedJobs;
