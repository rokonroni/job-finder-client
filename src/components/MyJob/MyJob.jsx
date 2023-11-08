import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
const MyJob = ({job, myJobs, setMyJobs}) => {
    const {
    _id,
    jobTitle,
    jobCategory,
    jobPostingDate,
    applicationDeadline,
    salaryRange,
    jobApplicantsNumber,
  } = job;
  const formattedJobPostingDate = new Date(jobPostingDate).toLocaleDateString("en-GB", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
  const formattedApplicationDeadline = new Date(applicationDeadline).toLocaleDateString("en-GB", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://job-finder-server-tau.vercel.app/myJobs/job/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              const remaining = myJobs.filter(prod=>prod._id !==_id);
              setMyJobs(remaining);
            }
          });
      }
    });
  };
    return (
        <div className="rounded-md w-full bg-white px-4 py-4 shadow-md transition transform duration-500 cursor-pointer">
        <div className="flex flex-col justify-start">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold text-bookmark-blue flex space-x-1 items-center mb-2">
              <svg
                className="w-7 h-7 text-gray-700"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
              <span>{jobTitle}</span>
            </div>
            <span className="bg-green-500 rounded-xl uppercase text-white text-xs px-4 py-1 font-bold shadow-xl">
              {jobCategory}
            </span>
          </div>
          <div className="text-gray-500 space-y-1 items-center">
            <p>
              <span className="font-bold">Salary: </span>
              {salaryRange}
            </p>
            <p>
              <span className="font-bold">Job Post: </span> {formattedJobPostingDate}
            </p>
            <p>
              <span className="font-bold">Deadline: </span>{" "}
              {formattedApplicationDeadline}
            </p>
            <p>
              <span className="font-bold">Total Applicant : </span>{" "}
              {jobApplicantsNumber}
            </p>
          </div>
          <div>
            <div className="mt-5 text-center flex flex-col md:flex-row  lg:flex-row ">
             <Link 
             to={`/job/update/${_id}`}
             className='my-1 mr-2 w-1/2 px-2 py-1 uppercase tracking-wider  text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded transition transform duration-500 cursor-pointer'>
               <button
              >
                Update
              </button>
             </Link>
              <button
              onClick={()=>handleDelete(_id)}
                className="mr-2 my-1 uppercase tracking-wider px-2 text-red-600 border-red-600 hover:bg-red-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 w-1/2 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};
MyJob.propTypes = {
  job: PropTypes.object,
  myJobs: PropTypes.array,
  setMyJobs: PropTypes.func
};
export default MyJob;