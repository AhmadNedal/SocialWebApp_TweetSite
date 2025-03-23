import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Error from '../Share/Error';
import LoginPage from '../Share/LoginPage';
import axios from 'axios';

function PersonPage() {
  const location = useLocation();
  const navigator = useNavigate();
  const user =location.state;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    

  useEffect(() => {
    axios.get('http://localhost:3001/showAll') 
      .then(response => {
        let arr = response.data.filter((e)=> {
          if (info.id == e.owner ){
            return true; 
          }
          return false ;
        }); 
        setPosts(arr) ;
        setLoading(false);
      })
      .catch(err => {
        setError(true); 
        setLoading(false); 
      });
  }, []); 




    const deletePost = (postData) => {
      axios.delete('http://localhost:3001/delete',  { data: postData })
        .then((response) => {
          console.log('Post added:', response.data);
        })
        .catch((error) => {
          setError(true); 
          console.error('Error adding post:', error);
        });
    };


    if (error ) {
      return (<h1>Erorrr </h1>)
    }


    
    const info ={ 
      name: user.name,
      email: user.email,
      password: user.password,
      id: user._id,
      bio: user.bio,
    }

  if (user == null) {
    user = JSON.parse(localStorage.getItem("UserLogin"));
  }

  if (user == null) {
    return <LoginPage />;
  }





  


  return (
    
    user == null ? (<h1>Error</h1>) :

    (
      
    
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
    

    
    
      <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center py-10">

      
      {user == null ? (
        <></>
      ) : (
          <>      

        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full sm:w-96 flex flex-col items-center space-y-6">          
          <div className="relative">
            
            <img
              src= {(user.email)=="ahmadnedall80@gmail.com" ?
                "https://avatars.githubusercontent.com/u/174232349?s=400&u=72cc4ccbcf4f1076f1f66b2c8f8f49be0263b6a6&v=4" :
                "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"
              } 
              alt="User Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 rounded-full"></div>
          </div>

          <div className='flex flex-col justify-center items-center'>
          <h1 className="text-3xl font-semibold  text-white">{info.name}</h1>
          <p className="text-sm text-gray-500 italic">{info.email}</p>
          <p className="text-lg text-gray-300 mt-5 ">Bio : {info.bio}</p>

          </div>

          <button onClick={() => navigator('/EditePeronPage', { state: user })}


            className= {`
            bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300`} 
            
            style={{display:(JSON.parse(localStorage.getItem("UserLogin"))._id!=user._id)? "none":"block" }}

            >
            تعديل الملف الشخصي
            
            </button>
        



        {posts.map(post => (
          <>
        <div key={post._id} className="bg-gray-700 shadow-lg rounded-lg p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-gray-100">{post.header}</h2>
              <p className="text-gray-300">{post.title}</p>
              <div className="flex justify-between items-center text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center">
                    <span className="text-lg text-white">{post.nameOwner[0]}</span>
                  </div>
                  <span>{post.nameOwner}</span>
                </div>
                <span>{new Date(post.createdAt).toLocaleString()}</span>
              </div>

              <form >
              
              <input name='id' hidden value={post._id} />
              {JSON.parse(localStorage.getItem("UserLogin"))._id == post.owner && (
                <div className="flex  w-full gap-3 justify-center">
                <button onClick={(e) => {
                    e.preventDefault(); 
                    localStorage.setItem("Edite" , false);
                    navigator("/EditePost" , {state:post}) ; 

                 }}
                        className="bg-red-400 hover:bg-red-600 text-white px-2 text-sm rounded-lg font-semibold transition duration-300">
                  عرض
                </button>

                <button onClick={(e) => { e.preventDefault();
                      localStorage.setItem("Edite" , true);
                      navigator("/EditePost" , {state:post}) ;
                }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm rounded-lg font-semibold transition duration-300">
                  تعديل
                </button>
                <button onClick={(e) => { e.preventDefault(); deletePost({ id: post._id, title: post.title }); window.location.reload() }}
                        className="bg-red-600 hover:bg-red-700 text-white px-2 text-sm rounded-lg font-semibold transition duration-300">
                  حذف
                </button>
              </div> 
            )}


            </form> 

            </div>


  
     </>
        
        ))}
        



        </div>
        </>
        )}
    </div>
    </>
    
    )

  );
}

export default PersonPage;
