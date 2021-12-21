import { model, Schema, Model, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  dob: Date;
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: false }
});

export const UserModel: Model<IUser> = model('User', userSchema);
