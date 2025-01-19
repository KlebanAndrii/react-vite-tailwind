import { useState } from "react";
import { FaMapMarker } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function JobListing({ job }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  let description = job.description;

  if (!showFullDescription) {
    description = description.substring(0, 90) + "...";
  }

  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-600 my-2">{job.type}</div>
          <h3 className="text-xl">{job.title}</h3>
        </div>
        <div className="mb-5">{description}</div>
        <button onClick={() => setShowFullDescription((prevState) => !prevState)} className="text-cyan-600 mb-5 hover:text-cyan-700">
          {showFullDescription ? "Less" : "More"}
        </button>
        <h3 className="text-cyan-600">{job.salary} / Year</h3>
        <div className="border border-gray-100 mb-5"></div>
        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-orange-700 mb-3">
            <FaMapMarker className="inline text-lg mb-1 mr-1" />
            {job.location}
          </div>
          <Link to={`/jobs/${job.id}`} className="h-[36px] bg-cyan-600 hover:bg-cyan-700 text-white px-2 py-2 rounded-lg text-center text-sm">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}

JobListing.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string,
    location: PropTypes.string,
    salary: PropTypes.string,
    description: PropTypes.string,
    company: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      contactEmail: PropTypes.string.isRequired,
      contactPhone: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default JobListing;
