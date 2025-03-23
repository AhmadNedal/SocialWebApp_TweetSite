import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingPage from '../Share/Loading ';
import Error from '../Share/Error';
import URL from '../ConnectDataBase';

function EditeUser() {
  const navigate = useNavigate();
  const [hint , setHint] =useState(""); 
  const location = useLocation() ; 
  const user = location.state;
  const [Loading, setLoading ] = useState(false); 
  const [error, setError ] = useState(false); 



  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    password: user.password,
    bio: user.bio , 
    isAdmin : user.isAdmin
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  

  

  const UpdateUser = async () => {
    setLoading(true);
    setError(null);

  

    try {
      await axios.put(`${URL}/Admin/EditeUser/${user._id}`, {userData});
      navigate('/AllUser');
    } catch (err) {
      console.log ( "Erroro rro oror " ) ;
      setError('حدث خطأ أثناء التحديث. حاول مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };



  if ( Loading ) {
    return <LoadingPage/>
  }
  if (error ) {
    return <Error/>
  }

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 h-screen flex justify-center items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          UpdateUser(userData);
        }}
        className="bg-white p-8 rounded-lg m-4 shadow-lg w-full sm:w-96 flex flex-col space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-800">تعديل</h1>

        <input
          type="text"
          name="name"
          required
          disabled={true}
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


      <label className={` ${( JSON.parse(localStorage.getItem("UserLogin"))._id!=user._id)?"opacity-100":"opacity-40"}  flex items-center space-x-2 cursor-pointer`}>
        <input
          type="checkbox"
          name='isAdmin'
          checked={userData.isAdmin}
          onChange={() =>  {
            if ( JSON.parse(localStorage.getItem("UserLogin"))._id!=user._id){
            const newUserData ={...userData}; 
            newUserData.isAdmin=!newUserData.isAdmin; 
            setUserData(newUserData)
          }
          

          }}
          className="hidden peer"
        />
        <div className="w-6 h-6 border-2 border-gray-400 rounded-md flex items-center justify-center peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all">
          {userData.isAdmin && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <span className="text-gray-700 text-lg font-medium">اجعله أدمن ؟</span>
      </label>

        


         <p className="font-medium text-xs m-10 text-red-500">{hint}</p>
        <button
          type="submit"
          className="bg-indigo-500 text-white p-3 rounded-lg font-semibold hover:bg-indigo-600 focus:outline-none"
        >
          تعديل
        </button>




      
      </form>
    </div>
  );
}

export default EditeUser;
