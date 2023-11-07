import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AddJob = () => {
  const { user } = useContext(AuthContext);
  const [jobData, setJobData] = useState({
    pictureUrl: "",
    jobTitle: "",
    name: `${user?.displayName}`,
    userEmail: `${user?.email}`,
    jobCategory: "On Site",
    salaryRange: "",
    userImage: `${user?.photoURL}`,
    jobDescription: "",
    jobPostingDate: new Date(),
    applicationDeadline: new Date(),
    jobApplicantsNumber: 0,
  });

  const handleDateChange = (date, field) => {
    setJobData({
      ...jobData,
      [field]: date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://job-finder-server-tau.vercel.app/alljobs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(jobData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Job Added Successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      });

    setJobData({
      pictureUrl: "",
      jobTitle: "",
      name: `${user?.displayName}`,
      userEmail: `${user?.email}`,
      jobCategory: "On Site",
      salaryRange: "",
      userImage: `${user?.photoURL}`,
      jobDescription: "",
      jobPostingDate: new Date(),
      applicationDeadline: new Date(),
      jobApplicantsNumber: 0,
    });
  };

  return (
    <>
      <Helmet>
        <title>Job Finder || Add a Job</title>
      </Helmet>
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Add A Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="pictureUrl">Picture URL of the Job Banner</label>
            <input
              type="text"
              id="pictureUrl"
              value={jobData.pictureUrl}
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
              value={jobData.jobTitle}
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
              value={jobData.name}
              // defaultValue={user?.displayName}
              onChange={(e) => setJobData({ ...jobData, name: e.target.value })}
              className="w-full p-2 border"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="jobCategory">Job Category</label>
            <select
              id="jobCategory"
              value={jobData.jobCategory}
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
              value={jobData.salaryRange}
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
              value={jobData.jobDescription}
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
              className="border-2 px-2 py-2"
              selected={jobData.applicationDeadline}
              onChange={(date) => handleDateChange(date, "applicationDeadline")}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white w-full p-2 rounded"
          >
            Add Job
          </button>
        </form>
      </div>
    </>
  );
};

export default AddJob;
