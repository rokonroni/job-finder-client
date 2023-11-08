import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLoaderData } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';

const UpdateJob = () => {
  const {user} = useContext(AuthContext)
  const job = useLoaderData();
  const [jobData, setJobData] = useState({
     pictureUrl: `${job.pictureUrl}`,
    jobTitle: `${job.jobTitle}`,
    name: `${user?.displayName}`,
    userEmail: `${user?.email}`,
    jobCategory: `${job.jobCategory}`,
    salaryRange: `${job.salaryRange}`,
    userImage: `${user?.photoURL}`,
    jobDescription: `${job.jobDescription}`,
    jobPostingDate: new Date, 
    applicationDeadline: new Date,
    jobApplicantsNumber: job.jobApplicantsNumber,
  });

  const handleDateChange = (date, field) => {
    setJobData({
      ...jobData,
      [field]: date,
    });
  };
  const handleUpdate = (e) => {
   e.preventDefault();
    fetch(`https://job-finder-server-tau.vercel.app/jobUpdate/${job._id},`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(jobData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          Swal.fire({
            title: 'Success!',
            text: 'Job Updated Successfully',
            icon: "success",
            confirmButtonText: 'Ok'
          });
        }
      });
  };
  return (
     <>
      <Helmet>
        <title>Job Finder || Update Job</title>
      </Helmet>
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Update Job</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label htmlFor="pictureUrl">Picture URL of the Job Banner</label>
            <input
              type="text"
              id="pictureUrl"
              defaultValue={job.pictureUrl}
              onChange={(e) =>
                setJobData({ ...jobData, pictureUrl: e.target.value })
              }
              className="w-full p-2 border"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="jobTitle">Job Title</label>
            <input
              type="text"
              id="jobTitle"
              defaultValue={job.jobTitle}
              onChange={(e) =>
                setJobData({ ...jobData, jobTitle: e.target.value })
              }
              className="w-full p-2 border"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="name">Post By</label>
            <input
              type="text"
              id="name"
              // value={jobData.name}
              defaultValue={job.name}
              onChange={(e) => setJobData({ ...jobData, name: e.target.value })}
              className="w-full p-2 border"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="jobCategory">Job Category</label>
            <select
              id="jobCategory"
              defaultValue={job.jobCategory}
              onChange={(e) =>
                setJobData({ ...jobData, jobCategory: e.target.value })
              }
              className="w-full p-2 border"
              required
            >
              <option value="ON SITE JOB">ON SITE JOB</option>
              <option value="REMOTE JOB">REMOTE JOB</option>
              <option value="HYBRID">HYBRID</option>
              <option value="PART TIME">PART TIME</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="salaryRange">Salary Range</label>
            <input
              type="text"
              id="salaryRange"
              defaultValue={job.salaryRange}
              onChange={(e) =>
                setJobData({ ...jobData, salaryRange: e.target.value })
              }
              className="w-full p-2 border"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="jobDescription">Job Description</label>
            <textarea
              id="jobDescription"
              defaultValue={job.jobDescription}
              onChange={(e) =>
                setJobData({ ...jobData, jobDescription: e.target.value })
              }
              className="w-full p-2 border"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="applicationDeadline">Application Deadline: </label>
            <DatePicker
              id="applicationDeadline"
              dateFormat="dd/MM/yyyy" 
              className="border-2 px-2 py-2"
              selected={jobData.applicationDeadline}
              onChange={(date) => handleDateChange(date, "applicationDeadline")}
            />
          </div>

          <button
            onClick={handleUpdate}
            type="submit"
            className="bg-blue-500 text-white w-full p-2 rounded"
          >
            Update Job
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateJob;