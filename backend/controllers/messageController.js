import ContactMessage from "../models/ContactModel.js";
import { sendMail } from "../utils/sendEmail.js";

export const contactController = async (req, res) => {
  try {
    const { email, fullname, phoneNumber, message } = req.body;

    const newMessage = await ContactMessage.create({
      email,
      fullname,
      phoneNumber,
      message,
    });

    const messages = `    
    <h3>New Contact Message</h3>
    <p><strong>Name:</strong> ${fullname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Message:</strong><br/>${message}</p>
    `;

    await sendMail(email, "Information", messages);
    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      result: newMessage,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
