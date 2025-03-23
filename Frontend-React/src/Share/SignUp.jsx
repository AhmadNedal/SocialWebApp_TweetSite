import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();

  const [hint , setHint] =useState(""); 


  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    bio: '' , 
    isAdmin : false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const addUser = (postData) => {

    if (userData.password.trim().length<7){
      setHint("كلمة السر يجب ان تكون اكثر من 8 احرف")

    }else {
    axios
      .post('http://localhost:3001/AddUser', postData)
      .then((response) => {
        console.log('User added:', response.data);
        navigate("/LoginPage");
      })
      .catch((error) => {
        console.error('Error adding user:', error);
        setHint("حدث خطأ الرجاء التأكد من المعلومات المُدخلة")
      });

    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 h-screen flex justify-center items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addUser(userData);
        }}
        className="bg-white p-8 rounded-lg m-4 shadow-lg w-full sm:w-96 flex flex-col space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-800">Register</h1>

        <input
          type="text"
          name="name"
          required
          value={userData.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="email"
          name="email"
          required
          value={userData.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="password"
          name="password"
          required
          value={userData.password}
          onChange={handleInputChange}
          placeholder="Password"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          name="bio"
          value={userData.bio}
          onChange={handleInputChange}
          placeholder="Bio"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
         <p className="font-medium text-xs m-10 text-red-500">{hint}</p>
        <button
          type="submit"
          className="bg-indigo-500 text-white p-3 rounded-lg font-semibold hover:bg-indigo-600 focus:outline-none"
        >
          Register
        </button>

        <p onClick={()=> {
          navigate("/LoginPage")
        }} className="font-medium flex justify-center w-full text-xs text-blue-500 cursor-pointer hover:underline">تسجيل الدخول</p>

      </form>
    </div>
  );
}

export default SignUp;
