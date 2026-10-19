  
  
  
  const express=require("express");
  const router=express.Router();
  const wrapAsync=require("../utils/wrapAsync.js");
  // const ExpressError=require("../utils/ExpressError.js")
  // const {listingSchema,reviewSchema}=require("../schema.js")
  const Listing=require("../Models/list.js")
  const {isLoggedin,isOwner,validateListing}=require("../middleware.js");

  //const { index } = require("../controllers/listing.js");// this is for the Controlller Middleware
  const listingController = require("../controllers/listing.js");
// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.

// NOTE: Multer will not process any form which is not multipart (multipart/form-data).
const multer  = require('multer')// to parse the form data
const {storage}=require("../cloudConfig.js");
const upload = multer({storage}); //it will upload in the cloudinary storage


  //this is the compact form of  GEt Request of Index Route and the post request of the Create Route

  router
  .route("/")
  .get(wrapAsync(listingController.index))//it required the index form the listingController 
   .post(isLoggedin,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing));
  
  

  // New and Create Route 

  router.get("/new",isLoggedin,
    //console.log(req.user);// for this  we will get the User  info about Email and Username
   listingController.renderNewForm
  );

  //  //this is the compact form of  GEt Request of show Route and the put request of the update Route && delete Route

  router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))// // its for Show Route Means Read 
  .put(isLoggedin,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.updateListing))// its for the Update route
  .delete(isLoggedin,
    isOwner,
    wrapAsync(listingController.destroyListing));//its for the Delete Route








 
  

// Index Route
//router.get("/",wrapAsync(listingController.index));// it required the index form the listingController 

// New and Create Route 
// router.get("/new",isLoggedin,
//     //console.log(req.user);// for this  we will get the User  info about Email and Username
//    listingController.renderNewForm
//   );

// Show Route Means Read 
// router.get("/:id",wrapAsync(listingController.showListing));

// Create Route 

//router.post("/",isLoggedin,validateListing,wrapAsync(listingController.createListing));

// Edit Route

router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(listingController.renderEditForm));

// Update Route

// router.put("/:id",isLoggedin,isOwner,validateListing,wrapAsync(listingController.updateListing));

/// Delete Route

// router.delete("/:id",isLoggedin,isOwner,wrapAsync(listingController.destroyListing));

module.exports=router;