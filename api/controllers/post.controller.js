import PostModel from "../Model/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a post."));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(403, "Please provide all the fields"));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const newPost = new PostModel({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json({
      success: true,
      post: savedPost,
    });
  } catch (error) {
    next(error);
  }
};
export const getPosts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await PostModel.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug : req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalPosts = await PostModel.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await PostModel.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};

export const deletepost = async (req, res, next) => {
  if (!req.user.isAdmin || !req.user.id === req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this  post."));
  }

  try {
    await PostModel.findByIdAndDelete(req.params.postId);
    res.status(200).json("The post has been deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const updatepost = async (req, res, next) => {
  if (!req.user.isAdmin || !req.user.id === req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this  post."));
  }

  try {
    const updatedPost = await PostModel.findByIdAndUpdate(req.params.postId, {
      $set: {
        title: req.body.title,
        category: req.body.category,
        content: req.body.content,
        image: req.body.image,
      }
    },{new:true})
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};
