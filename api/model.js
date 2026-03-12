import mongoose from 'mongoose';

const LinkSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true, 
    index: true, 
  },
  clicks: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Link || mongoose.model('Link', LinkSchema);