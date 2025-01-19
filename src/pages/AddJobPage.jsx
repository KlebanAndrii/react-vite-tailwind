import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

function AddJobPage() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Full-Time");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("Under $50K");
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const { addJob } = useAuth();

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    const newJob = {
      title,
      type,
      location,
      description,
      salary,
      company: {
        name: companyName,
        description: companyDescription,
        contactEmail,
        contactPhone,
      },
    };
    addJob(newJob);
    toast.success("Job Added Successfully");
    return navigate("/jobs");
  };

  return (
    <section className="bg-slate-300">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">Add Job</h2>
            <div className="mb-4">
              <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
                Job Type
              </label>
              <select name="type" id="type" value={type} onChange={(e) => setType(e.target.value)} className="border rounded w-full py-2 px-3" required>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Job Listing Name</label>
              <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="border rounded w-full py-2 px-3 mb-2" placeholder="eg. Beautiful Apartment In Miami" required />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                Description
              </label>
              <textarea name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="border rounded w-full py-2 px-3" rows="4" placeholder="Add any job duties, expectations, requirements, etc"></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
                Salary
              </label>
              <select name="salary" id="salary" value={salary} onChange={(e) => setSalary(e.target.value)} className="border rounded w-full py-2 px-3" required>
                <option value="Under $50K">under $50K</option>
                <option value="$50 - 60K">$50 - 60K</option>
                <option value="$60 - 70K">$60 - 70K</option>
                <option value="$70 - 80K">$70 - 80K</option>
                <option value="$80 - 90K">$80 - 90K</option>
                <option value="$90 - 100K">$90 - 100K</option>
                <option value="$100 - 125K">$100 - 125K</option>
                <option value="$125 - 150K">$125 - 150K</option>
                <option value="$150 - 175K">$150 - 175K</option>
                <option value="$175 - 200K">$175 - 200K</option>
                <option value="Over $200K">Over $200K</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Location</label>
              <input type="text" id="location" name="location" value={location} onChange={(e) => setLocation(e.target.value)} className="border rounded w-full py-2 px-3 mb-2" placeholder="Company Location" required />
            </div>

            <h3 className="text-2xl mb-5 text-center">Company Info</h3>

            <div className="mb-4">
              <label htmlFor="company" className="block text-gray-700 font-bold mb-2">
                Company Name
              </label>
              <input type="text" id="company" name="company" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Company Name" />
            </div>

            <div className="mb-4">
              <label htmlFor="company_description" className="block text-gray-700 font-bold mb-2">
                Company Description
              </label>
              <textarea name="company_description" id="company_description" value={companyDescription} onChange={(e) => setCompanyDescription(e.target.value)} className="border rounded w-full py-2 px-3" rows="4" placeholder="What does your company do?"></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="contact_email" className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-gray-700 font-bold mb-2">
                Contact Email
              </label>
              <input type="email" id="contact_email" name="contact_email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Email address for applicants" required />
            </div>

            <div className="mb-4">
              <label htmlFor="contact_phone" className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-gray-700 font-bold mb-2">
                Contact Phone
              </label>
              <input type="tel" id="contact_phone" name="contact_phone" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="border rounded w-full py-2 px-3" placeholder="Optional phone for applicants" />
            </div>

            <div>
              <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline">
                Add Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}


export default AddJobPage;
