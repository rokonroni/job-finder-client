import PropTypes from "prop-types";

const MyAppliedJobRow = ({ appliedJob }) => {
  const job = appliedJob?.job;
  const {
    jobTitle,
    jobCategory,
    jobPostingDate,
    applicationDeadline,
    salaryRange,
  } = job || {};

  // Check if job is defined before accessing its properties
  const formattedJobPostingDate = jobPostingDate
    ? new Date(jobPostingDate).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : "";
  const formattedApplicationDeadline = applicationDeadline
    ? new Date(applicationDeadline).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : "";

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
      <td>{appliedJob.name || "N/A"}<br/>{appliedJob.userEmail || "N/A"}</td>
      <td>{formattedJobPostingDate || "N/A"}</td>
      <td>{formattedApplicationDeadline || "N/A"}</td>
      <td>{salaryRange || "N/A"}</td>
      <td>
        <button className="btn mr-3 btn-info hover:bg-blue-500 text-white">Details</button>
        <a href={appliedJob.resumeLink} className="btn btn-info hover:bg-blue-500 text-white">See Resume</a>
      </td>
    </tr>
  );
};

MyAppliedJobRow.propTypes = {
  appliedJob: PropTypes.object,
};

export default MyAppliedJobRow;
