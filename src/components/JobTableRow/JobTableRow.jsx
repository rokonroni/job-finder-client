import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const JobTableRow = ({ job }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    _id,
    name,
    jobTitle,
    jobCategory,
    jobPostingDate,
    applicationDeadline,
    salaryRange,
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
  const handleDetailsClick = () => {
    if (user) {
      window.location.href = `/job/${_id}`;
    } else {
      navigate("/login", { state:`/job/${_id}`});
    }
  };

  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div>
            <div className="font-bold">{jobTitle}</div>
            <div className="text-sm opacity-50">{jobCategory}</div>
          </div>
        </div>
      </td>
      <td>{name}</td>
      <td>{formattedJobPostingDate}</td>
      <td>{formattedApplicationDeadline}</td>
      <td>{salaryRange}</td>
      <td>
        <button
          className="btn btn-info hover:bg-blue-500 text-white"
          onClick={handleDetailsClick}
        >
          Details
        </button>
      </td>
    </tr>
  );
};

JobTableRow.propTypes = {
  job: PropTypes.object,
};

export default JobTableRow;
