import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingPage from '../Share/Loading ';
import Error from '../Share/Error';
import URL from '../ConnectDataBase';

function EditePeronPage() {
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
      navigate('/PersonPage' ,{state:userData} );
    } catch (err) {
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

export default EditePeronPage;
