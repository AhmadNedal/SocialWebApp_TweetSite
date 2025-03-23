import './App.css';
import ShowAllPosts from './Customer/ShowAllPost';
import AddPost from './Customer/AddPost';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditePost from './Customer/EditePost';
import PersonPage from './Customers/PersonPage';
import LoginPage from './Share/LoginPage';
import Error from './Share/Error';
import SignUp from './Share/SignUp';
import AllUser from './Admin/AllUser';
import EditeUser from './Admin/EditeUser';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoadingPage from './Share/Loading ';
import EditePeronPage from './Customer/EditePeronPage';

function App() {
  
    const [Logding, setLoding ] = useState(true); 
    const [error, setError ] = useState(false); 
  
  useEffect(()=>{

    if ( JSON.parse(localStorage.getItem("UserLogin"))!=null ) {
      const id =JSON.parse(localStorage.getItem("UserLogin"))._id; 
      axios.get('http://localhost:3001/getUser' , 
        {params: { id }}
      ).then((userr)=>{
        localStorage.setItem("UserLogin",JSON.stringify(userr.data.user)) ; 
        setLoding(false ); 
      }).catch((err)=> { 
        setError(true) ;
        setLoding(false ); 
      })
  
    }else {
      setLoding(false ); 

    }
  
  },[])


  if ( Logding ) {
    return <LoadingPage/>
  }
  if ( error ) {
    return <LoadingPage/>
  }

  
  return (
<>

    <BrowserRouter>
      <Routes>


        <Route path="/"  element={JSON.parse(localStorage.getItem("UserLogin"))==null ?  <LoginPage/> : <ShowAllPosts/>} />
        <Route path="/AddPost"  element={<AddPost/>} />
        <Route path="/EditePost"  element={<EditePost/>} />
        <Route path="/PersonPage"  element={<PersonPage/>} />
        <Route path="/LoginPage"  element={<LoginPage/>} />
        <Route path="/Error"  element={<Error/>} />
        <Route path="/SignUp"  element={<SignUp/>} />
        <Route path="/AllUser"  element={<AllUser/>} />
        <Route path="/EditeUser"  element={<EditeUser/>} />
        <Route path="/EditePeronPage"  element={<EditePeronPage/>} />


      </Routes>
    </BrowserRouter>
      
</>
  );
}

export default App;
