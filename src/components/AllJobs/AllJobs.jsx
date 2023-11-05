import PropTypes from 'prop-types';
import Job from '../Job/Job';

const AllJobs = ({ jobs, selectedCategory }) => {
  const filteredJobs = jobs ? jobs.filter((job) => {
    return selectedCategory === "All Jobs" || job.jobCategory === selectedCategory;
  }) : [];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 my-5 container mx-auto">
      {
        filteredJobs.map((job) => <Job key={job._id} job={job} />)
      }
    </div>
  );
};

AllJobs.propTypes = {
  jobs: PropTypes.array,
  selectedCategory: PropTypes.string
};

export default AllJobs;
