import React , { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { notifyError , notifySuccess } from './Utilies';

export default function SignUp() {
  
  const [signupinfo, setSignupinfo] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const newSignupinfo = { ...signupinfo, [name]: value };
    setSignupinfo(newSignupinfo);
  }
   console.log(signupinfo);

  const navigate =  useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupinfo;
    if (!name || !email || !password) {
      return notifyError("All fields are required");
    }

    try{
       const response = await fetch ("http://localhost:2000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(signupinfo)
       });
       const data = await response.json();
       console.log("Sign up successful:", data);
       const {success, message, error} = data;
       if(success){
         notifySuccess(message);
         setTimeout(() => {
           navigate("/login");
         }, 1000);
       }
       else if(error){
          notifyError(error);
       }
       else if(!success){
         notifyError("Sign up failed. Please try again.");
       }
       setSignupinfo({
        name: "",
        email: "",
        password: ""
       });

    } catch (error) {
      console.log("Error during sign up:", error);
    }
  }


    return (
    <>
    <div className='bg-white-600 h-[100vh] flex flex-col justify-center items-center text-black text-[20px] w-[100%]'>
    <div className='text-3xl font-bold'>Welcome to the Sign Up Page!</div>
    <div>
      <form onSubmit={handleSignUp} className='flex flex-col mt-4 text-black border-b-gray-950 border-2 rounded-2xl p-6 bg-white shadow-xl/20' >
        <input type="text" name='name' autoFocus onChange={handleChange} value={signupinfo.name} className="bg-red-secondary-medium border rounded-2xl text-heading text-sm rounded-base focus:ring-brand focus:border-brand block  p-3 shadow-xs placeholder:text-body m-3" placeholder="Enter Your Name"  />
        <input type="email" name='email' autoFocus onChange={handleChange} value={signupinfo.email} className="bg-red-secondary-medium border rounded-2xl text-heading text-sm rounded-base focus:ring-brand focus:border-brand block  p-3 shadow-xs placeholder:text-body m-3" placeholder="Enter Your Email"  />
        <input type="password" name='password' autoFocus  onChange={handleChange} value={signupinfo.password} className="bg-red-secondary-medium border rounded-2xl text-heading text-sm rounded-base focus:ring-brand focus:border-brand block p-3 shadow-xs placeholder:text-body m-3" placeholder="Enter Your Password"  />
        <button type="submit" className='bg-blue-500 text-white p-2 rounded-3xl m-3 cursor-pointer'>Sign Up</button>
        <p>Already have a Account? <Link to="/login" className="text-indigo-600 text-sm">Log in</Link></p>
      </form>
    </div>
    <ToastContainer />
    </div>
    </>
  )
}
