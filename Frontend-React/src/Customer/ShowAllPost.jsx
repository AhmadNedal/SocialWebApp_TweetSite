import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginPage from '../Share/LoginPage';
import Error from '../Share/Error';
import ChatLoading from '../Share/ChatLoading';
import URL from '../ConnectDataBase';
import { Heart } from "lucide-react";
import FetchAllPost from './FetchAllPost';


const ShowAllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigator = useNavigate();

  useEffect(()=>{
     if  (localStorage.getItem("from") == "true"){
      window.location.reload();
       localStorage.setItem("from" ,false) ;
    }
  },[])

  useEffect(() => {
    localStorage.setItem("UserLogin",JSON.stringify(JSON.parse(localStorage.getItem("UserLogin"))));

    axios.get(`${URL}/showAll`) 
      .then(response => {
        setPosts(response.data.reverse()); 
        setLoading(false);
      })
      .catch(err => {
        setError(err.message); 
        setLoading(false); 
      });
  }, []); 


  
  const IsLike = (post)=>{
    const IdClicked =JSON.parse(localStorage.getItem("UserLogin"))._id ;
        const newArray = post.Like.filter((e)=>{
        return e!= IdClicked; 
    })
       return newArray.length== post.Like.length ; 
  }


  

  if (JSON.parse(localStorage.getItem("UserLogin"))== null ) {
    return <LoginPage/> 
  }


    
  if (error  || JSON.parse(localStorage.getItem("UserLogin"))==null   ) {
      return (<Error/>)
    }

    if (loading){
      return (<ChatLoading/>);
    }


  
  return (
    <div className="bg-gray-800 text-white min-h-screen">
      
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
            <span>{JSON.parse(localStorage.getItem("UserLogin")).name}</span>
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
          
          <h1 className="text-3xl font-bold cursor-pointer" onClick={()=> {
            navigator("/");
          }}>المقالات</h1>
        
        </div>
      </header>
      
    <div className="max-w-4xl mx-auto p-4">
      <div className="space-y-6 ">

          <div className='flex justify-center items-center flex-col'>
        <button style={{borderColor:"white" , border:"solid" ,borderRadius:"8px" , padding:"7px" , transition:"0.2s" , textAlign:"center" , width:`30%`} } className='hover:bg-white hover:text-gray-900 ' onClick={()=>{
          navigator("/AddPost") ; 
        }}>اضافة تغريدة </button>

        </div>

        {
        
        
        posts.map(post => (
          <>
        <FetchAllPost post={post} Likee={IsLike(post) }/>

     </>
        
        ))}
        

        </div>
      </div>
    </div>
  );


};

export default ShowAllPosts;
