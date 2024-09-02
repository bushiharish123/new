import express from 'express';
import { registerValidation, loginValidation, validate } from '../utils/validate';
import { register, login, getSports } from '../controllers/authController';
import Sport from '../models/Soprts';

const router = express.Router();
console.log("Hello in routes")
router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.get('/', async (req, res) => {  
      // Send a message back to the client
      res.send('MongoDB connected successfully!');
    
  });
// router.get('/getSportsDetails',getSports)
router.get('/sports',getSports);
router.post('/insert-sports', async (req, res) => {
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
