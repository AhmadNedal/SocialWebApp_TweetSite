import axios from 'axios';
import { Heart } from 'lucide-react';
import React, { useState } from 'react'
import URL from '../ConnectDataBase';
import { useNavigate } from 'react-router-dom';

function FetchAllPost({post,Likee}) {
  // const IsLike = useState(false);
  const [Loading,setLoading] = useState(false);
  const [IsLikedd,setIsLikedd] = useState(Likee);
  const [numLike, setNumLike] =useState(post.Like.length); 
  const navigator  = useNavigate();


  const ShowUser = (e)=>{
    axios.get(`${URL}/ShowUser/${e}`) 
      .then(res => {
        navigator("/PersonPage" , {state:res.data}) ; 
        setLoading(false);
      })
      .catch(err => {
        // setError(err.message); 
        setLoading(false); 
      });
    }

      const deletePost = (postData) => {
          axios.delete(`${URL}/delete`,  { data: postData })
            .then((response) => {
            })
            .catch((error) => {
            });
        };
        
        const IsLike = (post)=>{
          const IdClicked =JSON.parse(localStorage.getItem("UserLogin"))._id ;
              const newArray = post.Like.filter((e)=>{
              return e!= IdClicked; 
          })
             return newArray.length== post.Like.length ; 
        }

    return (
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
              
              <div className="flex  w-full gap-3 justify-between">
                

                

              <div 
                  onClick={()=>{
                      const IdClicked =JSON.parse(localStorage.getItem("UserLogin"))._id ;
                      const newArray = post.Like.filter((e)=>{
                        return e!= IdClicked; 
                      });
                      if (newArray.length== post.Like.length){
                        newArray.push(IdClicked) ;  
                      }
                      const newPost = {...post}; 
                      newPost.Like =newArray; 
                      axios.post(`${URL}/AddLike` , {newPost}) 
                    .then(res => {
                      setLoading(false);
                    })
                    .catch(err => {
                      setLoading(false); 
                    });
                    if (!IsLikedd ){
                      setNumLike(numLike-1);
                    }else {
                      setNumLike(numLike+1);
                    }
                    setIsLikedd(!IsLikedd);
                }}
                className='bg-red-600 rounded-xl mt-2 gap-1 hover:bg-red-500 cursor-pointer w-fit py-2 px-4 flex justify-center items-center '>
                      <h1 style={{marginRight:"5px" , padding:"0px" ,fontWeight:"bold"} }>{numLike} </h1>
                      <Heart size={20} fill= {
                        IsLikedd?"red":"white" 
                      } className="transition duration-300" />
                  </div>


                
               {(JSON.parse(localStorage.getItem("UserLogin"))._id == post.owner)|| (JSON.parse(localStorage.getItem("UserLogin")).isAdmin)?(<>

              

                <div className='flex  w-full gap-3 justify-end'>
                  
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



              </div>  




            </form> 

            </div>


  )
}

export default FetchAllPost
