// function wrapAsync(fn){
//    return function(req,res,next){
//        fn(req,res,next).catch(next);
//     }
// }
// it can convert into the arrow function
module.exports =(fn)=>{
    return (req,res,next) =>{
        fn(req,res,next).catch(next);
    };
};