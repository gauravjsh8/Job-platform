import { useAuth } from "../context/AuthProvider";

const Home = () => {
  const { userProfile, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {userProfile ? <p>Welcome, {userProfile.name}</p> : <p>Please log in</p>}
    </div>
  );
};
export default Home;
