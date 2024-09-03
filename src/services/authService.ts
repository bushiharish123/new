import User from '../models/User';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Sport from '../models/Soprts';

dotenv.config();

interface RegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAthlet?: boolean;
}

export const registerUser = async (userData: RegisterUser) => {
  const user = new User(userData);
  return await user.save();
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await user.matchPassword(password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign(
    { id: user._id, isAthlet: user.isAthlet },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  return { token, isAthlet: user.isAthlet };
};
export const sportsList = async (req:any,res:any)=>{
  try {
    const sportsList = await Sport.find(); // Query to get all sports documents
    // res.send('MongoDB connected successfully!');
    console.log('List Of Sports',JSON.stringify(sportsList))
    // res.send(sportsList)
    res.json(sportsList); // Send the sports list as JSON

  } catch (error) {
    res.status(500).json({ message: 'Error retrieving sports', error });
  }
}
