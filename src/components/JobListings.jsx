import { useEffect, useState } from "react";
import JobListing from "./JobListing";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import { FaSearch } from "react-icons/fa";

function JobListings({ isHome = false }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // const fetchJobs = async () => {
    //   const apiUrl = isHome ? "/api/jobs?_limit=3" : "/api/jobs";
    //   try {
    //     const res = await fetch(apiUrl);
    //     const data = await res.json();
    //     setJobs(data);
    //   } catch (error) {
    //     console.log("Error fetching data", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    const fetchJobs = async () => {
      try {
        const { jobs = [] } = await (await fetch("/jobs.json")).json();
        setJobs(isHome ? jobs.slice(0, 3) : jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [isHome]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredJobs = jobs.filter((job) => job.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <section className="bg-slate-300 px-4 py-10 rounded">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-cyan-600 mb-6 text-center">{isHome ? "Recent Jobs" : "Browse Jobs"}</h2>
        {!isHome && (
          <label className="relative block mb-4">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <FaSearch className="h-5 w-5 fill-cyan-600" />
            </span>
            <input
              className="max-w-96 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search for anything..."
              type="text"
              name="search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </label>
        )}

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

JobListings.propTypes = {
  isHome: PropTypes.bool,
};

export default JobListings;
