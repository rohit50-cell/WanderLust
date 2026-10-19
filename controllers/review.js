const Listing=require("../Models/list.js");
const Review=require("../models/review");

// These all things for the  Review route Controllers

// // Post 
//THis is for the Create
module.exports.createReview=async(req,res)=>{
    console.log(req.params.id);
  let listing=await Listing.findById(req.params.id);
   // to create New Review 
   let newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    //console.log(newReview);
    listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
 //res.send("New Review Saved");
//   console.log("New Review Saved");
  //res.send("New Review Saved");
   req.flash("success"," New Review Given ");
  res.redirect(`/listings/${listing.id}`);
}

module.exports.destroyReview=async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    //it is for the debug 
   //let post= await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}});
  // console.log(post);
   await Review.findByIdAndDelete(reviewId);

    req.flash("success"," Review Deleted ");

    res.redirect(`/listings/${id}`);

}