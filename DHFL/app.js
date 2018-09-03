var passportLocalMongoose = require('passport-local-mongoose'),
    express_Session = require('express-session'),
    LocalStrategy = require('passport-local'),
    Account = require('./models/accounts'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    express = require('express'),
    app     = express ();
   

//Connecting to Database
mongoose.connect("mongodb://localhost/customer_db",{useNewUrlParser:true});



app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express_Session({
     secret:"This is for DHFL Hackathon",
     resave:false,
     saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


/**********ROUTES***********************/



app.get("/",function(req,res){
    res.render("first",{stylesheet:'first.css'});
    // res.render("flags/green");
});


app.get("/menu",isLoggedIn,function(req,res){
	res.render("menu",{stylesheet:'menu.css'});
});

app.get("/menu/eligible",isLoggedIn,function(req,res){

   res.render("eligible",{stylesheet:'eligible.css'});
});

app.get("/menu/existing",isLoggedIn,function(req,res){

   res.render("existing",{stylesheet:'existing.css'});
});

app.get("/existing/all",isLoggedIn,function(req,res){

   res.render("all",{stylesheet:'all.css'});
});
app.get("/existing/byid",isLoggedIn,function(req,res){

   res.render("byid",{stylesheet:'byid.css'});
});


/*****************FOR CREATING ONLY ONE ACCOUNT************/
 //USERNAME:demo@gmail.com
 //PASSWORD:demo1234

 // app.get("/register",function(req,res){

 //   res.render("registerC");

 // });

// //handling user sign up
// app.post("/register", function(req, res){
//     Account.register(new Account({username: req.body.username}), req.body.password, function(err, user){
//         if(err){
//             console.log(err);
//             return res.render('registerC');
//         }
//         passport.authenticate("local")(req, res, function(){
//            res.redirect("/menu");
//         });
//     });
// });

/**********************************************************/


/**************************Login***************************/



app.get("/login", function(req, res){
   res.render("login",{stylesheet:'login.css'}); 
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/menu",
    failureRedirect: "/login"
}) ,function(req, res){
});
/**********************************************************/


/************LOGOUT******************************/

app.get("/logout",function(req,res){
   req.logout();
   res.redirect("/");
});

/************************************************/
/************IS LOGGED IN FUNCTION***************/

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}
/************************************************/


//localhost:3000
app.listen(3000,process.env.IP,function(){
    console.log("Started Server");

});
    
