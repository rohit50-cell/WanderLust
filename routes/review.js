const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js")
const {reviewSchema}=require("../schema.js")// listingSchema is the joy schema so we can remove 
const Review=require("../Models/review.js")
const Listing=require("../Models/list.js")
const {validateReview,isLoggedin, isReviewAuthor}=require("../middleware.js");
const reviewController = require("../controllers/review.js");

// Review
// Post 

// app.post("/listings/:id/review",async(req,res)=>{
//   let ReviewList=await Listing.findById(req.params.id);/// I took Reviewlist that is wrong that will not pring the data of commment and rating so down this block of code correct variable is taken  
//    // to create New Review 
//    let newReview=new Review(req.body.review);
//   ReviewList.reviews.push(newReview);
//   await newReview.save();
//   await ReviewList.save();
//  //res.send("New Review Saved");
// //   console.log("New Review Saved");
//   //res.send("New Review Saved");
//   res.redirect(`/listings/${ReviewList.id}`);
// });
//// Valadation is being Inherited Here  for the Revieww

router.post("/",isLoggedin,validateReview,wrapAsync(reviewController.createReview));

// Delete Review Post Route
router.delete("/:reviewId",isLoggedin,isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports=router;