import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AllJobs from "../AllJobs/AllJobs";

const AllTab = ({jobs, selectedCategory, setSelectedCategory }) => {
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto">
      <Tabs selectedTabClassName="bg-blue-300 rounded-sm font-bold ">
        <TabList className="text-center">
          <Tab onClick={() => handleCategoryChange("All Jobs")}>All Jobs</Tab>
          <Tab onClick={() => handleCategoryChange("On Site")}>On Site Jobs</Tab>
          <Tab onClick={() => handleCategoryChange("REMOTE")}>Remote Jobs</Tab>
          <Tab onClick={() => handleCategoryChange("PART TIME")}>Part Time Jobs</Tab>
          <Tab onClick={() => handleCategoryChange("HYBRID")}>Hybrid Jobs</Tab>
        </TabList>

        <TabPanel className="active:bg-red-500">
          <AllJobs jobs={jobs} selectedCategory={selectedCategory} />
        </TabPanel>
      </Tabs>
    </div>
  );
};
AllTab.propTypes = {
  jobs: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
};

export default AllTab;
