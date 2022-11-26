const mongoose=require('mongoose');
const postSchema = new mongoose.Schema({
    name: String,
    subject: String,
    email: String,
    fee: String,
    difficulty: String,
    content: String,
  });
const Post = mongoose.model('Post',postSchema);
module.exports=Post;