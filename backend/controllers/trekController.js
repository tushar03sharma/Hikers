import Trek from '../models/trekModel.js';

// @desc    Fetch all treks with filtering/sorting
// @route   GET /api/treks
// @access  Public
export const getTreks = async (req, res, next) => {
  try {
    const { category, difficulty, sort } = req.query;

    let query = {};

    // Filter by category (from badge/tagline or highlights, mapping frontend categories)
    if (category && category !== 'All') {
      // Basic mapping, assuming category name matches region or is in highlights
      // In a real app we'd have a specific category field
      if (['Uttarakhand', 'Himachal Pradesh'].includes(category)) {
        query.region = category;
      } else {
        query.badge = { $regex: category, $options: 'i' };
      }
    }

    // Filter by difficulty
    if (difficulty && difficulty !== 'All') {
      query.difficulty = difficulty;
    }

    // Build query
    let mongooseQuery = Trek.find(query);

    // Sorting
    if (sort) {
      if (sort === 'price_asc') {
        mongooseQuery = mongooseQuery.sort('price');
      } else if (sort === 'price_desc') {
        mongooseQuery = mongooseQuery.sort('-price');
      } else if (sort === 'rating_desc') {
        mongooseQuery = mongooseQuery.sort('-rating');
      } else if (sort === 'duration_desc') {
        mongooseQuery = mongooseQuery.sort('-duration');
      } else {
        // default 'popular' sort
        mongooseQuery = mongooseQuery.sort('-reviewCount');
      }
    } else {
      mongooseQuery = mongooseQuery.sort('-reviewCount');
    }

    const treks = await mongooseQuery;
    res.json(treks);
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch single trek by slug
// @route   GET /api/treks/:slug
// @access  Public
export const getTrekBySlug = async (req, res, next) => {
  try {
    const trek = await Trek.findOne({ slug: req.params.slug });

    if (trek) {
      res.json(trek);
    } else {
      res.status(404);
      throw new Error('Trek not found');
    }
  } catch (error) {
    next(error);
  }
};
