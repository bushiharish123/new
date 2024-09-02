import mongoose, { Document, Schema } from 'mongoose';

interface ISport extends Document {
  name: string; // Each document represents a single sport
}

const SportSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true }, // Each document stores a single sport name
});

const Sport = mongoose.model<ISport>('Sport', SportSchema);

export default Sport;
