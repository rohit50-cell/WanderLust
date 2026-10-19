const User=require("../Models/user.js");

//This is for the Get Request for the Signup

module.exports.renderSignupForm=(req,res)=>{
    res.render("user/signup.ejs");
}

// THis is for the Post route for the signup route  for the user  

module.exports.signup=async(req,res) => {
    try{
        let {username,email,password}=req.body;
    const newUser=new User({email,username});
   const registeredUser=await User.register(newUser,password);
  // console.log(registeredUser);
  req.login(registeredUser,(err)=>{
    if(err){
        return next(err);
    }
    req.flash("success","Welcome to the WanderLust");
    res.redirect("/listings");
  });
   
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
    
};

// This is for the Get Request for the Login 

module.exports.renderLoginForm=(req,res)=>{
    res.render("user/login.ejs");
}

// this is the Post request for the login 
module.exports.login=async(req, res)=> {
    req.flash("success","Welcome back to the Wanderlust !");
    let redirectUrl=res.locals.redirectUrl ||"/listings";
    res.redirect(redirectUrl);
  }

  module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{// logout take callback as a parameter
        if(err){
            return next(err);
        }
    req.flash("success","You are now Logged out");
    res.redirect("/listings");
    });
    
  }
