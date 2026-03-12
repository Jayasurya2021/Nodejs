import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
   category: {
    type: String,
    enum: [
      "tshirt",
      "shirt",
      "jeans",
      "pants",
      "shorts",
      "hoodie",
      "jacket",
      "blazer",
      "suit",
      "kurta",
      "sherwani",
      "trackpants",
      "sweatshirt",
      "innerwear",
      "socks"
    ],
    required: true
  },
    brand: {
        type: String
    },
    stock: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    keywords: [
    {
      type: String
    }
  ]
}, { timestamps: true });

export default mongoose.model("Product", productSchema);