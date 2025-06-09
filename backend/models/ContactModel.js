import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const ContactMessage = mongoose.model("Message", contactMessageSchema);

export default ContactMessage;
