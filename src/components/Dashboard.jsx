import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

// Courses data for info lookup
const coursesData = [
  { id: 'c1', title: 'Web Development' },
  { id: 'c2', title: 'React Basics' },
  { id: 'c3', title: 'Node.js Essentials' },
  { id: 'c4', title: 'Python Programming' },
  { id: 'c5', title: 'Data Structures' },
  { id: 'c6', title: 'Machine Learning' },
  { id: 'c7', title: 'Database Systems' },
  { id: 'c8', title: 'Cloud Computing' },
  { id: 'c9', title: 'Cyber Security' },
  { id: 'c10', title: 'Mobile App Development' },
];

export default function Dashboard() {
  const { user, enrolledCourses, assessments } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Edu-Learn | Dashboard';
  }, []);

  if (!user) {
    return <p>Loading user information...</p>;
  }

  // Map enrolled course IDs to course objects
  const enrolledCourseObjects = enrolledCourses
    .map(courseId => coursesData.find(course => course.id === courseId))
    .filter(Boolean);

  // Pending assessments are those without a saved score
  const pendingAssessments = enrolledCourseObjects.filter(
    course => !(assessments && assessments[course.id] !== undefined)
  );

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">
        Welcome back, {user?.displayName || user?.email}!
      </h1>

      <div className="dashboard-summary">
        <div className="summary-card">
          <h2>{enrolledCourseObjects.length}</h2>
          <p>Enrolled Courses</p>
        </div>
        <div className="summary-card">
          <h2>{pendingAssessments.length}</h2>
          <p>Assessments Pending</p>
        </div>
      </div>

      <section className="dashboard-info">
        <h3>Your Courses & Assessments</h3>
        {enrolledCourseObjects.length === 0 ? (
          <p className="no-courses">You have not enrolled in any courses yet.</p>
        ) : (
          <ul className="course-list">
            {enrolledCourseObjects.map(course => (
              <li key={course.id} className="course-item">
                {course.title}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
