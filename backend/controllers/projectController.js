import Project from "../models/Project.js";
import User from "../models/User.js";

export const createProject = async (req, res) => {
  try {
    const { name } = req.body;

    const project = await Project.create({
      name,
      createdBy: req.user.id,
      members: [
        {
          user: req.user.id,
          role: "admin",
        },
      ],
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      "members.user": req.user.id,
    }).populate("members.user", "name email");

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addMember = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = user._id;

    // validation
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const project = await Project.findById(req.params.id);

    // project check
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
        message: "Not authorized",
      });
    }

    // check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // prevent duplicate members
    const alreadyMember = project.members.find(
      (m) => m.user.toString() === userId,
    );

    if (alreadyMember) {
      return res.status(400).json({
        success: false,
        message: "User already a member",
      });
    }

    // add member
    project.members.push({
      user: userId,
      role: "member",
    });

    await project.save();

    return res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const removeMember = async (req, res) => {
  try {
    const { userId } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const isAdmin = project.members.find(
      (m) => m.user.toString() === req.user.id && m.role === "admin",
    );

    if (!isAdmin) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (userId === req.user.id) {
      return res
        .status(400)
        .json({ message: "Admin cannot remove themselves" });
    }

    project.members = project.members.filter(
      (m) => m.user.toString() !== userId,
    );

    await project.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
