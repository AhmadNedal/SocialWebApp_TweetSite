import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../Share/Loading ';
import Error from '../Share/Error';
import URL from '../ConnectDataBase';

const AllUser = () => {
  
  const [allUsers, setAllUsers] = useState([]); 
  const [Loading, setLoding ] = useState(true); 
  const [error, setError ] = useState(false); 
  const navigator = useNavigate() ; 

  useEffect(()=> { 
    axios.get(`${URL}/AllUser`).then((userr)=>{
      setAllUsers(userr.data.reverse()); 
      console.log ( "All userr.data.reverse()= " , userr.data.reverse()) ; 
      setLoding(false ); 
    }).catch((err)=> { 
      setError(true) ;
      setLoding(false ); 
    })
  },[]) ; 


  if ( Loading) {
      return ( <LoadingPage/>)
  }

  if (error || !(JSON.parse(localStorage.getItem("UserLogin")).isAdmin )) {
    return <Error/>
  }

  const handleEdit = (user) => {
    navigator("/EditeUser" , {state:user}) ;
    };

  const handleDelete = (id) => {
      axios.delete(`${URL}/Admin/deleteAllPost`,  { data: {id} })
        .then(() => {
        })
        .catch((error) => {
          console.error('Error adding post:', error);
        });
        
        axios.delete(`${URL}/Admin/deleteUser`,  { data: {id} })
        .then(() => {
        })
        .catch((error) => {
          console.error('Error adding post:', error);
        });
  
  };


  if ( error ){
    return (<Error/>)
  }

  return (

    <>
    
    
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

          <div id='ShowOrNotNav' style={{position:"absolute",width:"155px",height:"100px", display:"none",justifyContent:"center" , alignItems:"center",flexDirection:"column",gap:"10px",borderRadius:"10px" , background:"white" , top:"65px", right:"25px"}}>
              <h6 className='text-black text-sm cursor-pointer' onClick={()=> {
                navigator("/PersonPage" , {state: JSON.parse(localStorage.getItem("UserLogin")) });
              }}>عرض ملفي الشخصي</h6>
                { (JSON.parse(localStorage.getItem("UserLogin")).isAdmin) ?  <h6 className='text-black text-sm cursor-pointer' onClick={()=> {
                navigator("/AllUser") ; 
              }}>عرض المستخدمين</h6> :<></> }
              <h6 className='text-red-800 text-sm cursor-pointer' onClick={()=> {
                localStorage.setItem("UserLogin" , null ); 
                navigator("/LoginPage") ; 
              }}>تسجيل الخروج</h6>
            


          </div>
          
          <h1 className="text-3xl font-bold text-white cursor-pointer" onClick={()=> {
            navigator("/");
          }}>المقالات</h1>
        
        </div>
      </header>
      
  
    <div className="container mx-auto p-4">

      
      <h1 className="text-3xl font-semibold mb-4">قائمة المستخدمين</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 text-left">الاسم</th>
            <th className="py-3 px-4 text-left">البريد الإلكتروني</th>
            <th className="py-3 px-4 text-left">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map(user => (
            <tr key={user._id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">{user.name}</td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4">


                <div className='flex gap-2 justify-center items-center' >
              <button
                  onClick={() => {
                    navigator("/PersonPage" , {state: user });
                  }}
                    className="bg-gray-600  hover:bg-gray-500 text-white px-4 py-2 text-sm rounded-lg font-semibold transition duration-300"
                >
                  عرض
                </button>


                <button
                  onClick={() => handleEdit(user)}
                  className="bg-blue-500 text-white py-1 px-3 rounded-md "
                >
                  تعديل
                </button>

                <button  disabled = {  user._id == JSON.parse(localStorage.getItem("UserLogin"))._id  }
                  onClick={() => {
                      handleDelete(user._id) 
                      let newArray = allUsers.filter((e)=>e._id!=user._id);
                      setAllUsers(newArray); 
                  }}
                  className={`bg-red-500 text-white py-1 px-3 rounded-md ${user._id == JSON.parse(localStorage.getItem("UserLogin"))._id ? "opacity-55" : "opacity-100"}`}
                >
                  حذف
                </button>

            
                </div>


              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default AllUser;
