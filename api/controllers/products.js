const Product = require('../models/product');
const mongoose = require('mongoose');

exports.get_products = (req,res,next) => {
    Product.find()
        .exec()
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            res.status(404).json({
                error: err
            })
        })
}

exports.get_one_product = (req, res, next) => {
    const id = req.params.id;
    Product.find({_id: id})
        .exec()
        .then(result => {
            if(result.length === 0){
                throw "Product not found"
            }
            return res.status(200).json(result);
        })
        .catch(err => {
            return res.status(404).json({
                error: err
            });
        })
}

exports.post_product = (req,res,next)=>{
    const product = new Product({
       name: req.body.name,
       price: req.body.price,
       _id: mongoose.Types.ObjectId() 
    })

    product.save()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(404).json({
                error: err
            })
        })
}