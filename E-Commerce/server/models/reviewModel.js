const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  title: { type: String, required: true },
  comment: { type: String, required: true },
  images: [{ type: String }] // Array of image URLs
}, {
  timestamps: true
});

// Prevent user from submitting more than one review per product
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

// Static method to calculate average rating and update product
reviewSchema.statics.calculateRatingSummary = async function(productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId }
    },
    {
      $group: {
        _id: '$product',
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 },
        rating5: { $sum: { $cond: [{ $eq: ['$rating', 5] }, 1, 0] } },
        rating4: { $sum: { $cond: [{ $eq: ['$rating', 4] }, 1, 0] } },
        rating3: { $sum: { $cond: [{ $eq: ['$rating', 3] }, 1, 0] } },
        rating2: { $sum: { $cond: [{ $eq: ['$rating', 2] }, 1, 0] } },
        rating1: { $sum: { $cond: [{ $eq: ['$rating', 1] }, 1, 0] } }
      }
    }
  ]);

  try {
    if (stats.length > 0) {
      await mongoose.model('Product').findByIdAndUpdate(productId, {
        ratingSummary: {
          averageRating: Math.round(stats[0].averageRating * 10) / 10,
          totalReviews: stats[0].totalReviews,
          ratings: {
            5: stats[0].rating5,
            4: stats[0].rating4,
            3: stats[0].rating3,
            2: stats[0].rating2,
            1: stats[0].rating1
          }
        }
      });
    } else {
      await mongoose.model('Product').findByIdAndUpdate(productId, {
        ratingSummary: {
          averageRating: 0,
          totalReviews: 0,
          ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
        }
      });
    }
  } catch (error) {
    console.error('Error updating rating summary:', error);
  }
};

// Call calculateRatingSummary after save
reviewSchema.post('save', function() {
  this.constructor.calculateRatingSummary(this.product);
});

// Call calculateRatingSummary after remove
reviewSchema.post('findOneAndDelete', async function(doc) {
  if (doc) {
    await doc.constructor.calculateRatingSummary(doc.product);
  }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
