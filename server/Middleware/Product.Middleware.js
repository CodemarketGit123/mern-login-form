import jwt from "jsonwebtoken";

const AuthMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token) {
        return res.status(403).json({ message: "Failed authenticated Require token", success: false });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){
        return res.status(401).json({ message: "Jwt Server Error", success: false });
    }
}

export { AuthMiddleware };