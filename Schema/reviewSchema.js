const mongoose=require('mongoose');
const reviewSchema = new mongoose.Schema({
    name: String,
    image: String,
    con: String,
  });
const Review = mongoose.model('Review',reviewSchema);
module.exports=Review;