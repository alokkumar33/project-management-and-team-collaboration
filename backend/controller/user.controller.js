import Task from "../models/task.model.js";
import User from "../models/user.model.js";


export const getUsers = async (req, res, next) => {
    try {
      const users = await User.find({ role: "user" }).select("-password");  

      const userWithTaskCounts = await Promise.all(
        users.map(async (user) => {
            const pendingTAsk = await Task.countDocuments({ assignedTo: user._id, status: "Pending" });
            const inProgressTask = await Task.countDocuments({ assignedTo: user._id, status: "In Progress" });
            const completedTask = await Task.countDocuments({ assignedTo: user._id, status: "Completed" });

            return {
                ...user._doc,
                pendingTAsk,
                inProgressTask,
                completedTask
            };
        })
      );

      res.status(200).json(userWithTaskCounts);
    } catch (error) {
        next(error);
    }
}