import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 254 },
  password: { type: String, required: true, minlength: 8, select: false },
  phone: { type: String, required: true, trim: true, maxlength: 30 },
  role: { type: String, required: true, enum: ['Doctor', 'Patient'], default: 'Patient' },
}, { timestamps: true });

export default mongoose.model('User', userSchema);