const mongoose= require("mongoose");
const initData=require("./data.js");
const Listing=require("../Models/list.js");

let MONGO_URL="mongodb://127.0.0.1:27017/wanderLust";

main()
.then(()=>{
    console.log("COnnected to the DB");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    mongoose.connect(MONGO_URL);
}

const initDB=async()=>{
    await Listing.deleteMany({});
   initData.data= initData.data.map((obj)=>({...obj,owner:"6ac9e13239c3a4418a6c79f0"}));
    await Listing.insertMany(initData.data);
    console.log("Data Was Initialized");
}
initDB();
