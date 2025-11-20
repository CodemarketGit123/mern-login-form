import mongoose from "mongoose";

const EnquiryFormData = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
})

export const EnquiryFormModel = mongoose.model("formEnquiry" , EnquiryFormData)
