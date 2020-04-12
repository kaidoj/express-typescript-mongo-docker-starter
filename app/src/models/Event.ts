import mongoose from "mongoose";

export const STATUS_PUBLIC = "public";
export const STATUS_PRIVATE = "private";

export interface EventDocument extends mongoose.Document {
  title: string;
  startTime: Date;
  endTime: Date;
  status: string;
}

export const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startTime: { type: Date, required: true},
  endTime: { type: Date, required: true},
  status: { type: String, default: STATUS_PRIVATE}
}, { timestamps: true });

const Event = mongoose.model<EventDocument>("Event", EventSchema);

export default Event;
