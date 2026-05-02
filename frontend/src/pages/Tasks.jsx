import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function Tasks() {
  const { projectId } = useParams();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [members, setMembers] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/tasks/${projectId}`);
      setTasks(res.data);
    } catch (err) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async () => {
    if (!title) return;

    console.log({ title, projectId, assignedTo });
    try {
      setLoading(true);
      await API.post("/tasks", {
        title,
        projectId,
        assignedTo,
      });
      setTitle("");
      fetchTasks();
    } catch (err) {
      setError(
        err.response?.data?.message || JSON.stringify(err.response?.data),
      );
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (taskId, status) => {
    try {
      await API.put(`/tasks/${taskId}`, { status });
      fetchTasks();
    } catch (err) {
      setError("Update failed");
    }
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await API.get("/projects");
        const currentProject = res.data.find((p) => p._id === projectId);

        if (currentProject) {
          setMembers(currentProject.members);
        }
      } catch (err) {
        console.log("Failed to fetch members");
      }
    };

    fetchTasks();
    fetchMembers();
  }, [projectId]);

  // console.log({
  //     title,
  //     projectId
  // });
  // console.log("Members:", members);
  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h1 style={{ marginBottom: "20px" }}>Task Manager</h1>

      <br />

      {/* Create Task Card */}
      <div
        style={{
          border: "1px solid #ddd",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h3>Create Task</h3>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: "8px", flex: "1" }}
          />

          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            style={{ padding: "8px" }}
          >
            <option value="">Assign to</option>
            {members.map((m) => (
              <option key={m.user._id} value={m.user._id}>
                {m.user.name}
              </option>
            ))}
          </select>

          <button onClick={createTask}>Add</button>
        </div>
      </div>
      <br />
      {/* Error */}
      {error && (
        <div
          style={{
            background: "#ffe6e6",
            padding: "10px",
            borderRadius: "6px",
            marginBottom: "15px",
          }}
        >
          <p style={{ color: "red", margin: 0 }}>{error}</p>
        </div>
      )}

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Task List */}
      <div>
        <h3>Your Tasks</h3>

        {tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "15px",
            }}
          >
            {tasks.map((t) => (
              <div
                key={t._id}
                style={{
                  border: "1px solid #ccc",
                  padding: "15px",
                  borderRadius: "8px",
                  background: "#444",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <strong>{t.title}</strong>

                  <select
                    value={t.status}
                    onChange={(e) => updateStatus(t._id, e.target.value)}
                    style={{ padding: "5px" }}
                  >
                    <option value="todo">Todo</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>

                {t.assignedTo && (
                  <p
                    style={{
                      marginTop: "8px",
                      fontSize: "14px",
                      color: "#fffefe",
                    }}
                  >
                    Assigned to: {t.assignedTo.name || "User"}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
