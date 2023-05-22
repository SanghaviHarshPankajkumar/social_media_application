
import jwt from 'jsonwebtoken';
const test = 'test';
const auth = (req,res,next)=>{
  try {
    console.log("inside the middleware");
    
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
      // const token = req.headers.authorization.split("")[1];
  
      const isCustomAuth = token.length<500;
      // console.log(isCustomAuth);
      let decodeData ;
      if(isCustomAuth){
          decodeData = jwt.verify(token,'keySecreate');
          console.log(decodeData);
          req.userId = decodeData?.id;
  
      }
      else{
          decodeData  = jwt.decode(token);
          req.userId = decodeData?.sub;
      }
        next();
  } catch (error) {
    console.log(error);
  }
}

export default auth;