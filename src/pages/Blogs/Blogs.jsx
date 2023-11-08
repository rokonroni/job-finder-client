const Blogs = () => {
  return (
    <div className="bg-gray-100 p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center my-4">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded shadow-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Q1: What are Access Tokens and Refresh Tokens?</h2>
            <p className="text-gray-600 mb-4">
              Access tokens and refresh tokens are essential in modern authentication and authorization systems. They provide a way to secure resources and manage user sessions.
            </p>
            <p className="text-sm text-gray-500">Posted by: Md. Rokon Uz Zaman Roni</p>
          </div>

          <div className="bg-white rounded shadow-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Q2: What is Express.js?</h2>
            <p className="text-gray-600 mb-4">
              Express.js is a popular Node.js web application framework known for its flexibility and minimalism. It simplifies the development of server-side applications and APIs.
            </p>
            <p className="text-sm text-gray-500">Posted by: Md. Rokon Uz Zaman Roni</p>
          </div>

          <div className="bg-white rounded shadow-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Q3: Creating a Job Finder Web Application</h2>
            <p className="text-gray-600 mb-4">
              Learn how to develop a Job Finder web application, including user authentication, posting jobs, and applying for jobs.
            </p>
            <p className="text-sm text-gray-500">Posted by: Md. Rokon Uz Zaman Roni</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
