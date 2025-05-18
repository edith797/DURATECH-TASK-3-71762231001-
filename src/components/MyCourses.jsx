import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import '../styles/MyCourses.css';
import anime from 'animejs/lib/anime.es.js';

const coursesData = [
  {
    id: 'c1',
    title: 'Web Development',
    shortDesc: 'Learn HTML, CSS, JavaScript and build websites.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg',
    description: 'Master the basics of web development including HTML5, CSS3, and JavaScript. Build responsive and dynamic websites from scratch.',
  },
  {
    id: 'c2',
    title: 'React Basics',
    shortDesc: 'Introduction to React components, hooks and state.',
    img: 'https://reactjs.org/logo-og.png',
    description: 'Understand React fundamentals, hooks, state management, and build scalable SPAs with ease.',
  },
  {
    id: 'c3',
    title: 'Node.js Essentials',
    shortDesc: 'Backend development with Node and Express.',
    img: 'https://nodejs.org/static/images/logo.svg',
    description: 'Learn how to build fast and scalable backend applications using Node.js and Express framework.',
  },
  {
    id: 'c4',
    title: 'Python Programming',
    shortDesc: 'Learn Python for automation and scripting.',
    img: 'https://www.python.org/static/community_logos/python-logo.png',
    description: 'Get started with Python programming language and automate everyday tasks efficiently.',
  },
  {
    id: 'c5',
    title: 'Data Structures',
    shortDesc: 'Understanding arrays, trees, and graphs.',
    img: 'https://cdn.iconscout.com/icon/free/png-256/data-structure-1892962-1609859.png',
    description: 'Learn essential data structures and algorithms to solve complex problems effectively.',
  },
  {
    id: 'c6',
    title: 'Machine Learning',
    shortDesc: 'Basics of ML and algorithms.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Gradient_boosting.png',
    description: 'Dive into machine learning concepts and common algorithms to analyze data and make predictions.',
  },
  {
    id: 'c7',
    title: 'Database Systems',
    shortDesc: 'SQL and NoSQL databases explained.',
    img: 'https://cdn.iconscout.com/icon/free/png-256/database-3521214-2945113.png',
    description: 'Understand relational and non-relational databases with hands-on SQL and NoSQL examples.',
  },
  {
    id: 'c8',
    title: 'Cloud Computing',
    shortDesc: 'Introduction to AWS and cloud services.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
    description: 'Learn cloud infrastructure and services with a focus on AWS fundamentals.',
  },
  {
    id: 'c9',
    title: 'Cyber Security',
    shortDesc: 'Learn about network security and encryption.',
    img: 'https://cdn.iconscout.com/icon/free/png-256/cyber-security-2173193-1822606.png',
    description: 'Protect systems and data by understanding cybersecurity principles and encryption techniques.',
  },
  {
    id: 'c10',
    title: 'Mobile App Development',
    shortDesc: 'Build apps using React Native.',
    img: 'https://reactnative.dev/img/header_logo.svg',
    description: 'Create cross-platform mobile applications using React Native framework.',
  }
];

export default function MyCourses() {
  const { enrolledCourses, setEnrolledCourses } = useContext(AppContext);

  useEffect(() => {
    anime({
      targets: '.course-card',
      opacity: [0, 1],
      translateX: [-30, 0],
      delay: anime.stagger(100),
      easing: 'easeOutQuad',
    });
  }, []);

  const enrolledCourseData = coursesData.filter(course => enrolledCourses.includes(course.id));

  function handleUnenroll(courseId) {
    setEnrolledCourses(prev => prev.filter(id => id !== courseId));
  }

  return (
    <div className="courses-page">
      <main className="courses-content">
        <h2>My Enrolled Courses</h2>
        {enrolledCourseData.length === 0 ? (
          <p>You have not enrolled in any courses yet.</p>
        ) : (
          <div className="courses-list">
            {enrolledCourseData.map(course => (
              <div key={course.id} className="course-card">
                <img src={course.img} alt={course.title} className="course-img" />
                <h3>{course.title}</h3>
                <p>{course.shortDesc}</p>
                <div className="course-actions">
                  <Link to={`/courses/${course.id}`} className="details-btn">
                    View Details
                  </Link>
                  <button onClick={() => handleUnenroll(course.id)} className="unenroll-btn">
                    Unenroll
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
