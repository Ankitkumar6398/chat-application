import cookieParser from 'cookie-parser';
import jwt from "jsonwebtoken";
const isAuth = async(req, res, next) => {
    try{
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: 'No token provided'
            })
        }
        const decode = await jwt.verify(token, process.env.SECRET);
        if (!decode) {
            return res.status(401).json({
                message: 'No decode provided',
            })
        }
        req.id = decode.userId;
        next();

    }catch(error){
        console.log(error);

    }
}

export default isAuth;

const req = {
    id:"",
}
req.id = "qwerty"