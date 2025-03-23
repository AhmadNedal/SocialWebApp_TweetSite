const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
app.use(express.json()); 
app.use(cors()); 


const Posts = require("./models/Post.js");
const User = require("./models/User.js");



  app.get("/showall", (req,res)=> {
    Posts.find() 
      .then((post) => {      
        res.json(post) ;
      })
      .catch((err) => {
        res.status(500).send("Internal Server Error");
      });
    })


    app.post("/Add", (req, res) => {
      const Post = new Posts(req.body);
      Post
        .save()
        .then((result) => {
          res.status(201).json({
            message: "Post added successfully",
            post: result,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            message: "An error occurred while adding the post",
            error: err,
          });
        });
      });
      

      app.delete('/delete' , (req,res,next)=>{
        const id = req.body.id;
        Posts.deleteOne({_id:id})
        .then(() => {
          res.status(201).json({
            message: "Reomove Post Successfully",
            post: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "An error while Remove the post",
            error: err,
          });
        });
      })




      app.get("/Edite/:UserId", (req,res)=> {
        Posts.findOne({ _id:req.params.UserId} , req.body.newPost) 
          .then((user) => {
            res.json(user) ;
            })
          .catch((err) => {
            console.log(err);
          });
        })


        app.post("/AddLike" , (req,res)=> { 
          const {newPost} =req.body; 

          Posts.updateOne({_id:newPost._id} , newPost).then((post)=>{

            res.status(201).json({
              message: "Update Post Successfully",
              post: result,
            });
        

          }).catch((err)=> {
            console.log (err ); 
            res.status(500).json({
              message: "An error while Update the post",
              error: err,
            });
            })



        })




        app.put('/EditeP/:UserId' , (req,res,next)=>{
          const updatedPost = req.body.updatePost;
          console.log ( "updatedPost = " , updatedPost )
          Posts.updateOne({_id:req.params.UserId} , { $set:updatedPost})
          .then((result) => {
            res.status(201).json({
              message: "Update Post Successfully",
              post: result,
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: "An error while Update the post",
              error: err,
            });
          });
        })



        

    
        app.post("/Login", async (req, res) => {
          const { email, password } = req.body;
          try {
            const user = await User.findOne({ email, password });
            if (!user) {
              return res.status(404).json({ message: "User not found or incorrect password" });
            }
        
            res.status(200).json({ message: "Login successful", user });
          } catch (err) {
            res.status(505).json({ message: "Server error", error: err.message });
          }
        });
        



        

    app.post("/AddUser", (req, res) => {
      const Userr = new User(req.body);
      Userr
        .save()
        .then((result) => {
          res.status(201).json({
            message: "User added successfully",
            User: result,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            message: "An error occurred while adding the post",
            error: err,
          });
        });
      });
    


      
      app.get("/ShowUser/:UserId", (req,res)=> {
        User.findOne({ _id:req.params.UserId} , req.body.newPost) 
          .then((user) => {
            res.json(user) ;
            })
          .catch((err) => {
            console.log(err);
          });
        }) ; 


        
  app.get("/AllUser", (req,res)=> {
    User.find() 
      .then((user) => {      
        res.json(user) ;
      })
      .catch((err) => {
        console.log (err);
        res.status(500).send("Internal Server Error");
      });
    }) ;




      

    app.delete('/Admin/deleteAllPost' , (req,res,next)=>{
      const {id } = req.body;
      Posts.deleteMany({ owner: id })
      .then(() => {
        res.status(201).json({
          message: "Reomove All Post Successfully",
          post: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "An error while Remove the All Post",
          error: err,
        });
      });
    })



      app.delete('/Admin/deleteUser' , (req,res,next)=>{
        const id = req.body.id;
        User.deleteOne({_id:id})
        .then(() => {
          res.status(201).json({
            message: "Reomove User Successfully",
            post: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "An error while Remove the User",
            error: err,
          });
        });
      })



      

      app.put('/Admin/EditeUser/:UserId' , (req,res,next)=>{
        const {userData}= req.body;
        console.log ( "userData = " , userData )
        User.updateOne({_id:req.params.UserId} , { $set:userData})
        .then((result) => {
          res.status(200).json({
            message: "Update Post Successfully",
            post: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "An error while Update the post",
            error: err,
          });
        });
      });
      
      app.get('/getUser' , ( req,res,next)=>{
        const id = req.query.id;
        console.log ("id = " , id ) ;

        User.findOne({_id:id})
        .then((user) => {
            res.json({user}) ;
        })
        .catch((err) => {
          res.status(500).json({
            message: "An error while Update the post",
            error: err,
          });
        });
      });
      









  

  mongoose
  .connect("mongodb+srv://ahmadnedal:u5dZ4JUtz23RZOgr@newtest.kx49b.mongodb.net/?retryWrites=true&w=majority&appName=newTest", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3001, () => {
      console.log("Port Is Listening");
    });
  })
  .catch((err) => {
    console.log(err);
  });

