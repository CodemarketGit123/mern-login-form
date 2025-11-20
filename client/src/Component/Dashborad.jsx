import React , { useEffect, useState } from "react";
import { notifySuccess } from './Utilies';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function Dashborad() {
  const [loggedInUser , setLoggedInUser ] = useState("");
  const [product , setProduct] = useState("");

  useEffect(() =>{
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, []);
  

  const navigate = useNavigate();

   const handleLogout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    notifySuccess('User Logged Out');
    setTimeout(()=>{
     navigate('/login');
    }, 1000)
   }

  

   const ProductFetch = async () =>{

       try{
        const url = 'http://localhost:2000/api/product'; 
         const headers = {
          headers :{
          "Authorization" : localStorage.getItem('token')
          }
         }
         const response = await fetch (url, headers); 
         const result = await response.json();
         console.log(result.products);
         setProduct(result.products);
        } catch (error) {
          console.log( error);
      }
   }
  

   useEffect(()=>{
     ProductFetch()
   } ,[])

    return (
      <>
      <div className="bg-white-600 h-[100vh] flex flex-col justify-center items-center text-black text-[20px] w-[100%] bg-cyan-950">
    <div className="text-[28px] font-bold text-white">Dashboard</div>
    <h1 className="bg-gray-700 text-white p-3 border rounded-2xl m-2">Hello {loggedInUser}, Welcome to the Product Dashboard !</h1>
    <div className="mt-4 bg-gray-700 text-white p-3 m-2 border rounded-3xl">
        {
          product.length > 0 ? (
            product.map((item, index) => (
              <ul key={index}>
                <li>
                  {item.name} : {item.price}
                </li>
              </ul>
            ))
          ) : (
            <p>No products found</p>
          )
        }
      </div>
    <ToastContainer />
        <button className='bg-amber-400 text-amber-950 p-3 border rounded-2xl m-2 cursor-pointer shadow-lg shadow-neutral-500/50' onClick={handleLogout}>Logout</button>
    </div>
    </>
  )
}
