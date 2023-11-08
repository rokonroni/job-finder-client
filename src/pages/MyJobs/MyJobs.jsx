import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../providers/AuthProvider";
import MyJob from "../../components/MyJob/MyJob";
import { Link } from "react-router-dom";

const MyJobs = () => {
  const { user } = useContext(AuthContext);
  const [myJobs, setMyJobs] = useState([]);
  const url = `https://job-finder-server-tau.vercel.app/myJobs?email=${user.email}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setMyJobs(data));
  }, [url]);
  if (myJobs.length > 0) {
    return (
      <>
        <Helmet>
          <title>Job Finder || My Jobs</title>
        </Helmet>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 my-5 container mx-auto">
          {myJobs.map((job) => (
            <MyJob
              key={job._id}
              job={job}
              myJobs={myJobs}
              setMyJobs={setMyJobs}
            />
          ))}
        </div>
      </>
    );
  } else {
    return (
      <>
        <Helmet>
          <title>Job Finder || My Jobs</title>
        </Helmet>
        <div
          className="bg-red-100 border flex items-center justify-center border-red-400 text-red-700 px-4 py-2 rounded relative  min-h-[60vh]"
          role="alert"
        >
          <div className="flex flex-col justify-center items-center">
            <strong className="font-bold">
              Error: <span className="block sm:inline"> No Jobs Added Yet</span>
            </strong>
            <Link to="/addJob">
              <button className="btn btn-info mt-5 text-white font-bold">
                Add a job
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }
};

export default MyJobs;
