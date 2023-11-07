import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const JobDetails = () => {
  const { user } = useContext(AuthContext);
  const job = useLoaderData();
  const {
    _id,
    pictureUrl,
    jobTitle,
    name,
    userImage,
    userEmail,
    jobCategory,
    jobDescription,
    jobPostingDate,
    applicationDeadline,
    salaryRange,
    jobApplicantsNumber,
  } = job;

  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [resumeLink, setResumeLink] = useState("");
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const handleApplyClick = () => {
    const currentDateTime = new Date();
    const deadlineDateTime = new Date(applicationDeadline);

    if (currentDateTime > deadlineDateTime) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Application Deadline is over. You can not apply right now!",
      });
      return;
    }

    if (user.email === job.userEmail) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You Can not apply your job!",
      });
      return;
    }

    // Show the application modal
    setShowApplicationModal(true);
  };

  const handleSubmitApplication = () => {
    // Send the application data (name, email, resumeLink, job ID) to the server
    // and save it in a MongoDB collection.

    // After successful submission, set applicationSubmitted to true.
    setApplicationSubmitted(true);

    // Close the application modal
    setShowApplicationModal(false);
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-lg">
      <img
        src={pictureUrl}
        alt="Job Banner"
        className="mb-4 rounded-lg w-full h-64 object-cover"
      />
      <h1 className="text-2xl font-semibold mb-4">{jobTitle}</h1>
      <p className="text-gray-700">{jobDescription}</p>
      <p className="text-gray-700 mt-2">Salary Range: {salaryRange}</p>
      <p className="text-gray-700 mt-2">
        Number of Applicants: {jobApplicantsNumber}
      </p>

      {applicationSubmitted ? (
        <p className="text-green-500 mt-4">
          Your application has been submitted.
        </p>
      ) : (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        //   onClick={handleApplyClick}
          onClick={()=>document.getElementById('modal').showModal()}
        >
          Apply
        </button>
      )}

      {showApplicationModal && (
          <dialog
            id="modal"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Fill out your application details:</h3>
               <div className="mb-4">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              defaultValue={user?.displayName}
              className="w-full p-2 border"
            />
          </div>
              <input
              className="border border-gray-300 rounded-md p-2 w-full"
              type="text"
              placeholder="Resume Link"
              value={resumeLink}
              onChange={(e) => setResumeLink(e.target.value)}
            />
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                  <button
                    className="btn bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
                    onClick={handleSubmitApplication}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </dialog>
      )}
    </div>
  );
};

export default JobDetails;
