import Task from "../models/Task.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await Task.find({ assignedTo: userId });

    const total = tasks.length;

    const todo = tasks.filter(t => t.status === "todo").length;
    const inProgress = tasks.filter(t => t.status === "in-progress").length;
    const done = tasks.filter(t => t.status === "done").length;

    const overdue = tasks.filter(
      t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "done"
    ).length;

    res.json({
      total,
      todo,
      inProgress,
      done,
      overdue
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};