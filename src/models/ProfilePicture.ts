// models/ProfilePicture.ts
import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the ProfilePicture document
interface IProfilePicture extends Document {
  email: string;
  imagePath: string;
  uploadedAt: Date;
}

// Define the schema for the ProfilePicture model
const ProfilePictureSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true }, // User's email
  imagePath: { type: String, required: true }, // File path of the stored image
  uploadedAt: { type: Date, default: Date.now }, // Timestamp of the upload
});

// Export the ProfilePicture model
const ProfilePicture = mongoose.model<IProfilePicture>('ProfilePicture', ProfilePictureSchema);
export default ProfilePicture;
