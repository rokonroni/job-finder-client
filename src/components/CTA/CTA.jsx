import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <div className="hero my-0 py-5">
      <div className="hero-content text-center">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold">Find Your Dream Job</h1>
          <p className="py-6">
            Discover exciting job opportunities tailored to your skills and
            aspirations. Let us help you take the next step in your career.
          </p>
          <Link to="/allJobs" className="btn btn-primary">Browse Jobs</Link>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default CTA;
