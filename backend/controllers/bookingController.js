import Booking from '../models/bookingModel.js';

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public
export const createBooking = async (req, res, next) => {
  try {
    const { trekId, travelers, date, addOns, contactInfo } = req.body;

    if (!trekId || !travelers || !date || !contactInfo || !contactInfo.name || !contactInfo.email || !contactInfo.phone) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    const booking = new Booking({
      trek: trekId,
      travelers,
      date,
      addOns,
      contactInfo,
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    next(error);
  }
};
