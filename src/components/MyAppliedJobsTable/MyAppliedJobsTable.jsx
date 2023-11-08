import PropTypes from "prop-types";
import MyAppliedJobsRow from "../MyAppliedJobRow/MyAppliedJobRow";

const MyAppliedJobsTable = ({ allJobs }) => {
  return (
    <div>
      <div className="overflow-x-auto container mx-auto">
        <table className="table">
          <thead>
            <tr className="font-bold text-xl">
              <th>Job Title </th>
              <th>Applied Name & Email</th>
              <th>Job Post</th>
              <th>Deadline</th>
              <th>Salary</th>
              <th>View Details</th>
            </tr>
          </thead>
          <tbody>
            {allJobs.map((appliedJob) => (
              <MyAppliedJobsRow key={appliedJob._id} appliedJob={appliedJob} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

MyAppliedJobsTable.propTypes = {
  allJobs: PropTypes.array,
  selectedCategory: PropTypes.string,
};

export default MyAppliedJobsTable;
