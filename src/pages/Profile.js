import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Profile() {
  const userId = localStorage.getItem("userId");

  const [user, setUser] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/user/${userId}`
        );
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [userId]);

  // Change password
  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      setMessage("Please fill both fields");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/change-password/${userId}`,
        {
          oldPassword,
          newPassword,
        }
      );

      setMessage("Password updated successfully");
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      setMessage("Old password incorrect");
    }
  };

  if (!user) return <p className="text-center mt-5">Loading...</p>;

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <div className="card shadow p-4">
          <h3 className="mb-4 text-primary">Profile</h3>

          <div className="mb-3">
            <strong>Name:</strong> {user.name}
          </div>

          <div className="mb-3">
            <strong>Email:</strong> {user.email}
          </div>

          <div className="mb-3">
            <strong>Role:</strong> {user.role}
          </div>

          <hr />

          <h5 className="mt-4">Change Password</h5>

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button
            className="btn btn-warning"
            onClick={handleChangePassword}
          >
            Update Password
          </button>

          {message && (
            <div className="alert alert-info mt-3">
              {message}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
