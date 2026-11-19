import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    trim: true,
    lowercase: true,
    maxlength: [254, 'Email cannot exceed 254 characters'],
    match: [/^\S+@\S+\.\S+$/, 'Please add a valid email']
  },
  subject: {
    type: String,
    required: [true, 'Please add a subject'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Please add a message'],
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
