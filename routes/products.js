var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

// Schema
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://monish:Monish1995@cluster0.ijjgg.mongodb.net/?retryWrites=true&w=majority');
var productSchema = mongoose.Schema({
    // name: String,
    // number: Number,
    // state: String,
    // city: String,
});
var product = mongoose.model("Ecommerce_product", productSchema);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Status Check
router.get('/', function (req, res) {
    res.send("Product Route working")
})

// Register New product
router.post('/add-product', function (req, res) {
    console.log("Post Product called ");
    var newProduct = new product({
        
    });
    newProduct.save(function (err, product) {
        if (err)
            res.send(err);
        else {
            let dataOut = {
                response_message: "Success",
                response_data: {
                    product_id: product._id
                },
                meta: {},
                response_status: "200",
            }
            res.send(dataOut);
        }
    });
})

// GET ALL PRODUCTS
router.get("/all-products", (req, res) => {
    console.log("Get ALL PRODUCTS called");
    product.find(function (err, result) {
        res.json(result)
    });
})
    
module.exports = router;