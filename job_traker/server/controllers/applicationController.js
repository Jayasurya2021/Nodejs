import Application from '../models/Application.js';

// @desc    Create new job application
// @route   POST /api/applications
export const createApplication = async (req, res) => {
  try {
    const {
      companyName,
      companyLogo,
      jobRole,
      jobUrl,
      companyWebsite,
      location,
      workType,
      salary,
      appliedDate,
      status,
      interviewDate,
      jobDescription,
      notes,
    } = req.body;

    if (!companyName || !jobRole) {
      return res.status(400).json({
        success: false,
        message: 'Company Name and Job Role are required fields',
      });
    }

    const application = await Application.create({
      companyName,
      companyLogo: companyLogo || '',
      jobRole,
      jobUrl: jobUrl || '',
      companyWebsite: companyWebsite || '',
      location: location || 'Remote',
      workType: workType || 'Remote',
      salary: salary || '',
      appliedDate: appliedDate ? new Date(appliedDate) : new Date(),
      status: status || 'Applied',
      interviewDate: interviewDate ? new Date(interviewDate) : null,
      jobDescription: jobDescription || '',
      notes: notes || '',
    });

    res.status(201).json({
      success: true,
      message: 'Application added successfully.',
      data: application,
    });
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error creating application',
    });
  }
};

// @desc    Get all applications with search & filter parameters
// @route   GET /api/applications
export const getApplications = async (req, res) => {
  try {
    const { search, status, workType, sort, dateFilter, customDate } = req.query;

    const query = {};

    // Search filter
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { companyName: searchRegex },
        { jobRole: searchRegex },
        { location: searchRegex },
        { notes: searchRegex },
      ];
    }

    // Status filter
    if (status && status !== 'All') {
      query.status = status;
    }

    // Work type filter
    if (workType && workType !== 'All') {
      query.workType = workType;
    }

    // Date filter
    const now = new Date();
    if (dateFilter === 'today') {
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
      query.appliedDate = { $gte: startOfDay, $lte: endOfDay };
    } else if (dateFilter === 'yesterday') {
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      const startOfDay = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
      const endOfDay = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 23, 59, 59, 999);
      query.appliedDate = { $gte: startOfDay, $lte: endOfDay };
    } else if (dateFilter === 'thisWeek') {
      const firstDayOfWeek = new Date(now);
      const day = now.getDay() || 7; // Get current day number (1-7)
      if (day !== 1) firstDayOfWeek.setHours(-24 * (day - 1)); // set to Monday
      firstDayOfWeek.setHours(0, 0, 0, 0);
      query.appliedDate = { $gte: firstDayOfWeek };
    } else if (dateFilter === 'thisMonth') {
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      query.appliedDate = { $gte: firstDayOfMonth };
    } else if (dateFilter === 'custom' && customDate) {
      const cDate = new Date(customDate);
      const startOfDay = new Date(cDate.getFullYear(), cDate.getMonth(), cDate.getDate());
      const endOfDay = new Date(cDate.getFullYear(), cDate.getMonth(), cDate.getDate(), 23, 59, 59, 999);
      query.appliedDate = { $gte: startOfDay, $lte: endOfDay };
    }

    // Sorting
    let sortOptions = { appliedDate: -1 }; // default newest
    if (sort === 'oldest') {
      sortOptions = { appliedDate: 1 };
    } else if (sort === 'companyAsc') {
      sortOptions = { companyName: 1 };
    } else if (sort === 'companyDesc') {
      sortOptions = { companyName: -1 };
    }

    const applications = await Application.find(query).sort(sortOptions);

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching applications',
    });
  }
};

// @desc    Get single application details
// @route   GET /api/applications/:id
export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching application details',
    });
  }
};

// @desc    Update application
// @route   PUT /api/applications/:id
export const updateApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Application updated successfully',
      data: updatedApplication,
    });
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error updating application',
    });
  }
};

// @desc    Patch application status
// @route   PATCH /api/applications/:id/status
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status, interviewDate } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required',
      });
    }

    const updateData = { status };
    if (interviewDate !== undefined) {
      updateData.interviewDate = interviewDate ? new Date(interviewDate) : null;
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    res.status(200).json({
      success: true,
      message: `Status updated to ${status}`,
      data: updatedApplication,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error updating application status',
    });
  }
};

// @desc    Delete application
// @route   DELETE /api/applications/:id
export const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    await Application.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Application deleted successfully',
      id: req.params.id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error deleting application',
    });
  }
};

// @desc    Get dashboard metrics & analytics statistics
// @route   GET /api/applications/stats
export const getDashboardStats = async (req, res) => {
  try {
    const allApplications = await Application.find().sort({ appliedDate: -1 });

    const totalApplications = allApplications.length;

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    // This week (Monday start)
    const day = now.getDay() || 7;
    const startOfWeek = new Date(now);
    if (day !== 1) startOfWeek.setHours(-24 * (day - 1));
    startOfWeek.setHours(0, 0, 0, 0);

    // This month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    let appliedToday = 0;
    let appliedThisWeek = 0;
    let appliedThisMonth = 0;
    let interviewsCount = 0;
    let pendingCount = 0;
    let rejectedCount = 0;
    let offersCount = 0;
    let wishlistCount = 0;

    const statusCounts = {
      Wishlist: 0,
      Applied: 0,
      Screening: 0,
      Interview: 0,
      'Technical Round': 0,
      'Final Round': 0,
      Offer: 0,
      Rejected: 0,
    };

    const upcomingInterviews = [];

    allApplications.forEach((app) => {
      const appDate = new Date(app.appliedDate);

      // Date ranges
      if (appDate >= startOfToday && appDate <= endOfToday) {
        appliedToday += 1;
      }
      if (appDate >= startOfWeek) {
        appliedThisWeek += 1;
      }
      if (appDate >= startOfMonth) {
        appliedThisMonth += 1;
      }

      // Status breakdown
      if (statusCounts[app.status] !== undefined) {
        statusCounts[app.status] += 1;
      }

      if (['Interview', 'Technical Round', 'Final Round'].includes(app.status)) {
        interviewsCount += 1;
      } else if (['Applied', 'Screening'].includes(app.status)) {
        pendingCount += 1;
      } else if (app.status === 'Rejected') {
        rejectedCount += 1;
      } else if (app.status === 'Offer') {
        offersCount += 1;
      } else if (app.status === 'Wishlist') {
        wishlistCount += 1;
      }

      // Check upcoming interview date
      if (app.interviewDate) {
        const iDate = new Date(app.interviewDate);
        if (iDate >= startOfToday) {
          upcomingInterviews.push(app);
        }
      }
    });

    // Sort upcoming interviews by date ascending
    upcomingInterviews.sort((a, b) => new Date(a.interviewDate) - new Date(b.interviewDate));

    // Calculate conversion rates
    const interviewConversionRate = totalApplications > 0
      ? Math.round(((interviewsCount + offersCount) / totalApplications) * 100)
      : 0;

    const rejectionRate = totalApplications > 0
      ? Math.round((rejectedCount / totalApplications) * 100)
      : 0;

    const offerRate = totalApplications > 0
      ? Math.round((offersCount / totalApplications) * 100)
      : 0;

    // Daily activity breakdown for the last 14 days
    const dailyActivityMap = {};
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      dailyActivityMap[dateStr] = { date: dateStr, count: 0, label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) };
    }

    allApplications.forEach((app) => {
      const appDateStr = new Date(app.appliedDate).toISOString().split('T')[0];
      if (dailyActivityMap[appDateStr]) {
        dailyActivityMap[appDateStr].count += 1;
      }
    });

    const dailyActivity = Object.values(dailyActivityMap);

    res.status(200).json({
      success: true,
      stats: {
        totalApplications,
        appliedToday,
        appliedThisWeek,
        appliedThisMonth,
        interviews: interviewsCount,
        pending: pendingCount,
        rejected: rejectedCount,
        offers: offersCount,
        wishlist: wishlistCount,
        interviewConversionRate,
        rejectionRate,
        offerRate,
        statusCounts,
        recentApplications: allApplications.slice(0, 5),
        upcomingInterviews,
        dailyActivity,
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server error calculating dashboard statistics',
    });
  }
};
