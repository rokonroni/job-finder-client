import PropTypes from 'prop-types';
import JobTableRow from '../JobTableRow/JobTableRow';
const AllJobsTable = ({allJobs}) => {
  return (
    <div>
      <div className="overflow-x-auto container mx-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="font-bold text-xl ">
              <th>Job Title</th>
              <th>Posted By</th>
              <th>Job Post</th>
              <th>Deadline</th>
              <th>Salary</th>
              <th>View Detils</th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {
                allJobs.map((job) => <JobTableRow key={job._id} job={job} />
            )}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};
AllJobsTable.propTypes = {
  allJobs: PropTypes.array
};

export default AllJobsTable;
