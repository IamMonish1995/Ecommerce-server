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
// app.get("/getusers", (req, res) => {
//     console.log("Get View all called");
//     user.find(function (err, result) {
//         res.json(result)
//     });
// })

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
            let dataOut = {
                response_message: "Success",
                response_data: {
                    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiYjc2ZjJiNTYtMmFiZS00MjE5LWI2NjktNDZmYzQ4MzM1OTI4Iiwicm9sZSI6IlNVUEVSX0FETUlOIiwiYWdlbnQiOiJQb3N0bWFuUnVudGltZS83LjI5LjAiLCJob3N0IjoiYXBpLnVwY3JlZC5haSIsImF1ZCI6ImFwaS51cGNyZWQuYWkiLCJleHAiOjE2NTYzOTA5NDh9.Gp4gpYQiHm0uBf4E2zpYsxEJwnswlbEfzJxvPk7WT1w",
                    user_id: res._id,
                    email: req.body.email
                },
                meta: {}
            }
            res.send(dataOut);
        }
    });
});

// Login Existing User
app.post('/admin/login_admin', function (req, res) {
    loginid = req.body.email;
    loginpass = req.body.password;
    console.log("post login all called" + "login-email=" + loginid + "  login-passw=" + loginpass);
    user.findOne({ email: loginid }, function (err, response) {
        if (err) throw err;
        if (response !== null) {
            if (loginid == response.email && loginpass == response.password) {
                let dataOut = {
                    response_message: "Success",
                    response_data: {
                        token: response._id,
                        user_id: response._id,
                        email: req.body.email
                    },
                    meta: {}
                }
                res.send(dataOut);
            } else {
                let dataOut = {
                    response_message: "Password Incorrect",
                    response_data: {},
                    meta: {}
                }
                res.send(dataOut);
                console.log("Password incorrect called");
            }
        } else {
            let dataOut = {
                response_message: "Email Not Found",
                response_data: {},
                meta: {}
            }
            res.send(dataOut);
            console.log("email incorrect called");
        }
    });
});
// Edit User Data 
// app.post('/editprofile', function (req, res) {

//     let useremail = req.body.email;
//     console.log("edit profile called "+ useremail);
//     user.findOneAndUpdate({ email: useremail }, {
//         name: req.body.name,
//         password: req.body.password,
//         number: req.body.number,
//         state: req.body.state,
//         city: req.body.city
//     }, function (err, response) {
//         if (err) throw err;
//         else res.send(response);
//     });

// });

// app.post('/deleteprofile', function (req, res) {
//     let useremail = req.body.email;
//     console.log("delete called ",useremail)
//     user.findOneAndRemove({ email: useremail }, {
//     }, function (err, response) { 

//         if (err) throw err;
//         else res.send(response);
//     });

// });

app.listen(8080);