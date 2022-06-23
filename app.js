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
    // name: String,
    email: String,
    password: String,
    token:String,
    // number: Number,
    // state: String,
    // city: String,
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
app.post('/user/register', function (req, res) {
    console.log("Post register called ");
    loginid = req.body.email;
    user.findOne({ email: loginid }, function (err, response) {
        console.log("user exist check called" + "login-email=" + loginid);
        if (err) throw err;
        if (response !== null) { 
            if (loginid == response.email) {
                let dataOut = {
                    response_message: "User Already Exist",
                    response_data: {},
                    meta: {},
                    response_status:"409"
                }
                res.send(dataOut);
            }
        } else {
            console.log("New User Called");
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            function generateString(length) {
                let result = '';
                const charactersLength = characters.length;
                for (let i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            }
            var newUser = new user({
                // name: req.body.name,
                // number: req.body.number,
                // state: req.body.state,
                // city: req.body.city,
                email: req.body.email,
                password: req.body.password,
                token: generateString(99),
            });
            newUser.save(function (err, user) {
                if (err)
                    res.send(err);
                else {
                    let dataOut = {
                        response_message: "Success",
                        response_data: {
                            token: user.token,
                            user_id: user._id,
                            email: req.body.email,
                        },
                        meta: {},
                        response_status: "200",
                    }
                    res.send(dataOut);
                }
            });
        }
    })
    
    


    
});

// Login Existing User
app.post('/admin/login_admin', function (req, res) {
    loginid = req.body.email;
    loginpass = req.body.password;
    console.log("post login called" + "login-email=" + loginid + "  login-passw=" + loginpass);
    user.findOne({ email: loginid }, function (err, response) {
        if (err) throw err;
        if (response !== null) {
            if (loginid == response.email && loginpass == response.password) {
                let dataOut = {
                    response_message: "Success",
                    response_data: {
                        token: response.token,
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
const port = process.env.PORT || 8080
app.listen(port,()=>console.log("Server Started on Port "+`${port}`));