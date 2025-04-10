import React from 'react';

const jobs = [
  {
    title: 'Frontend Developer',
    description: 'React.js, TailwindCSS, UI/UX focus',
    type: 'Remote | Full-time',
    emailSubject: 'Frontend Developer Application',
  },
  {
    title: 'Backend Developer',
    description: 'Spring Boot, REST APIs, Firebase',
    type: 'Remote | Full-time',
    emailSubject: 'Backend Developer Application',
  },
  {
    title: 'Marketing Lead',
    description: 'Growth strategy, content, campaigns',
    type: 'Remote | Part-time',
    emailSubject: 'Marketing Lead Application',
  },
];

const Careers = () => {
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-8 lg:px-24">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Join the WorkForce Team</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          We're building a platform that connects people to trusted service providers. If you're passionate about impact, innovation, and building communities — we want to hear from you!
        </p>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
            <p className="text-gray-600 mt-2 mb-4">{job.description}</p>
            <p className="text-sm text-gray-500 mb-4">{job.type}</p>
            <a
              href={`mailto:careers_in_quickserv@hotmail.com?subject=${encodeURIComponent(job.emailSubject)}`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700"
            >
              Apply Now
            </a>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Don't see your role?</h2>
        <p className="text-gray-600 mb-4">
          We're always looking for talented people. Drop us your resume!
        </p>
        <a href="mailto:careers_in_quickserv@hotmail.com" className="text-blue-600 font-medium hover:underline">
        careers_in_quickserv@hotmail.com
        </a>
      </div>
    </section>
  );
};

export default Careers;
