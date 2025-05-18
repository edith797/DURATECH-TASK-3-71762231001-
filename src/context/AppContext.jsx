import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    try {
      const saved = localStorage.getItem('enrolledCourses');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [assessments, setAssessments] = useState(() => {
    try {
      const saved = localStorage.getItem('assessments');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  useEffect(() => {
    localStorage.setItem('assessments', JSON.stringify(assessments));
  }, [assessments]);

  const enrollCourse = (courseId) => {
    setEnrolledCourses(prev => {
      if (!prev.includes(courseId)) {
        return [...prev, courseId];
      }
      return prev;
    });
  };

  const saveAssessmentScore = (courseId, score) => {
    setAssessments(prev => ({ ...prev, [courseId]: score }));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        enrolledCourses,
        enrollCourse,
        assessments,
        saveAssessmentScore,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
