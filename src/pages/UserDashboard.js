import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function UserDashboard() {
  const userId = localStorage.getItem("userId");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/tasks/${userId}`
      );
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Add or Update Task
  const handleSubmit = async () => {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/tasks/${editId}`,
          { title, description }
        );
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/tasks", {
          title,
          description,
          user_id: userId,
        });
      }

      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  // Complete Task
  const completeTask = async (id) => {
    await axios.put(
      `http://localhost:5000/tasks/complete/${id}`
    );
    fetchTasks();
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2 className="text-primary mb-4">User Dashboard</h2>

        {/* Add Task Card */}
        <div className="card shadow p-4 mb-4">
          <h5 className="mb-3">
            {editId ? "Edit Task" : "Add New Task"}
          </h5>

          <input
            className="form-control mb-3"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="form-control mb-3"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            className={`btn ${
              editId ? "btn-warning" : "btn-success"
            }`}
            onClick={handleSubmit}
          >
            {editId ? "Update Task" : "Add Task"}
          </button>
        </div>

        {/* Search Bar */}
        <input
          className="form-control mb-4"
          placeholder="Search tasks..."
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Task List */}
        <h5>Your Tasks</h5>

        {tasks.length === 0 ? (
          <p>No tasks added yet.</p>
        ) : (
          tasks
            .filter((task) =>
              task.title
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((task) => (
              <div
                key={task.id}
                className="card shadow-sm p-3 mb-3"
              >
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6>{task.title}</h6>
                    <p className="mb-2">{task.description}</p>

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

                  <div>
                    {task.status !== "completed" && (
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={() =>
                          completeTask(task.id)
                        }
                      >
                        Complete
                      </button>
                    )}

                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => {
                        setTitle(task.title);
                        setDescription(task.description);
                        setEditId(task.id);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() =>
                        deleteTask(task.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </>
  );
}

export default UserDashboard;
