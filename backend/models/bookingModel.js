import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    trek: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Trek',
    },
    travelers: { type: Number, required: true },
    date: { type: Date, required: true },
    addOns: {
      porter: { type: Boolean, default: false },
      pickup: { type: Boolean, default: false },
      insurance: { type: Boolean, default: false },
    },
    contactInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      notes: { type: String },
    },
    status: { type: String, default: 'Pending' },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
