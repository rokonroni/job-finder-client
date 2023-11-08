import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const Job = ({ job }) => {
  const { user } = useContext(AuthContext);
  const {
    _id,
    name,
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
  const handleViewDetails = () => {
    if (user) {
      window.location.href = `/job/${_id}`;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have to log in first to view details!",
        footer: '<a href="/login" >Login Now</a>',
      });
    }
  };

  return (
    <>
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
            <p>
              <span className="font-bold">Job post by : </span> {name}
            </p>
          </div>
          <div>
            <div className="mt-5">
              <button
                onClick={handleViewDetails}
                className="mr-2 my-1 uppercase tracking-wider px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Job.propTypes = {
  job: PropTypes.object.isRequired,
};

export default Job;
