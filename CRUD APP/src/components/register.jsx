import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name,setName]=useState("");
    const navigate = useNavigate();
    const [age,setAge]=useState();
    const HandleSubmit = (e)=>{
        e.preventDefault();
        axios.post("http://localhost:5000/register",{
            name,
            age
        }).then(()=>{
            alert("User Registered");
            navigate("/dashboard");

        }).catch((err)=>{
            console.log(err);
        });
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100" onSubmit={HandleSubmit}>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create Account</h2>

        {/* Input 1: Username */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
          <input
            type="text"
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
            placeholder="johndoe123"
          />
        </div><br/>

      
    
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
          <input
            type="number"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Your Age"
          />
        </div><br/>

        <button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg active:transform active:scale-[0.98]"
        >
          Register
        </button>

        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account? <a href="#" className="text-blue-600 hover:underline">Log in</a>
        </p>
      </form>
    </div>
  );
};

export default Register;