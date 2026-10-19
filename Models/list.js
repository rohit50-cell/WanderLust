const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");

//const User=require("./user.js");

const listingSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image:{
    //     filename: {
    //   type: String,
    //   default: "listingimage",
    // },
     url:{
        type:String,
        filename:String,
    //     default:"https://preview.redd.it/day-3-of-recreating-random-modern-houses-in-minecraft-v0-veepzecgamk61.jpg?width=1080&crop=smart&auto=webp&s=3fe45fc6e91acfcf1b248f8934063cf151617d24",
    //     set: (v)=> v === "" ? "https://preview.redd.it/day-3-of-recreating-random-modern-houses-in-minecraft-v0-veepzecgamk61.jpg?width=1080&crop=smart&auto=webp&s=3fe45fc6e91acfcf1b248f8934063cf151617d24":v,
    }
},
    price:{
        type:Number,
        default:0
    },
    location:{
        type:String,
        required:true
    },
    country:{
        type:String
    },
    reviews:[
        {
        type:Schema.Types.ObjectId,
        ref:"Review"
    }
],
owner:{
    type:Schema.Types.ObjectId,
    ref: "User",
},
geometry:{
     type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
}
});
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});

const Listing=mongoose.model("Listing",listingSchema);

module.exports=Listing;