// src/pages/DashboardHome.jsx
function DashboardHome() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        Welcome to the Dashboard Panel
      </h1>
      <p className="mb-2">
        Here, as an admin you can post, update, create, or delete jobs.
      </p>
      <p className="mb-2">
        Also, view how many applicants have applied for the jobs, and manage
        your postings easily.
      </p>
      {/* Add any other info or quick links */}
    </div>
  );
}

export default DashboardHome;
