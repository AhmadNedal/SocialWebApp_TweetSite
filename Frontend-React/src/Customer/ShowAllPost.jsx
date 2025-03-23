import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginPage from '../Share/LoginPage';

const ShowAllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigator = useNavigate();


  useEffect(() => {
    axios.get('http://localhost:3001/showAll') 
      .then(response => {
        setPosts(response.data.reverse()); 
        setLoading(false);
      })
      .catch(err => {
        setError(err.message); 
        setLoading(false); 
      });
  }, []); 


  

  if (JSON.parse(localStorage.getItem("UserLogin"))== null ) {
    return <LoginPage/> 
  }






    const ShowUser = (e)=>{
      axios.get(`http://localhost:3001/ShowUser/${e}`) 
        .then(res => {
          navigator("/PersonPage" , {state:res.data}) ; 
          setLoading(false);
        })
        .catch(err => {
          setError(err.message); 
          setLoading(false); 
        });
      }
  

    const deletePost = (postData) => {
      axios.delete('http://localhost:3001/delete',  { data: postData })
        .then((response) => {
          console.log('Post added:', response.data);          
        })
        .catch((error) => {
          console.error('Error adding post:', error);
        });
    };

  
  if (error) return <div>Error: {error}</div>;  
  if (loading) return <div>Loading...</div>;



  
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

        {posts.map(post => (
          <>
        <div key={post._id} className="bg-gray-700 shadow-lg rounded-lg p-6 space-y-4">
        <div className="flex items-center gap-3">

                {post.owner == '67dc128eb2517d38db131e23' ?
                 <img
                 onClick={() => ShowUser(post.owner)}

                 style={{width:"60px" , height:"60px",borderRadius:"50%", cursor:"pointer"}}
                 src="https://avatars.githubusercontent.com/u/174232349?s=400&u=72cc4ccbcf4f1076f1f66b2c8f8f49be0263b6a6&v=4"
                 />
                 :
                 <div className="w-10 h-10 bg-gray-600 flex items-center justify-center rounded-full text-xl font-bold text-white cursor-pointer" onClick={() => ShowUser(post.owner)}>
                  {post.nameOwner[0]}
                </div>
                 }

                
                <div>
                  <h3 className="text-lg font-semibold">{post.nameOwner}</h3>
                  <p className="text-gray-400 text-sm">{new Date(post.createdAt).toLocaleString()}</p>
                </div>
              </div>
              
              <h2 className="text-xl font-bold mt-2">{post.header}</h2>
              <p className="text-gray-300 mt-1">{post.title}</p>

              <form onSubmit={(e)=>e.preventDefault()}>
              
              <input name='id' hidden value={post._id} />
               {(JSON.parse(localStorage.getItem("UserLogin"))._id == post.owner)|| (JSON.parse(localStorage.getItem("UserLogin")).isAdmin)?(<>
                
                <div className="flex  w-full gap-3 justify-end">
                <button onClick={(e) => { e.preventDefault(); localStorage.setItem("Edite" , false);   navigator("/EditePost" , {state:post}) ;  }}
                        className="bg-red-400 hover:bg-red-600 text-white px-2 text-sm rounded-lg font-semibold transition duration-300">
                  عرض
                </button>

                <button onClick={() => { localStorage.setItem("Edite" , true);   navigator("/EditePost" , {state:post}) ; }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm rounded-lg font-semibold transition duration-300">
                  تعديل
                </button>
                <button onClick={() => {
                    deletePost({ id: post._id, title: post.title });
                    window.location.reload(true)
                  
                }} className="bg-red-600  hover:bg-red-700 text-white px-2 text-sm rounded-lg font-semibold transition duration-300">
                  حذف
                </button>



              </div>  

                
                </>):<>
                <div className="flex   w-full gap-3 justify-end">
                <button onClick={() => { 
                      localStorage.setItem("Edite" , false);
                      navigator("/EditePost" , {state:post}) ; 
                  
                 }}
                        className="bg-gray-600  hover:bg-gray-500 text-white px-4 py-2 text-sm rounded-lg font-semibold transition duration-300">
                  عرض
                </button>
                </div>

                </> }




            </form> 

            </div>


  
     </>
        
        ))}
        

        </div>
      </div>
    </div>
  );
};

export default ShowAllPosts;
