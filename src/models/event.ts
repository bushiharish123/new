import mongoose, { Document, Schema } from 'mongoose';

// Define the TypeScript interface for an Event document
interface IEvent extends Document {
  schedulerUser: string; // The user who schedules the event
  receiverUser: string; // The user who receives the event invitation
  eventDate: Date; // The date and time of the event
}

// Define the Event schema
const EventSchema: Schema = new Schema({
  schedulerUser: { type: String, required: true }, // The user who schedules the event
  receiverUser: { type: String, required: true }, // The user who receives the event invitation
  eventDate: { type: Date, default: Date.now } // The date of the event, defaults to current date
});

// Create the Event model
const EventCreate = mongoose.model<IEvent>('EventCreate', EventSchema);

export default EventCreate;
