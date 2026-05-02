import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [error, setError] = useState("");

  // fetch projects
  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load projects");
    }
  };

  // create project
  const handleCreate = async () => {
    if (!name) return alert("Enter project name");

    try {
      await API.post("/projects", { name });
      setName("");
      fetchProjects(); // refresh list
    } catch (error) {
      console.log(error);
      alert("Failed to create project");
    }
  };

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await API.get("/projects");
        setProjects(res.data);
      } catch (error) {
        setError("Failed to load projects");
      }
    };

    loadProjects();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h1 style={{ marginBottom: "20px" }}>Projects</h1>

      <h2 style={{ color: "#444" }}>Manage your team projects</h2>

      {/* Create Project */}
      <div
        style={{
          border: "1px solid #ddd",
          padding: "15px",
          marginBottom: "20px",
          borderRadius: "8px",
        }}
      >
        <h3>Create Project</h3>

        <input
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />

        <button onClick={handleCreate}>Create</button>
      </div>

      {/* Add Member */}
      <div
        style={{
          border: "1px solid #ddd",
          padding: "15px",
          marginBottom: "20px",
          borderRadius: "8px",
        }}
      >
        <h3>Add Member</h3>

        <input
          placeholder="User email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />

        <select
          onChange={(e) => setSelectedProject(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        >
          <option>Select Project</option>
          {projects.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <button
          onClick={async () => {
            try {
              await API.post(`/projects/${selectedProject}/add-member`, {
                email,
              });
              setEmail("");
            } catch {
              setError("Failed to add member");
            }
          }}
        >
          Add
        </button>
      </div>

      {/* Project List */}
      <div>
        <h3>Your Projects</h3>

        {projects.length === 0 ? (
          <p>No projects yet</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "15px",
            }}
          >
            {projects.map((p) => (
              <button
                key={p._id}
                onClick={() => navigate(`/projects/${p._id}`)}
                style={{
                  border: "1px solid #444",
                  padding: "15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  textAlign: "center",
                  background: "#444",
                }}
              >
                <strong>{p.name}</strong>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
