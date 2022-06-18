// updated file
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// CORS CONFIG STARTS HERE
var cors = require('cors'); // npm install cors

app.use(cors());
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
};
app.use(allowCrossDomain);
// CORS CONFIG ENDS HERE

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://monish:Monish1995@cluster0.ijjgg.mongodb.net/?retryWrites=true&w=majority');
var userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    number: Number,
    state: String,
    city: String,
});
var user = mongoose.model("Ecommerce", userSchema);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// Viewall Users
app.get("/viewall", (req, res) => {
    console.log("Get View all called");
    user.find(function (err, result) {
        res.json(result)
    });
})

// Register New User
app.post('/register', function (req, res) {
    console.log("Post register called ");
    var newUser = new user({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        number: req.body.number,
        state: req.body.state,
        city: req.body.city,
    });
    newUser.save(function (err, user) {
        if (err)
            res.send("ERROR");
        else {
            res.send("SUCCESS");
        }
    });
});

// Login Existing User
app.post('/login', function (req, res) {
    loginid = req.body.email;
    loginpass = req.body.password;
    console.log("post login all called" + "login email=" + loginid + "login password=" + loginpass );

    user.findOne({ email: loginid }, function (err, response) {
        if (err) throw err;
        if (loginid == "admin" && loginpass == "admin") {
            user.find(function (err, response) {
                res.status(201).send(response);
                console.log("admin called");
            });
        } else {
            if (response !== null) {
                if (loginid == response.email && loginpass == response.password) {
                    console.log("update user called");
                    res.send(response)

                }
            } else {
                res.send("Email is incorrect" + `<br>` + `<a href="/login">try again</a>`);
                console.log("email incorect called");
            }
        }
    });
});
// Edit User Data 
app.post('/editprofile', function (req, res) {
    
    let useremail = req.body.email;
    console.log("edit profile called "+ useremail);
    user.findOneAndUpdate({ email: useremail }, {
        name: req.body.name,
        password: req.body.password,
        number: req.body.number,
        state: req.body.state,
        city: req.body.city
    }, function (err, response) {
        if (err) throw err;
        else res.send(response);
    });

});

app.post('/deleteprofile', function (req, res) {
    let useremail = req.body.email;
    console.log("delete called ",useremail)
    user.findOneAndRemove({ email: useremail }, {
    }, function (err, response) { 
        
        if (err) throw err;
        else res.send(response);
    });
   
});

app.listen(8080);