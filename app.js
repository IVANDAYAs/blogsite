//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");
const mongoose =require("mongoose");
const app = express();
const homeStartingContent = "Medicare is our country's health insurance program for people age 65 or older. Certain people younger than age 65 can qualify for Medicare, too, including those with disabilities and those who have permanent kidney failure.The program helps with the cost of health care, but it does not cover all medical expenses or the cost of most long-term care. You have choices for how you get Medicare coverage. If you choose to have Original Medicare (Part A and Part B) coverage, you can buy a Medicare Supplement Insurance (Medigap) policy from a private insurance company.";
const aboutContent = "Medicare is our country's health insurance program for people age 65 or older. Certain people younger than age 65 can qualify for Medicare, too, including those with disabilities and those who have permanent kidney failure.The program helps with the cost of health care, but it does not cover all medical expenses or the cost of most long-term care. You have choices for how you get Medicare coverage. If you choose to have Original Medicare (Part A and Part B) coverage, you can buy a Medicare Supplement Insurance (Medigap) policy from a private insurance company.";
const contactContent = "Dayalan-webwrux-9943980321";
mongoose.connect("mongodb+srv://ADMIN:ADMIN@cluster0.n2eue.mongodb.net/postdb",{useNewUrlParser:true,useUnifiedTopology: true});
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const postSchema = new mongoose.Schema({
	title: String,
	body: String
})
const postlist = mongoose.model('postlist', postSchema);



app.get("/",function(req,res){
	postlist.find({},function(err,data){
		res.render("home",{
		Content : homeStartingContent,
		array : data
		})
	});
	
})
app.get("/about",function(req,res){
	res.render("about",{
		Content : aboutContent
	})
})

app.get("/contact",function(req,res){
	res.render("contact",{
		Content : contactContent
	})
})

app.get("/compose",function(req,res){
	res.render("compose")
})

app.post("/compose",function(req,res){
	const postlistUser =new postlist({
		title : req.body.postTitle,
		body : req.body.postBody
	});
	postlistUser.save();
	res.redirect("/")
});

app.get("/:topic",function(req,res)
	{
		postlist.find({},function(err,data)
		{
			data.forEach(function(array)
			{
			var enteredTitle = _.lowerCase(req.params.topic);
			var storedTitle =  _.lowerCase(array.title);
				if(enteredTitle===storedTitle)
				{
					res.render("post",{
						post :array
					});
				}
			});
		});
			// res.render("home",{
			// Content : homeStartingContent,
			// array : data
			// })
	});















app.listen(3000, function() {
  console.log("Server started on port 3000");
});
