import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // const addJob = async (newJob) => {
  //   if (!user) {
  //     toast.error("addJob sign into account");
  //     return;
  //   }
  //   const res = await fetch("/api/jobs", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newJob),
  //   });
  //   if (!res.ok) {
  //     throw new Error("Failed to add job");
  //   }
  //   const data = await res.json();
  //   return data;
  // };

  // const deleteJob = async (id) => {
  //   if (!user) {
  //     toast.error("deleteJob sign into account");
  //     return;
  //   }
  //   const res = await fetch(`/api/jobs/${id}`, {
  //     method: "DELETE",
  //   });
  //   if (!res.ok) {
  //     throw new Error("Failed to delete job");
  //   }
  // };

  // const updateJobs = async (job) => {
  //   if (!user) {
  //     toast.error("updateJobs sign into account");
  //     return;
  //   }
  //   const res = await fetch(`/api/jobs/${job.id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(job),
  //   });
  //   if (!res.ok) {
  //     throw new Error("Failed to update job");
  //   }
  //   const data = await res.json();
  //   return data;
  // };


  const addJob = (newJob) => {
    if (!user) {
      toast.error("You must be logged in to add a job.");
      return;
    }

    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    newJob.id = Date.now(); // простий унікальний id
    const updatedJobs = [...jobs, newJob];
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    toast.success("Job added successfully!");
  };

  const deleteJob = (id) => {
    if (!user) {
      toast.error("You must be logged in to delete a job.");
      return;
    }

    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const updatedJobs = jobs.filter((job) => job.id !== id);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    toast.success("Job deleted successfully!");
  };

  const updateJobs = (updatedJob) => {
    if (!user) {
      toast.error("You must be logged in to update a job.");
      return;
    }

    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const updatedJobs = jobs.map((job) =>
      job.id === updatedJob.id ? updatedJob : job
    );
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    toast.success("Job updated successfully!");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, addJob, deleteJob, updateJobs }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;

