const express = require("express");
const router = express.Router();
const { createProblem, getAllProblems, updateProblemStatus } = require("../controller/problemController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/report", authMiddleware, createProblem);
router.get("/", getAllProblems);
router.patch("/:id/status", updateProblemStatus);


module.exports = router;
