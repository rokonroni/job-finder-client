import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import MyJobRow from "../../components/MyJobRow/MyJobRow";

const MyJobs = () => {
  const { user } = useContext(AuthContext);
  const [myJobs, setMyJobs] = useState([]);
  const url = `https://job-finder-server-tau.vercel.app/myJobs?email=${user.email}`;
  useEffect(() => {
    axios.get(url, {withCredentials:true})
    .then ((res)=>{
        setMyJobs(res.data)
    })
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((data) => setMyJobs(data));
  }, [url]);
  if (myJobs.length > 0) {
    return (
      <>
        <Helmet>
          <title>Job Finder || My Jobs</title>
        </Helmet>
        <div >
          <div className="overflow-x-auto container mx-auto">
        <table className="table">
          <thead>
            <tr className="font-bold text-xl">
              <th>Job Title </th>
              <th>Job Post</th>
              <th>Deadline</th>
              <th>Salary</th>
              <th>Total Application</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {myJobs.map((job) => (
            <MyJobRow
              key={job._id}
              job={job}
              myJobs={myJobs}
              setMyJobs={setMyJobs}
            />
          ))}
          </tbody>
        </table>
      </div>
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
