import { useEffect, useState } from "react";
import axios from "axios";

function ViewTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/tasks")
      .then(res => setTasks(res.data));
  }, []);

  return (
    <div>
      <h2>All Tasks</h2>

      {tasks.map(task => (
        <div key={task.id}>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default ViewTasks;
