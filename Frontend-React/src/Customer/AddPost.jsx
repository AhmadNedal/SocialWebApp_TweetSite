import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from '../Share/LoginPage';
import URL from '../ConnectDataBase';

function AddPost() {
  const [header, setHeader] = useState("");
  const [title, setTitle] = useState("");
  const navigator = useNavigate();

  
    if (JSON.parse(localStorage.getItem("UserLogin"))== null ) {
       return <LoginPage/> 
    }


  const addPost = (postData) => {
    axios 
      .post(`${URL}/Add`, postData)
      .then((response) => {
        navigator("/");
      })
      .catch((error) => {
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const Object = {
      header: header,
      title: title,
      nameOwner: JSON.parse(localStorage.getItem("UserLogin")).name,
      owner: JSON.parse(localStorage.getItem("UserLogin"))._id,
      // Like :"" ,
    };
    addPost(Object);
  };

  return (
    <div className="bg-gray-800 w-full min-h-screen">
      
      
      <header className="bg-gray-900 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={()=> {
          const ele = document.getElementById("ShowOrNotNav") ;

              if ( ele.style.display == "none") {
                ele.style.display ="flex"
              }else {
                ele.style.display ="none" ;
              }

        }}>
            <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center">
              <span className="text-xl align-middle  text-white">{JSON.parse(localStorage.getItem("UserLogin")).name[0]}</span>
            </div>
            <span className='text-white'>{JSON.parse(localStorage.getItem("UserLogin")).name}</span>
          </div>

          <div id='ShowOrNotNav' style={{position:"absolute",width:"155px",height:"100px", display:"none",justifyContent:"center" , alignItems:"center",flexDirection:"column",gap:"10px",borderRadius:"10px" , background:"white" , top:"65px", right:"75px"}}>
              <h6 className='text-black text-sm cursor-pointer' onClick={()=> {
                navigator("/PersonPage" , {state: JSON.parse(localStorage.getItem("UserLogin")) });
              }}>عرض ملفي الشخصي</h6>
              <h6 className='text-black text-sm cursor-pointer' onClick={()=> {
                localStorage.setItem("UserLogin" , false ); 
                navigator("/LoginPage") ; 
              }}>تسجيل الخروج</h6>

          </div>
          
          <h1 className="text-3xl text-white font-bold cursor-pointer" onClick={()=> {
            navigator("/");
          }}>المقالات</h1>
        
        </div>
      </header>
    

      <div className="flex justify-center items-center py-10">
        <form
          className="bg-gray-700 flex flex-col justify-center items-center gap-6 rounded-lg p-6 shadow-lg w-full sm:w-96"
          onSubmit={handleSubmit}
        >
          <h1 className="text-white text-3xl mb-4">اضافة منشور</h1>

        
          <input
            placeholder="العنوان"
            className="w-11/12 sm:w-9/12 p-3 rounded-lg text-center text-lg placeholder-gray-400 text-white bg-gray-600 border-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            required
          />


          <textarea
            placeholder="التفاصيل"
            className="w-11/12 sm:w-9/12 p-3 rounded-lg text-center text-lg placeholder-gray-400 bg-gray-600 border-none focus:outline-none text-white focus:ring-2 focus:ring-indigo-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Submit Button */}
          <button
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold transition duration-200 hover:bg-indigo-700 focus:outline-none"
            type="submit"
          >
            اضافة المنشور
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPost;
