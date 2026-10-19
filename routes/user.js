const express=require("express");
const router=express.Router();
const User=require("../Models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport=require("passport");
const { savedRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

// this all route are the compact form of get route of sigup and post request of signup

router
    .route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup));


   // This all ROute of the User route compact of get request of login form and postrequest of login 
router
    .route('/login')
    .get(userController.renderLoginForm)
    .post( savedRedirectUrl,
  passport.authenticate('local',
     { failureRedirect: '/login' ,
    failureFlash:true,
    }),
    userController.login
   );

   router.get("/logout",userController.logout)

module.exports=router;












/// this Route is for The Signup  Page

//router.get("/signup",userController.renderSignupForm);

//router.post("/signup",wrapAsync(userController.signup));

///router.get("/login",userController.renderLoginForm);

//Passport provides an authenticate() function, which is used as route middleware to authenticate requests.
//router.post('/login', savedRedirectUrl,
//   passport.authenticate('local',
//      { failureRedirect: '/login' ,
//     failureFlash:true,
    
// }),
// userController.login
//    );

//   router.get("/logout",userController.logout)

// module.exports=router;