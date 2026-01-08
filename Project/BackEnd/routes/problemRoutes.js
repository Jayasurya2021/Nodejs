const express = require("express");
const router = express.Router();
const { createProblem, getAdminProblems, getUserProblems, updateProblemStatus } = require("../controller/problemController");
const { authUser, authAdmin } = require("../middleware/authMiddleware");

// User APIs
router.post("/user/problems", authUser, createProblem);
router.get("/user/myproblems", authUser, getUserProblems);

// Admin APIs
router.get("/admin/problems", authAdmin, getAdminProblems);
router.patch("/admin/problems/:id", authAdmin, updateProblemStatus);


module.exports = router;
