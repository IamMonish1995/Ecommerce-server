// Server Main_URL = https://capstone-pro-server-ecom.herokuapp.com/
// updated file
var express = require('express');
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

const userRoute = require("./routes/users")
const productRoute = require("./routes/products")

app.use('/user',userRoute)
app.use('/product',productRoute)

// Status Check
app.get('/', function (req, res) {
    res.send("server running")
})

const port = process.env.PORT || 8080
app.listen(port,()=>console.log("Server Started on Port "+`${port}`));