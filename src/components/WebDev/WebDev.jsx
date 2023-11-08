const WebDev = () => {
    const url = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  return (
    <div>
      <div className="hero mt-0 py-10  bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={url}
            className="max-w-lg ml-12  rounded-lg shadow-2xl"
          />
          <div> 
            <h1 className="text-5xl font-bold">Are You a <span className="text-red-500">Web Developer</span></h1>
            <p className="py-6 max-w-lg">
              Hay are you a Web Developer. Do you want related job? Lets start your first job with Job Finder. Scerch, Apply And Get the Job. Simpleeeeeeee.....
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebDev;
