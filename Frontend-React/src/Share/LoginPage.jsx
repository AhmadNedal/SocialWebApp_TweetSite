import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function LoginPage() {

  const[pass, setPass] = useState(""); 
  const[email, setEmail] = useState("");
  const [hint , setHint ] = useState("") ;
  const navigate = useNavigate() ; 

  const info = { 
    email : email, 
    password :pass 
  }

  const HandelLogin =async (e)=>{
    
    if ( email.trim()!="" &&pass.trim()!="" && email.indexOf('@')!=-1) {
      axios.post('http://localhost:3001/Login', {...info}).then((res)=>{
      setHint("تم تسجيل الدخول بنجاح "); 
      localStorage.setItem("UserLogin",JSON.stringify(res.data.user))
      console.log ( "res.data = " ,res.data.user);
      navigate('/personPage' , {state:res.data.user});

    }).catch((err)=>{
        setHint("الايميل او كلمة المرو خطأ")
    })
  }else {
      setHint("الرجاء تعبة الحقول بشكل صحيح")
  }

  }


  return (
    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 h-screen flex justify-center items-center">
    <form className="bg-white p-8 rounded-lg m-4 shadow-lg w-full sm:w-96 flex flex-col space-y-4"
    >
      <h1 className="text-2xl font-semibold text-center text-gray-800">Login</h1>

      <input
        type="email"
        name="email"
        required
        value={email}
        onChange={(e)=>{
          setEmail(e.target.value)
        }}
        placeholder="Email"
        className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="password"
        name="pass"
        required
        value={pass}
        onChange={(e)=>{
          setPass(e.target.value)
        }}
        placeholder="Password"
        className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <p className="font-medium text-xs m-10 text-red-500">{hint}</p>
      
      <button
        type="submit"
        className="bg-indigo-500 text-white p-3 rounded-lg font-semibold hover:bg-indigo-600 focus:outline-none"
        
        onClick={(e) => {
          e.preventDefault();
          HandelLogin();
        }}

        >
        Login
      </button>
        <p onClick={()=> {
          navigate("/SignUp")
        }} className="font-medium flex justify-center w-full text-xs text-blue-500 cursor-pointer hover:underline">تسجيل حساب جديد</p>
    </form>
  </div>
  )
}

export default LoginPage
