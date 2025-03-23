import { useNavigate } from "react-router-dom";

const dummyJobs = [
  {
    title: "Frontend Developer",
    company: "TechCorp",
    role: "Software Engineer",
    location: "New York, NY",
    skills: ["JavaScript", "React"],
    jobType: "Full-time",
    salary: "$80,000 - $100,000",
    description: "Develop and maintain frontend applications using React.",
    link: "https://www.naukri.com/frontend-developer-jobs",
  },
  {
    title: "Backend Developer",
    company: "DataSoft",
    role: "Software Engineer",
    location: "San Francisco, CA",
    skills: ["Node.js", "SQL", "AWS"],
    jobType: "Full-time",
    salary: "$90,000 - $110,000",
    description:
      "Build and optimize backend services with Node.js and databases.",
    link: "https://www.indeed.com/q-backend-developer-jobs.html",
  },
  {
    title: "Data Scientist",
    company: "AI Labs",
    role: "Data Scientist",
    location: "Boston, MA",
    skills: ["Python", "Machine Learning", "TensorFlow"],
    jobType: "Full-time",
    salary: "$100,000 - $130,000",
    description: "Analyze data and build machine learning models.",
    link: "https://www.naukri.com/data-scientist-jobs",
  },
  {
    title: "UI/UX Designer",
    company: "Creative Minds",
    role: "Designer",
    location: "Los Angeles, CA",
    skills: ["Figma", "Adobe XD", "Wireframing"],
    jobType: "Full-time",
    salary: "$70,000 - $90,000",
    description: "Design user-friendly interfaces and improve user experience.",
    link: "https://www.indeed.com/q-ui-ux-designer-jobs.html",
  },
  {
    title: "DevOps Engineer",
    company: "CloudSync",
    role: "DevOps Engineer",
    location: "Austin, TX",
    skills: ["Docker", "Kubernetes", "CI/CD"],
    jobType: "Full-time",
    salary: "$95,000 - $120,000",
    description: "Manage cloud infrastructure and CI/CD pipelines.",
    link: "https://www.naukri.com/devops-engineer-jobs",
  },
  {
    title: "Cybersecurity Analyst",
    company: "SecureNet",
    role: "Security Analyst",
    location: "Washington, D.C.",
    skills: ["Penetration Testing", "Network Security", "SIEM"],
    jobType: "Full-time",
    salary: "$85,000 - $110,000",
    description: "Monitor and improve system security against cyber threats.",
    link: "https://www.indeed.com/q-cybersecurity-jobs.html",
  },
];

export default function JobsList() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 p-6">
      <section className="py-4 px-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors cursor-pointer shadow-md"
        >
          Go Back
        </button>
      </section>

      <div className="max-w-5xl mx-auto p-8 bg-white shadow-2xl rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Available Jobs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyJobs.map((job, index) => (
            <div
              key={index}
              className="bg-white p-6 shadow-xl rounded-xl border border-gray-300 hover:shadow-2xl transition duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {job.title}
                </h3>
                <p className="text-gray-700">
                  <span className="font-medium">{job.company}</span>
                </p>
                <p className="text-gray-700">{job.role}</p>
                <p className="text-gray-700">{job.location}</p>
                <p className="text-gray-700">
                  Skills:{" "}
                  <span className="italic">{job.skills.join(", ")}</span>
                </p>
                <p className="text-gray-700">{job.jobType}</p>
                <p className="text-gray-700">{job.salary}</p>
                <p className="text-gray-600 text-sm mt-2">{job.description}</p>
              </div>
              <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
