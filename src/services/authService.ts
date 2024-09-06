// services/authService.ts

import User from '../models/User';
import UserAsAgent from '../models/UserAsAgent';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Sport from '../models/Soprts';

dotenv.config();

interface RegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  height:number;
  gender:string;
  sports: string[];
  futureGoals?:string;
  achievements?:string;
  isAthlet?: boolean;
}
interface registerUserAsAgent {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  professionalBackground:string;
  descriptions:string;
  specialization:string
  isAthlet?: boolean;
}

export const registerUser = async (userData: RegisterUser) => {
  // Check if a user already exists with the same firstName and lastName (case-insensitive)
  const existingUser = await User.findOne({
    email: { $regex: new RegExp(`^${userData.email}$`, "i") }
  });

  if (existingUser) {
    throw new Error("User with the same email already exists.");
  }

  const user = new User(userData);
  return await user.save();
};
export const registerUserAsAgent = async(userData: registerUserAsAgent)=>{
  const existingUser = await UserAsAgent.findOne({
    email: { $regex: new RegExp(`^${userData.email}$`, "i") }
  });

  if (existingUser) {
    throw new Error("User as agent with the same email already exists.");
  }

  const user = new UserAsAgent(userData);
  return await user.save();
}


export const loginUser = async (email: string, password: string,isAthlet:boolean) => {
  const user = isAthlet?await User.findOne({ email }):await UserAsAgent.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await user.matchPassword(password);
  if (!isMatch) throw new Error('Invalid credentials');

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, isAthlet: user.isAthlet },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  return { token, userDetails: user };
};

export const sportsList = async (req: any, res: any) => {
  try {
    const sportsList = await Sport.find(); // Query to get all sports documents
    console.log('List Of Sports', JSON.stringify(sportsList));
    res.json(sportsList); // Send the sports list as JSON
  } catch (error) {
    throw new Error("User with the same email already exists.");
    }
};

export const searchByNames = async (req: any) => {
  let user;
  if (req.body.firstName) {
    const firstName = req.body.firstName;
    user = await User.findOne({ firstName });
  } else if (req.body.lastName) {
    const lastName = req.body.lastName;
    user = await User.findOne({ lastName });
  } else if (req.body.email) {
    const email = req.body.email;
    user = await User.findOne({ email });
  }

  if (!user) throw new Error('User not found');
  console.log(user);
  return user;
};
