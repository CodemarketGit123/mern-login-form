import React , { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { notifyError , notifySuccess } from './Utilies';

export default function Login() {


    const [logininfo, setLogininfo] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const newLogininfo = { ...logininfo, [name]: value };
    setLogininfo(newLogininfo);
  }
   console.log(logininfo);

  const navigate =  useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = logininfo;
    if ( !email || !password) {
      return notifyError("All fields are required");
    }

    try{
       const response = await fetch ("http://localhost:2000/login" , {
        method: "POST", 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(logininfo)
       });
       const data = await response.json();
       console.log("Login Successful:", data);
       const {success, message, error, token, name} = data;
       if(success){
         notifySuccess(message);
         localStorage.setItem("token", token);
         localStorage.setItem("loggedInUser", name);
         setTimeout(() => {
           navigate("/dashboard");
         }, 1000);
       }
       else if(error){
          notifyError(error);
       }
       else if(!success){
         notifyError("Login failed. Please try again.");
       }
       setLogininfo({
        email: "",
        password: ""
       });

    } catch (error) {
      console.log("Error during Login:", error);
    }
  }


  return (
       <>
    <div className='bg-white-600 h-[100vh] flex flex-col justify-center items-center text-black text-[20px] w-[100%]'>
    <div className='text-3xl font-bold'>Welcome to the Login Page!</div>
    <div>
      <form onSubmit={handleLogin} className='flex flex-col mt-4 text-black border-b-gray-950 border-2 rounded-2xl p-6 bg-white shadow-xl/20' >
        <input type="email" name="email" onChange={handleChange} value={logininfo.email} autoFocus  className="bg-red-secondary-medium border rounded-2xl text-heading text-sm rounded-base focus:ring-brand focus:border-brand block  p-3 shadow-xs placeholder:text-body m-3" placeholder="Enter Your Email" required />
        <input type="password" name="password" onChange={handleChange} value={logininfo.password} autoFocus  className="bg-red-secondary-medium border rounded-2xl text-heading text-sm rounded-base focus:ring-brand focus:border-brand block p-3 shadow-xs placeholder:text-body m-3" placeholder="Enter Your Password" required />
        <button type="submit"  className='bg-blue-500 text-white p-2 rounded-3xl m-3 cursor-pointer'>Log In</button>
        <p>Don't have an account? <Link to="/signup" className="text-indigo-600 text-sm">Sign up</Link></p>
      </form>
    </div>
    <ToastContainer />
    </div>
    </>
  )
}
