
const Listing=require("../models/list");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken:mapToken  });
// This is for the Index Route

module.exports.index=async(req,res)=>{
    let allListing=await Listing.find({});
  res.render("index.ejs",{allListing});
}


// This is for the New and Create Route 
module.exports.renderNewForm=(req,res)=>{
     res.render("new.ejs");
}

//this is for the // Show Route Means Read 

module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
   const lisdata= await Listing.findById(id).populate({
    path:"reviews",
    populate:{
        path:"author",
    },
   }).populate("owner");
    // console.log(data);
    if(!lisdata){//if(!listing )is  doesn't not exist
        req.flash("error","Listing which u requested doesn't Exist");
       return res.redirect("/listings");
    }
    //console.log(lisdata);
    res.render("show.ejs",{lisdata});
}


// This is for the Create route Controller
module.exports.createListing=async(req,res,next)=>{
   
//    let result= listingSchema.validate(req.body);
//     console.log(result);
//     if(result.error){
//         throw new ExpressError(400,result.error);
//     }
 let response=await geocodingClient.forwardGeocode({
  query:req.body.listing.location   ,
  limit:1
})
  .send();
//   console.log(response.body.features[0].geometry);this go ddown below before the lisitng.save() in current block of code
  
 
    let url=req.file.path;
    let filename=req.file.filename;
    //console.log(url,"..",filename);
   const newListing=new Listing(req.body.listing);
   console.log(req.user);
   newListing.owner=req.user._id;
   newListing.image={url,filename};
    newListing.geometry=response.body.features[0].geometry;
   let savedListing=await newListing.save()
   // console.log(savedListing);
   req.flash("success","New Listings Created");

     res.redirect("/listings");
  
  
}

// Thsi is for  the Edit Route 
module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
    console.log(id);
    
    const listing=await Listing.findById(id);
    if(!listing){//if(!listing )is  doesn't not exist
        req.flash("error","Listing which u requested doesn't Exist");
       return res.redirect("/listings");
    }
    let originalImageUrl=listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/h_300,w_250/e_blur:300");// here we can remove the height  there will be no any effec on thaaaaaaaaaaaaaaaaat before removing the height that was this "/upload/h_300,w_250/e_blur:300"
    res.render("edit.ejs",{listing,originalImageUrl}); 
    
}

// This is for the update Route

module.exports.updateListing=async(req,res)=>{
    //  if(!req.body ||!req.body.listing){
    //     throw new ExpressError(400,"Send Valid Data for listing");
    // };
let {id}=req.params;

 let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
 
 if(typeof req.file!=="undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
} 
 
 req.flash("success"," Listing updated ");

 res.redirect(`/listings/${id}`);
}

module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    //console.log(id);
    let deletelist= await Listing.findByIdAndDelete(id);
    console.log(deletelist);
     req.flash("success"," Listing Deleted!");
    res.redirect("/listings");
}