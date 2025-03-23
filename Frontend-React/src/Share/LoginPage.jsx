import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoadingPage from './Loading ';
import URL from '../ConnectDataBase';

function LoginPage() {

  const[pass, setPass] = useState(""); 
  const[email, setEmail] = useState("");
  const [hint , setHint ] = useState("") ;
  const [Loading , setLoading ] = useState("") ;
  const navigate = useNavigate() ; 

  const info = { 
    email : email, 
    password :pass 
  }

  

  const HandelLogin =async (e)=>{
    setLoading(true); 
    if ( email.trim()!="" &&pass.trim()!="" && email.indexOf('@')!=-1) {
      
      axios.post(`${URL}/Login`, {...info}).then((res)=>{
        localStorage.setItem("UserLogin",JSON.stringify(res.data.user));
        localStorage.setItem("from" , "true") ;
        setHint("تم تسجيل الدخول بنجاح "); 
      setLoading(false); 
      navigate('/');

    }).catch((err)=>{
        setHint("الايميل او كلمة المرو خطأ")
      setLoading(false); 
    })
  }else {
      setHint("الرجاء تعبة الحقول بشكل صحيح") ;
      setLoading(false); 
  }

  }


  if ( Loading ) {
    return <LoadingPage/>
  }


  if ( localStorage.getItem("from") == "true"){
    
    navigate("/"); 
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
        
        onClick={async (e) => {
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
