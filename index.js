// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
}



const express=require("express");
let app=express();
const mongoose = require('mongoose');
const path=require("path");
let port=3030;
let methodOverride = require('method-override')
let ejsMate=require("ejs-mate");
const flash=require("connect-flash");


const ExpressError=require("./utils/ExpressError.js")

const session=require("express-session");
//this same thing passed in the two ways
//const MongoStore = require('connect-mongo').default;////MongoDB session store for Connect and Express written in Typescript.
const {MongoStore} = require('connect-mongo');


//const {reviewSchema}=require("./schema.js")

const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");

const passport=require("passport");//Passport is Express-compatible authentication middleware for Node.js.
const LocalStrategy=require("passport-local");//Passport strategy for authenticating with a username and password

const User=require("./Models/user.js");

const userRouter=require("./routes/user.js");// for  get Signup 


// let MONGO_URL="mongodb://127.0.0.1:27017/wanderLust";
let dburl=process.env.ATLASDB_URL;

main()
.then(()=>{
    console.log("COnnected to the DB");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    mongoose.connect(dburl);
}

app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs" );
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.json());

const store= MongoStore.create({
    mongoUrl:dburl,
    crypto:{
        secret:process.env.SECRET,
    },
   touchAfter:24*3600,
});

store.on("error",()=>{
    console.log("Error in the Mongo SESSION Store",err);
});

const sessionOptions = {
   store ,// this is for the above varibale passed to store 
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:1000*60*60*24*3,
    httpOnly:true
    }
};


app.use(session(sessionOptions));
app.use(flash());// we will  have to use before the routes

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));// Generates a function that is used in Passport's LocalStrategy

passport.serializeUser(User.serializeUser());//Generates a function that is used by Passport to serialize users into the session
passport.deserializeUser(User.deserializeUser());// Generates a function that is used by Passport to deserialize users into the session

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    //console.log(res.locals.success);
        res.locals.error=req.flash("error");
      res.locals.currUser=req.user;
    next();
})




app.use("/listings",listingRouter);//(/listings is the common path ) but listings is  which u required
app.use("/listings/:id/review",reviewRouter);//(/listings/:id/review is the common path ) but review is  which u required.

app.use("/",userRouter);


//(.*)->"/{*splat}" * is the oldest version so its not taking that why spalt is the newer version
app.all("/{*splat}",(req,res,next)=>{
 next(new ExpressError(404,"Page Not Found"));
});
app.use((err,req,res,next)=>{
    // we can throw the error  but 
    let {statusCode=500,message="Something Went Crazy Wrong"}=err;
    //res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{message});
});
app.get("/",(req,res)=>{
    res.send("Working"); 
  // res.render("");
});



app.listen(port,(req,res)=>{
    console.log("app is listening");
});