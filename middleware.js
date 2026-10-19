const Listing=require("./Models/list.js");
const ExpressError=require("./utils/ExpressError.js")
const {listingSchema,reviewSchema}=require("./schema.js");
const Review=require("./Models/review.js")

//This function is for the  authencaite the user wheather the user is loggen in or not to create the list 
module.exports.isLoggedin=(req,res,next) =>{
    ///console.log(req.user);
 if(!req.isAuthenticated()){
    req.session.redirectUrl=req.originalUrl;
        req.flash("error","You Must be logged In to Create the New Listing");
        return res.redirect("/login");
    }
    next();
}
module.exports.savedRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next(); 
}
module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);

    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","Your are not the Owner of the listing");
        return res.redirect(`/listings/${id}`);
}
next();
}

// this is for the server side 
 module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        // jo error ke sath details aati hai usko extract karne ke liye we use map 
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

/// this is for the validation for the  Review

 module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        // jo error ke sath details aati hai usko extract karne ke liye we use map 
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};


module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);

    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error","Your are not the Author of the  this review");
        return res.redirect(`/listings/${id}`);
}
next();
}
