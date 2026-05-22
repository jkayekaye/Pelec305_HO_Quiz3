import { useEffect, useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // ✅ PRODUCTION BACKEND (PythonAnywhere)
  const API_URL = "https://yourusername.pythonanywhere.com/api/tasks/";

  // Fetch tasks
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.log(err));
  }, []);

  // Add Task
  const addTask = () => {
    if (!title.trim()) return;

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        is_completed: false,
      }),
    })
      .then((res) => res.json())
      .then((newTask) => {
        setTasks([...tasks, newTask]);
        setTitle("");
      });
  };

  // Complete Task
  const completeTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, is_completed: true }
        : task
    );

    setTasks(updatedTasks);
  };

  const pendingTasks = tasks.filter(
    (task) => !task.is_completed
  );

  const completedTasks = tasks.filter(
    (task) => task.is_completed
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 p-6 flex justify-center items-start">

      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-blue-100">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-700">
            Task Manager
          </h1>

          <p className="text-slate-500 mt-2">
            Task Management System
          </p>
        </div>

        {/* Input */}
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            placeholder="Enter a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-5 py-3 rounded-2xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
          />

          <button
            onClick={addTask}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg transition-all"
          >
            Add
          </button>
        </div>

        {/* Pending Tasks */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Tasks to be Completed
          </h2>

          <div className="space-y-4">
            {pendingTasks.length === 0 && (
              <p className="text-slate-400">
                No pending tasks.
              </p>
            )}

            {pendingTasks.map((task) => (
              <div
                key={task.id}
                className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4 flex items-center justify-between shadow-sm"
              >
                <span className="text-slate-700 font-medium">
                  {task.title}
                </span>

                <button
                  onClick={() => completeTask(task.id)}
                  className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-xl text-sm"
                >
                  Complete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Tasks */}
        <div>
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            Completed Tasks
          </h2>

          <div className="space-y-4">
            {completedTasks.length === 0 && (
              <p className="text-slate-400">
                No completed tasks yet.
              </p>
            )}

            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="bg-green-50 border border-green-100 rounded-2xl px-5 py-4 flex items-center justify-between shadow-sm"
              >
                <span className="text-slate-700 line-through">
                  {task.title}
                </span>

                <span className="bg-green-200 text-green-700 text-xs px-3 py-1 rounded-full">
                  Completed
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
