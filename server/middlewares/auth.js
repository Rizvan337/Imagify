import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    // const token = req.headers['token'] || req.headers['authorization'];
    const authHeader = req.headers['authorization'];
if (!authHeader || !authHeader.startsWith('Bearer ')) {
  return res.status(401).json({ success: false, message: "Unauthorized access. Login again" });
}
const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({success: false, message: "Unauthorized access.Login again"});
    }
    try{
        const tokenDecode =  jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecode.id){
            req.userId = tokenDecode.id;  
        }else{
            return res.status(401).json({success: false, message: "Unauthorized access.Login again"});
        }
        next(); 
    }catch(error) {
        console.log(error);
        return res.status(500).json({success: false, message:error.message});
    }
}
export default userAuth;