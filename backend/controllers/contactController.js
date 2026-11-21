import Contact from '../models/contactModel.js';

// @desc    Create a new contact message
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, trekInterest, referral, message } = req.body;

    if (!name || !email || !phone || !message) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    const contactMsg = new Contact({
      name,
      email,
      phone,
      trekInterest,
      referral,
      message,
    });

    const createdMsg = await contactMsg.save();
    res.status(201).json(createdMsg);
  } catch (error) {
    next(error);
  }
};
