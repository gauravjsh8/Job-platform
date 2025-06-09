import ContactMessage from "../models/ContactModel.js";
import { sendMail } from "../utils/sendEmail.js";

export const sendMessage = async (req, res) => {
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

    await sendMail("gauravjsh8@gmail.com", "Information", messages);
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

export const getAllMessages = async (req, res) => {
  try {
    const getAllMessages = await ContactMessage.find({});
    if (getAllMessages.length === 0)
      return res.status(404).json({ message: "No message received yet!!!" });
    return res.status(200).json({ result: getAllMessages });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
