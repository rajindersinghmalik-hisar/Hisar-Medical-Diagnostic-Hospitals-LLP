import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true, // needed to delete from Cloudinary
    },
  },
  { timestamps: true }
);

// Avoid recompiling model on hot reload
const Image = mongoose.models.Image || mongoose.model("Image", imageSchema);

export default Image;
