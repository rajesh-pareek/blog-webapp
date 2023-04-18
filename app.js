//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose=require("mongoose");


const homeStartingContent = "We write to taste life twice, in the moment and in retrospect.";
const aboutContent = "Accept responsibility for your life. Know that it is you who will get you where you want to go, no one else.";
const contactContent = "Accept responsibility for your life. Know that it is you who will get you where you want to go, no one else.";


mongoose.connect("mongodb+srv://rajeshpareekdevo:ZtFXTVFswLyOCwxn@cluster0.olrsf8b.mongodb.net/blogDB", { useNewUrlParser: true });


const postSchema=mongoose.Schema({
  title: String,
  content:String
});
const Post=mongoose.model("Post",postSchema);



const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){

  var posts=[];
  Post.find({}).then(function(foundItems){
    res.render("home", {
      startingContent: homeStartingContent,
      posts:foundItems
      });
      console.log("We are loggig : ",foundItems);
  }).catch(function(err){
    res.redirect("/");
  });


  

  

  
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){

  res.render("compose");
});

app.post("/compose", function(req, res){
  
  const post=Post({
    title:req.body.postTitle,
    content:req.body.postBody
  })

  post.save().then(function(response){
    res.redirect("/");
  }).catch(function(err){
    console.log(err);

  })
  /* res.redirect("/"); */

});

app.get("/posts/:postId", function(req, res){
  const requestedPostId=req.params.postId;
  Post.findOne({_id:requestedPostId}).then(function(response){
    res.render("post",{
      title:response.title,
      content:response.content
    });

  }).catch(function(err){
    console.log(err);
  })

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
