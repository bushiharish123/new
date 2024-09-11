import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IuserAsAgent extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    professionalBackground:string;
    descriptions:string;
    specialization:string[];
    profilePic?: string;
    isAthlet?: boolean;
  matchPassword(password: string): Promise<boolean>;
}

const UserAsAgentSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  professionalBackground:{ type: String, required: false },
  descriptions:{ type: String, required: false },
  specialization:{type: [String], required: false},
  isAthlet: { type: Boolean, default: false },
  profilePic: { type: String, required: false }
});

UserAsAgentSchema.pre<IuserAsAgent>('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err:any) {
    next(err);
  }
});

UserAsAgentSchema.methods.matchPassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const UserAsAgent = mongoose.model<IuserAsAgent>('UserAsAgent', UserAsAgentSchema);

export default UserAsAgent;
