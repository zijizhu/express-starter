import { model, Schema, Model, Document } from 'mongoose';

interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

export const UserModel: Model<UserDocument> = model('User', userSchema);
