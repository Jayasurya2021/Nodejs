import React, { useEffect, useState } from "react";

const ToDoList = () => {
  const [task, setTask] = useState("");
  const [allTask, setAllTask] = useState([]);
  const [filter, setFilter] = useState("all");


  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (savedTasks) {
      setAllTask(savedTasks);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(allTask));
  }, [allTask]);


  function handleAddTask() {
    if (!task.trim()) return;

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setAllTask([...allTask, newTask]);
    setTask("");
  }

  function handleDelete(id) {
    setAllTask(allTask.filter((task) => task.id !== id));
  }

  function handleComplete(id) {
    setAllTask(
      allTask.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  const filteredTasks = allTask.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div>
      <h1>To Do List</h1>

      <input
        type="text"
        placeholder="Enter Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={handleAddTask}>Add Task</button>

      <hr />

      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("completed")}>Completed</button>
      <button onClick={() => setFilter("pending")}>Pending</button>

      <hr />

      {filteredTasks.length === 0 ? (
        <h3>No Tasks Found</h3>
      ) : (
        filteredTasks.map((task) => (
          <div key={task.id}>
            <h3
              style={{
                textDecoration: task.completed
                  ? "line-through"
                  : "none",
              }}
            >
              {task.text}
            </h3>

            <button onClick={() => handleComplete(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>

            <button onClick={() => handleDelete(task.id)}>
              Delete
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default ToDoList;