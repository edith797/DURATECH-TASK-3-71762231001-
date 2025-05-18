import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Courses from "./components/Courses";
import CourseDetails from "./components/CourseDetails";
import Assessment from "./components/Assessment";
import Login from "./components/Login";
import Register from "./components/Register";
import MyCourses from "./components/MyCourses";

export default function App() {
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [assessments, setAssessments] = useState({});

  // Helper to save a score for a course assessment
  const saveAssessmentScore = (courseId, score) => {
    setAssessments((prev) => ({ ...prev, [courseId]: score }));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        enrolledCourses,
        setEnrolledCourses,
        assessments,
        setAssessments,
        saveAssessmentScore,
      }}
    >
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/" element={user ? <Layout /> : <Navigate to="/login" />}>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/:courseId" element={<CourseDetails />} />
            <Route path="my-courses" element={<MyCourses />} />
            {/* Added this route to show assessments landing or course list */}
            <Route path="assessments" element={<Assessment />} />
            <Route path="assessments/:courseId" element={<Assessment />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}
