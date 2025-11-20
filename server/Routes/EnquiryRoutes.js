import express from 'express'
const EnquiryRoute = express.Router();
import { SigninValidation , LoginValidation } from '../Middleware/Enquiry.Middleware.js';
import { SignUp, Login , Welcome} from '../Controller/EnquiryController.js';



EnquiryRoute.post("/signup", SigninValidation, SignUp);
EnquiryRoute.post("/login", LoginValidation, Login);
EnquiryRoute.get("/",  Welcome);



export default EnquiryRoute;