import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../providers/AuthProvider";
import MyJob from "../../components/MyJob/MyJob";

const MyJobs = () => {
  const { user } = useContext(AuthContext);
  const [myJobs, setMyJobs] = useState([]);
  const url = `https://job-finder-server-tau.vercel.app/myJobs?email=${user.email}`;
  useEffect(() => {
    fetch(url)
    .then((res) => res.json())
    .then(data => setMyJobs(data))
  }, [url]);
  return (
    <>
      <Helmet>
        <title>Job Finder || My Jobs</title>
      </Helmet>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 my-5 container mx-auto">
        {
             myJobs.map((job) => <MyJob key={job._id} job={job} />
        )}
      </div>
    </>
  );
};

export default MyJobs;
