import mongoose from 'mongoose';

const itinerarySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  distance: { type: String, required: true },
  description: { type: String, required: true },
});

const trekSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    tagline: { type: String, required: true },
    region: { type: String, required: true },
    difficulty: { type: String, required: true },
    duration: { type: Number, required: true },
    maxAltitude: { type: Number, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    rating: { type: Number, required: true, default: 0 },
    reviewCount: { type: Number, required: true, default: 0 },
    groupSize: { type: String, required: true },
    bestSeason: { type: String, required: true },
    image: { type: String, required: true },
    gallery: [{ type: String }],
    highlights: [{ type: String }],
    included: [{ type: String }],
    excluded: [{ type: String }],
    overview: { type: String, required: true },
    itinerary: [itinerarySchema],
    featured: { type: Boolean, default: false },
    badge: { type: String },
  },
  {
    timestamps: true,
  }
);

const Trek = mongoose.model('Trek', trekSchema);

export default Trek;
