import { model, Schema, Model, Document, ObjectId } from 'mongoose';

interface IPost extends Document {
  title: string;
  content: string;
  likes: number;
  likedUsers: ObjectId[];
}

const postSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, required: true },
  likedUsers: { type: [Schema.Types.ObjectId], required: true }
});

export const PostModel: Model<IPost> = model('Post', postSchema);
