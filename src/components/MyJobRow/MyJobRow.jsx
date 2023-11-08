import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
const MyJobRow = ({job, myJobs, setMyJobs}) => {
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
        <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div>
            <div className="font-bold">{jobTitle || "N/A"}</div>
            <div className="text-sm opacity-50">{jobCategory || "N/A"}</div>
          </div>
        </div>
      </td>
      <td>{formattedJobPostingDate || "N/A"}</td>
      <td>{formattedApplicationDeadline || "N/A"}</td>
      <td>{salaryRange || "N/A"}</td>
      <td className='text-center'>{jobApplicantsNumber}</td>
      <td>
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
      </td>
    </tr>
    );
};
MyJobRow.propTypes = {
  job: PropTypes.object,
  myJobs: PropTypes.array,
  setMyJobs: PropTypes.func
};
export default MyJobRow;