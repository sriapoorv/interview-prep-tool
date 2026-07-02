import React, { useState } from 'react';
import axios from 'axios';
import InterviewForm from '../components/InterviewForm';
import { useNavigate } from 'react-router';


const Home = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeFileName, setResumeFileName] = useState("");
  const navigate = useNavigate();

  const handleResumeSelect = (e) => {
    if (e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);  
      setResumeFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async () => {
    if (!resumeFile) {
      alert("Please upload your resume.");
      return;
    }
  
    try {
      const formData = new FormData();
  
      formData.append("jobDescription", jobDescription);
      formData.append("selfDescription", selfDescription);
      formData.append("resume", resumeFile);
  
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/interview`,
        formData,
        {
          withCredentials: true,
        }
      );
  
      navigate("/report", {
        state: {
            report: response.data.interviewReport
        }
    });
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <InterviewForm
      jobDescription={jobDescription}
      selfDescription={selfDescription}
      resumeFileName={resumeFileName}
      onJobDescriptionChange={(e) => setJobDescription(e.target.value)}
      onSelfDescriptionChange={(e) => setSelfDescription(e.target.value)}
      onResumeSelect={handleResumeSelect}
      onSubmit={handleSubmit}
    />
  );
};

export default Home;