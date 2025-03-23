import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginPage from '../Share/LoginPage';
import URL from '../ConnectDataBase';

function EditPost() {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state;

  const [header, setHeader] = useState(post?.header || '');
  const [title, setTitle] = useState(post?.title || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let EditeOrShow = localStorage.getItem("Edite") ; 
  if ( EditeOrShow == "true"){
    EditeOrShow= true ;
  }else {
    EditeOrShow = false;
  }

  if (!JSON.parse(localStorage.getItem("UserLogin"))) {
    return <LoginPage />;
  }


  
  const ShowUser = (e)=>{
    setLoading(true);
    axios.get(`${URL}/ShowUser/${e}`) 
      .then(res => {
        navigate("/PersonPage" , {state:res.data}) ; 
        setLoading(false);
      })
      .catch(err => {
        setError(err.message); 
        setLoading(false); 
      });
    }

    

  const handleEditPost = async () => {
    setLoading(true);
    setError(null);

    const updatePost = {
      _id: post._id,
      title:title,
      header:header,
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.put(`${URL}/EditeP/${post._id}`, {updatePost});
        navigate('/');
        setLoading(false);
    } catch (err) {
      setError('حدث خطأ أثناء التحديث. حاول مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

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

          <div id='ShowOrNotNav' style={{position:"absolute",width:"155px",height:"100px", display:"none",justifyContent:"center" , alignItems:"center",flexDirection:"column",gap:"10px",borderRadius:"10px" , background:"white" , top:"65px",right:"25px"}}>
              <h6 className='text-black text-sm cursor-pointer' onClick={()=> {
                  const ele = document.getElementById("ShowOrNotNav") ;
                  if ( ele.style.display == "none") {
                    ele.style.display ="flex"
                  }else {
                    ele.style.display ="none" ;
                  }
                  navigate("/PersonPage" , {state: JSON.parse(localStorage.getItem("UserLogin")) });
              }}>عرض ملفي الشخصي</h6>
              <h6 className='text-black text-sm cursor-pointer' onClick={()=> {
                localStorage.setItem("UserLogin" , null ); 
                navigate("/LoginPage") ; 
              }}>تسجيل الخروج</h6>

          </div>
          
          <h1 className="text-3xl text-white font-bold cursor-pointer" onClick={()=> {
            navigate("/");
          }}>المقالات</h1>
        
        </div>
      </header>
  
  
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">{EditeOrShow ? "تعديل المنشور" : post.header}</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={(e)=>e.preventDefault()}>
          <input 
          style={{ display: !EditeOrShow?"none":"block" }}
            disabled={!EditeOrShow}
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="عنوان المنشور" 
            value={header} 
            onChange={(e) => setHeader(e.target.value)}
          />
          <textarea 
            disabled={!EditeOrShow}
            style={{minHeight:"150px"}}
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="المحتوى" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
          />
          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition duration-300"
              onClick={(e)=> {
                e.preventDefault() ; 
                  if ( EditeOrShow) { 
                    handleEditPost();
                  }else {
                      navigate("/"); 
                  }
              }}
          >
            {!EditeOrShow ?  "رجوع" : loading ? 'جارٍ التحديث...' : 'تحديث المنشور'}
          </button>
        </form>


                <br/>

        <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-600 flex items-center justify-center rounded-full text-xl font-bold text-white cursor-pointer"  
                onClick={() => ShowUser(post.owner)}
                
                >
                
                  {post.nameOwner[0]}
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{post.nameOwner}</h2>
                  <p className="text-gray-400 text-sm">{new Date(post.createdAt).toLocaleString()}</p>
                </div>
              </div>
              

      </div>
    </div>

    </>

  );
}

export default EditPost;
