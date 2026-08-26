import express from 'express';
import {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  updateApplicationStatus,
  deleteApplication,
  getDashboardStats,
} from '../controllers/applicationController.js';

const router = express.Router();

// Stats endpoint MUST be defined before /:id route
router.get('/stats', getDashboardStats);

router.route('/')
  .post(createApplication)
  .get(getApplications);

router.route('/:id')
  .get(getApplicationById)
  .put(updateApplication)
  .delete(deleteApplication);

router.patch('/:id/status', updateApplicationStatus);

export default router;
