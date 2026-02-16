import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/admin/users"
      );
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/admin/tasks"
      );
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete User
  const deleteUser = async (id) => {
    await axios.delete(
      `http://localhost:5000/admin/user/${id}`
    );
    fetchUsers();
    fetchTasks();
  };

  // Delete Task
  const deleteTask = async (id) => {
    await axios.delete(
      `http://localhost:5000/tasks/${id}`
    );
    fetchTasks();
  };

  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, []);

  // Chart Data
  const completedCount = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const pendingCount = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  const chartData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completedCount, pendingCount],
        backgroundColor: ["#28a745", "#6c757d"],
      },
    ],
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2 className="text-danger mb-4">
          Admin Dashboard
        </h2>

        {/* Users Section */}
        <div className="card shadow p-4 mb-4">
          <h5 className="mb-3">All Users</h5>

          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="d-flex justify-content-between align-items-center border-bottom py-2"
              >
                <div>
                  <strong>{user.name}</strong> —{" "}
                  {user.email} ({user.role})
                </div>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        {/* Tasks Section */}
        <div className="card shadow p-4 mb-4">
          <h5 className="mb-3">All Tasks</h5>

          {tasks.length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="border-bottom py-2 d-flex justify-content-between"
              >
                <div>
                  <strong>{task.title}</strong>
                  <p className="mb-1">
                    {task.description}
                  </p>
                  <small>
                    Created by: {task.name}
                  </small>
                  <br />
                  <span
                    className={`badge ${
                      task.status === "completed"
                        ? "bg-success"
                        : "bg-secondary"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() =>
                    deleteTask(task.id)
                  }
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        {/* Chart Section */}
        <div className="card shadow p-4">
          <h5 className="mb-3">
            Task Completion Overview
          </h5>
          <div style={{ width: "300px", margin: "auto" }}>
            <Pie data={chartData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
