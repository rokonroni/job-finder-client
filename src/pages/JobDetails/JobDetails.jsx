import React, { useContext, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

const JobDetails = () => {
  const { user } = useContext(AuthContext);
  const form = useRef(); // Reference to the form element

  const job = useLoaderData();
  const {
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

    if (user.email === userEmail) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You cannot apply for your own job!",
      });
      return;
    }
    setShowApplicationModal(true);
  };

  const sentEmail = () => {
    emailjs
      .sendForm(
        "service_mb210vg", // Your EmailJS service ID
        "template_j770bp8", // Your EmailJS template ID
        form.current, // Reference to the form element
        "pBykjcJ8wlmCjaBjO" // Your EmailJS public key
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const handleSubmitApplication = () => {
    const applicationData = {
      name: user.displayName,
      userEmail: user.email,
      jobTitle: jobTitle,
      resumeLink: resumeLink,
      job: {job}
    };

    fetch("https://job-finder-server-tau.vercel.app/applyJob", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(applicationData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "You Have Applied this job Successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
          setApplicationSubmitted(true);
          setShowApplicationModal(false);
          sentEmail(); // Send the email
        }
      });
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
          onClick={() => {
            handleApplyClick();
            document.getElementById("modal2123").showModal();
          }}
        >
          Apply
        </button>
      )}

      {showApplicationModal && (
        <dialog id="modal2123" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Fill out your application details:
            </h3>
            <form ref={form} method="dialog"> {/* Form element with a ref */}
              <div className="mb-4">
                <label htmlFor="name">Name: </label>
                <input
                  type="text"
                  id="name"
                  defaultValue={user?.displayName}
                  name="userName" // Name attribute for EmailJS
                  className="w-full p-2 border"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email">Email: </label>
                <input
                  type="text"
                  id="email"
                  defaultValue={user?.email}
                  name="userEmail" // Name attribute for EmailJS
                  className="w-full p-2 border"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="resume">Resume Link: </label>
                <input
                  type="text"
                  id="resume"
                  placeholder="Resume Link"
                  name="resumeLink" // Name attribute for EmailJS
                  value={resumeLink}
                  onChange={(e) => setResumeLink(e.target.value)}
                  className="w-full p-2 border"
                />
              </div>
            </form>
            <div className="modal-action flex items-center">
              <button className="btn">Close</button>
              <button
                className="btn bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={handleSubmitApplication}
              >
                Submit
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default JobDetails;
