import { Helmet } from "react-helmet-async";
import Banner from "../../components/Banner/Banner";
import { useState } from "react";
import AllJobs from "../../components/AllJobs/AllJobs";
import { useLoaderData } from "react-router-dom";
import AllTab from "../../components/AllTab/AllTab";

const Home = () => {
  const allJobs = useLoaderData();
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Jobs");

  const handleSearchCategory = (searchText) => {
    setSearchText(searchText);
  };

  const filteredJobs = allJobs.filter((job) => {
    return job.jobCategory.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <>
      <Helmet>
        <title>Job Finder || Home</title>
      </Helmet>
      <div className="space-y-11 mb-10">
        <Banner handleSearchCategory={handleSearchCategory} />
        <AllTab
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <AllJobs jobs={filteredJobs} selectedCategory={selectedCategory} />
      </div>
    </>
  );
};

export default Home;
