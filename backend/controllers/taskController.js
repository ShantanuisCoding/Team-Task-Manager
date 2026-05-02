import Task from "../models/Task.js";
import Project from "../models/Project.js";

// export const createTask = async (req, res) => {
//   try {
//     const { title, description, dueDate, priority, projectId } = req.body;

//     // validation
//     if (!title || !projectId) {
//       return res.status(400).json({
//         success: false,
//         message: "Title, projectId are required"
//       });
//     }

//     const project = await Project.findById(projectId);

//     // check project exists
//     if (!project) {
//       return res.status(404).json({
//         success: false,
//         message: "Project not found"
//       });
//     }

//     // check admin
//     const isAdmin = project.members.find(
//       m => m.user.toString() === req.user.id && m.role === "admin"
//     );

//     if (!isAdmin) {
//       return res.status(403).json({
//         success: false,
//         message: "Only admin can create tasks"
//       });
//     }

//     // check assigned user is part of project
//     // const isMember = project.members.find(
//     //   m => m.user.toString() === assignedTo
//     // );

//     // if (!isMember) {
//     //   return res.status(400).json({
//     //     success: false,
//     //     message: "Assigned user is not part of this project"
//     //   });
//     // }

//     const task = await Task.create({
//       title,
//       description,
//       dueDate,
//       priority,
//       projectId,

//       // auto assign
//       assignedTo: req.user.id
//     });

//     return res.status(201).json({
//       success: true,
//       data: task
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error"
//     });
//   }
// };

export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      dueDate,
      priority,
      projectId,
      assignedTo, // ✅ ADD THIS
    } = req.body;

    if (!title || !projectId || !assignedTo) {
      return res.status(400).json({
        success: false,
        message: "Title, projectId and assignedTo are required",
      });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // check admin
    const isAdmin = project.members.find(
      (m) => m.user.toString() === req.user.id && m.role === "admin",
    );

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Only admin can create tasks",
      });
    }

    if (!assignedTo) {
      return setError("Please select a user");
    }

    const isMember = project.members.find(
      (m) => m.user.toString() === assignedTo,
    );

    if (!isMember) {
      return res.status(400).json({
        success: false,
        message: "Assigned user is not part of this project",
      });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      projectId,
      assignedTo,
    });

    return res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const isMember = project.members.find(
      (m) => m.user.toString() === req.user.id,
    );

    if (!isMember) {
      return res.status(403).json({ message: "Access denied" });
    }

    const tasks = await Task.find({ projectId }).populate(
      "assignedTo",
      "name email",
    );

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    const project = await Project.findById(task.projectId);

    const isAdmin = project.members.find(
      (m) => m.user.toString() === req.user.id && m.role === "admin",
    );

    const isAssignedUser = task.assignedTo.toString() === req.user.id;

    if (!isAdmin && !isAssignedUser) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    const project = await Project.findById(task.projectId);

    const isAdmin = project.members.find(
      (m) => m.user.toString() === req.user.id && m.role === "admin",
    );

    if (!isAdmin) {
      return res.status(403).json({ message: "Only admin can delete" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
