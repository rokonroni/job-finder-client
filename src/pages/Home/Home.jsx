import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Banner from "../../components/Banner/Banner";
import AllTab from "../../components/AllTab/AllTab";
import AllJobs from "../../components/AllJobs/AllJobs";
// import { useLoaderData } from "react-router-dom";
import CTA from "../../components/CTA/CTA";
import WebDev from "../../components/WebDev/WebDev";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  // const allJobs = useLoaderData();

  const {isPending, data: allJobs} = useQuery({
    queryKey:["allJobs"],
    queryFn: async () =>{
      const res = await fetch("https://job-finder-server-tau.vercel.app/allJobs")
      return res.json();
    }
  })


  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Jobs");
  const handleSearchCategory = (searchText) => {
    setSearchText(searchText);
  };

 const filteredJobs = allJobs?.filter((job) => {
  return job.jobCategory.toLowerCase().includes(searchText.toLowerCase()) || job.jobCategory.toLowerCase().includes(selectedCategory.toLowerCase())
});
if (isPending) {
  return (
            <>
            <div className=" text-center h-[60vh] ">
                <div className="mt-48 loading loading-infinity loading-lg"></div>
            </div>
            </>
        )
}

  return (
    <>
      <Helmet>
        <title>Job Finder || Home</title>
      </Helmet>
      <div className="space-y-11 mb-10">
        <Banner handleSearchCategory={handleSearchCategory} />
        <h2 className="text-center text-4xl font-semibold uppercase underline text-blue-500">Filter Job by Category</h2>
        <AllTab
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <AllJobs jobs={filteredJobs} selectedCategory={selectedCategory} />
        <CTA/>
        <WebDev/>
      </div>
    </>
  );
};

export default Home;
