// routes/authRoutes.ts

import express from 'express';
import  { Request, Response } from 'express';
import { registerValidation, loginValidation, validate } from '../utils/validate';
import { register, login, getSports, searchByName, logout, uploadProfilePicture, searchByNameForAgent, getRecommendedUser, getRecommendedForAgent, ratingForAgent, ratingForAthlet, getAthletRatings, getAgentRatings } from '../controllers/authController';
import { verifyToken } from '../middleware/authMiddleware'; // Import the middleware
import Sport from '../models/Soprts';
import multer, { StorageEngine } from 'multer';
import path from 'path';
import User from '../models/User';

const router = express.Router();

router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.post('/agentRating',verifyToken,ratingForAgent);
router.post('/athletRating',verifyToken,ratingForAthlet);

// Apply the `verifyToken` middleware to protect these routes
router.get('/sports', getSports);
router.get('/athletSearch', verifyToken, searchByName);
router.get('/agentSearch', verifyToken, searchByNameForAgent);
router.get('/logout', verifyToken, logout);
router.get('/recommendations',verifyToken,getRecommendedUser);
router.get('/recommendationsForAgent',verifyToken,getRecommendedForAgent);
router.get('/getAthletRating',verifyToken,getAthletRatings);
router.get('/getAgentRating',verifyToken,getAgentRatings)

// router.post('/uploadProfilePic', upload.single('profilePic'), uploadProfilePicture)

const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Add a timestamp to the filename
  },
});


const upload = multer({ storage });
interface UpdateUserProfileRequest extends Request {
  body: {
    email: string; // Use email instead of userId
    firstName?: string;
    lastName?: string;
    achievements?: string;
    futureGoals?: string;
  };
  file?: Express.Multer.File; // Include the file type for Multer
}
// Update user profile with image upload
router.put('/profile', upload.single('profilePic'), async (req: UpdateUserProfileRequest, res: Response) => {
  const { email, firstName, lastName, achievements, futureGoals } = req.body;
  const profilePic = req.file ? req.file.path : undefined; // Get the uploaded file path

  try {
    // Find user by email and update the fields
    const updatedUser = await User.findOneAndUpdate(
      { email }, // Search by email
      {
        firstName,
        lastName,
        achievements,
        futureGoals,
        ...(profilePic && { profilePic }), // Only include profilePic if it was uploaded
      },
      { new: true, runValidators: true } // Return the updated document
    ).select('firstName lastName achievements futureGoals profilePic email age height gender sports school isAthlet');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the updated fields
    res.json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: (error as Error).message });
  }
});
router.post('/insert-sports', verifyToken, async (req, res) => {
  // Example route to insert sports, protected by the middleware
  const sports = [
    { name: 'Soccer' },
    { name: 'Basketball' },
    { name: 'Baseball' },
    { name: 'Tennis' },
    { name: 'Cricket' },
    { name: 'Rugby' },
    { name: 'Hockey' },
    { name: 'Golf' },
    { name: 'Volleyball' },
    { name: 'Table Tennis' },
    { name: 'Badminton' },
    { name: 'American Football' },
    { name: 'Swimming' },
    { name: 'Boxing' },
    { name: 'Martial Arts' },
    { name: 'Cycling' },
    { name: 'Athletics' },
    { name: 'Gymnastics' },
    { name: 'Skiing' },
    { name: 'Snowboarding' },
    { name: 'Surfing' },
    { name: 'Horse Racing' },
    { name: 'Fencing' },
    { name: 'Rowing' },
    { name: 'Sailing' },
    { name: 'Skateboarding' },
    { name: 'Snooker' },
    { name: 'Archery' },
    { name: 'Triathlon' },
    { name: 'Wrestling' },
    { name: 'Handball' },
    { name: 'Weightlifting' },
    { name: 'Rock Climbing' },
    { name: 'Esports' },
    { name: 'Motorsport' }
  ];

  try {
    const result = await Sport.insertMany(sports);
    res.status(201).json({ message: `${result.length} sports have been inserted successfully.` });
  } catch (error) {
    console.error('Error inserting sports:', error);
    res.status(500).json({ message: 'Failed to insert sports.', error });
  }
});

export default router;
