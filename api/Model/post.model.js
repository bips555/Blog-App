import mongoose, { Mongoose, Schema } from "mongoose";

const PostSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    default:
      "https://contenthub-static.grammarly.com/blog/wp-content/uploads/2017/11/how-to-write-a-blog-post.jpeg",
  },
  category: {
    type: String,
    default: "uncategorized",
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
},{timestamps:true});


const PostModel = mongoose.model('Post',PostSchema)

export default PostModel