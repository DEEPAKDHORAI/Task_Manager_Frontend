import { useState } from "react";
import axios from "axios";

function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTask = () => {
    axios.post("http://localhost:5000/tasks", { title, description })
      .then(() => {
        alert("Task Added");
        setTitle("");
        setDescription("");
      });
  };

  return (
    <div>
      <h2>Add Task</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br /><br />

      <button onClick={addTask}>Add Task</button>
    </div>
  );
}

export default AddTask;
