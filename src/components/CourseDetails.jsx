import React, { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import '../styles/CourseDetails.css';
import anime from 'animejs/lib/anime.es.js';

const coursesDetailsData = {
  c1: {
    title: 'Web Development',
    bannerImg: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    instructorImg: 'https://randomuser.me/api/portraits/women/44.jpg',
    duration: '8 weeks',
    level: 'Beginner',
    prerequisites: 'Basic computer knowledge',
    description: [
      `This comprehensive course covers building websites from scratch using HTML5, CSS3, and JavaScript.`,
      `You will learn responsive design principles, layouts, and interactive UI components.`,
      `By the end of the course, you'll be able to create a personal portfolio and small business websites.`,
    ],
    syllabus: [
      'HTML Basics and Semantic Tags',
      'CSS Flexbox and Grid',
      'JavaScript Fundamentals',
      'DOM Manipulation',
      'Responsive Web Design',
      'Project: Build Portfolio Website',
    ],
    instructor: 'Jane Smith',
    reviews: [
      { user: 'Alice', comment: 'Great course, very practical!', rating: 5 },
      { user: 'Bob', comment: 'Good for beginners!', rating: 4 },
    ],
  },
  c2: {
    title: 'React Basics',
    bannerImg: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    instructorImg: 'https://randomuser.me/api/portraits/men/46.jpg',
    duration: '6 weeks',
    level: 'Intermediate',
    prerequisites: 'Basic JavaScript knowledge',
    description: [
      `Learn React fundamentals including components, props, state, and hooks.`,
      `Understand component lifecycle and build interactive single page applications.`,
      `You will build practical projects like a to-do list and a weather app.`,
    ],
    syllabus: [
      'React Components and JSX',
      'Props and State',
      'Event Handling',
      'React Hooks: useState and useEffect',
      'React Router Basics',
      'Project: To-Do List App',
    ],
    instructor: 'John Doe',
    reviews: [
      { user: 'Cathy', comment: 'Clear explanations and great projects.', rating: 5 },
      { user: 'Dan', comment: 'Helped me get started with React!', rating: 4 },
    ],
  },
};

export default function CourseDetails() {
  const { courseId } = useParams();
  const { enrolledCourses, setEnrolledCourses } = useContext(AppContext);

  const course = coursesDetailsData[courseId];

  useEffect(() => {
    anime({
      targets: '.course-details-content',
      opacity: [0, 1],
      translateY: [20, 0],
      easing: 'easeOutQuad',
      duration: 600,
    });
  }, [courseId]);

  if (!course) {
    return (
      <main className="course-details-content">
        <h2>Course Not Found</h2>
        <p>The course you are looking for does not exist.</p>
      </main>
    );
  }

  const isEnrolled = enrolledCourses.includes(courseId);

  function handleEnroll() {
    if (!isEnrolled) {
      setEnrolledCourses((prev) => [...prev, courseId]);
      alert('You have successfully enrolled in the course!');
    }
  }

  return (
    <main className="course-details-content">
      <img src={course.bannerImg} alt={`${course.title} banner`} className="course-banner" />
      <h2>{course.title}</h2>

      <div className="course-meta">
        <div><strong>Duration:</strong> {course.duration}</div>
        <div><strong>Level:</strong> {course.level}</div>
        <div><strong>Prerequisites:</strong> {course.prerequisites}</div>
      </div>

      <section className="course-description-section">
        <h3>About this course</h3>
        {course.description.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </section>

      <section className="course-syllabus">
        <h3>Syllabus</h3>
        <ul>
          {course.syllabus.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="course-instructor">
        <h3>Instructor</h3>
        <div className="instructor-details">
          <img
            src={course.instructorImg}
            alt={`Instructor ${course.instructor}`}
            className="instructor-photo"
          />
          <p>{course.instructor}</p>
        </div>
      </section>

      <section className="course-reviews">
        <h3>Reviews</h3>
        {course.reviews && course.reviews.length > 0 ? (
          <ul>
            {course.reviews.map((review, idx) => (
              <li key={idx}>
                <strong>{review.user}</strong>: {review.comment} {' '}
                <span className="rating">{'⭐'.repeat(review.rating)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </section>

      {!isEnrolled ? (
        <button className="enroll-btn" onClick={handleEnroll}>
          Enroll Now
        </button>
      ) : (
        <Link to={`/assessments/${courseId}`} className="assessment-link">
          Go to Assessment
        </Link>
      )}
    </main>
  );
}
