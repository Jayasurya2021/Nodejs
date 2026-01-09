const express = require("express");
const router = express.Router();
const { createProblem, getAdminProblems, getUserProblems, updateProblemStatus, getSingleProblem } = require("../controller/problemController");
const { authUser, authAdmin, authAny } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// User APIs
router.post("/user/problems", authUser, upload.single("image"), createProblem);
router.get("/user/myproblems", authUser, getUserProblems);

// Admin APIs
router.get("/admin/problems", authAdmin, getAdminProblems);
router.patch("/admin/problems/:id", authAdmin, upload.single("image"), updateProblemStatus);

// Common APIs
router.get("/:id", authAny, getSingleProblem);

module.exports = router;
