const Problem = require("../models/ProblemModels");

exports.createProblem = async (req, res) => {
    try {
        console.log("createProblem - Body:", req.body);
        const { title, description, location, category } = req.body;

        const problem = await Problem.create({
            title,
            description,
            location,
            category,
            reportedBy: req.user.id
        });

        res.status(201).json(problem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllProblems = async (req, res) => {
    try {
        const problems = await Problem.find()
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
        const { status } = req.body;
        const problem = await Problem.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }

        res.status(200).json(problem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
