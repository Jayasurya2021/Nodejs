const Problem = require("../models/ProblemModels");

exports.createProblem = async (req, res) => {
    try {
        const { title, description, location, category } = req.body;

        // Ensure user creates it
        const problem = await Problem.create({
            title,
            description,
            location,
            category,
            reportedBy: req.user.id,
            status: 'pending' // Default status
        });

        res.status(201).json(problem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUserProblems = async (req, res) => {
    try {
        const problems = await Problem.find({ reportedBy: req.user.id })
            .sort({ createdAt: -1 });
        res.status(200).json(problems);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAdminProblems = async (req, res) => {
    try {
        const { department } = req.user;

        // Admin sees only their department's problems
        const problems = await Problem.find({ category: department })
            .populate("reportedBy", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json(problems);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getSingleProblem = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id)
            .populate("reportedBy", "name email");

        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }

        res.status(200).json(problem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.updateProblemStatus = async (req, res) => {
    try {
        const { role, department } = req.user;
        const { status } = req.body;

        // Strict RBAC: Only admins can update status
        if (role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Only department staff can update status." });
        }

        // Find problem first to check department
        const problemToCheck = await Problem.findById(req.params.id);
        if (!problemToCheck) {
            return res.status(404).json({ message: "Problem not found" });
        }

        // Verify admin department matches problem category
        if (department && problemToCheck.category !== department) {
            return res.status(403).json({ message: "Access denied. You can only update problems in your department." });
        }

        const problem = await Problem.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }

        res.status(200).json(problem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
