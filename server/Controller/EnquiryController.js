import { EnquiryFormModel } from "../Model/Enquiry.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Welcome = (req, res) => {
    res.send("Welcome to Enquiry API");
}

const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const enquiry = await EnquiryFormModel.findOne({ email });
    if (enquiry) {
      return res
        .status(409)
        .json({ message: "User Already Exist", success: false });

    }
    const EnquiryForms = new EnquiryFormModel({ name , email ,password });
    EnquiryForms.password = await bcrypt.hash(password, 10);
    await EnquiryForms.save();
    res
      .status(201)
      .json({ message: "Sign In successfully", success: true });
  } 
  
  catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};





const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const enquiry = await EnquiryFormModel.findOne({ email });
    if (!enquiry) {
      return res
        .status(403)
        .json({ message: "Auth Failed Email & Pass Wrong", success: false });

    }
    const isPasswordValid = await bcrypt.compare(password, enquiry.password);
    if (!isPasswordValid) {
      return res
        .status(403)
        .json({ message: "Auth Failed Email & Pass Wrong", success: false });
    }
    const jwtToken = jwt.sign({ email: enquiry.email, id: enquiry._id }, process.env.JWT_SECRET,{ expiresIn: "1h" });

    res
      .status(200)
      .json({ message: "Login successfully", success: true, token: jwtToken, email: enquiry.email, name: enquiry.name });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export { SignUp , Login , Welcome};
