import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Profile() {
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:5000/user/${userId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userId]);

  if (!user) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="card shadow p-4">
          <h3 className="mb-4 text-primary">Profile</h3>

          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      </div>
    </>
  );
}

export default Profile;
