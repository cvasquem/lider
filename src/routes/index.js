const express = require("express");
const router = express.Router();

const Product = require('../models/Product');

router.get("/", async (req, res, next) => {

  if(req.query.buscar){

    const palabra = req.query.buscar;
    console.log(Number(palabra));

    var condition = {};
    if(isNaN(Number(palabra))){
      condition = {$or:[ {'brand':{$regex:'.*'+ palabra + '.*'}}, {'description':{$regex:'.*'+ palabra + '.*'}} ]};
    }
    else{
      condition = {'id':palabra};
    }

    const palindromo = isPalindromo(req.query.buscar);
    console.log('checking: ' + req.query.buscar + '= ' + palindromo);


    let perPage = 9;
    let page = req.params.page || 1;
    const result = await Product
      .find(condition)
      .skip((perPage * page ) - perPage)
      .limit(perPage)
      .exec((err, productosIndex) => {
          if(err) return next(err);
          Product.countDocuments((err, count) => {
              res.render("index", {
                productosIndex,
                current: page,
                pages: Math.ceil(count/perPage),
                buscar: palabra,
                isPalindrome: palindromo
              })
          })
        });
  }
  else{
    let perPage = 9;
    let page = req.params.page || 1;
    const result = await Product
      .find({})
      .skip((perPage * page ) - perPage)
      .limit(perPage)
      .exec((err, productosIndex) => {
          if(err) return next(err);
          Product.countDocuments((err, count) => {
            res.render("index", {
              productosIndex,
              current: page,
              pages: Math.ceil(count/perPage),
              buscar: '',
              isPalindrome: false
            })
          })
      });
  }



});

router.get("/productos", async (req, res) => {
    const productos = await Product.find();
    res.render("productos", {productos})
});

router.get("/:page", async (req, res, next) => {

  if(req.query.buscar){
    const palabra = req.query.buscar;
    console.log(Number(palabra));

    var condition = {};
    if(isNaN(Number(palabra))){
      condition = {$or:[ {'brand':{$regex:'.*'+ palabra + '.*'}}, {'description':{$regex:'.*'+ palabra + '.*'}} ]};
    }
    else{
      condition = {'id':palabra};
    }

    const palindromo = isPalindromo(req.query.buscar);
    console.log('checking: ' + req.query.buscar + '= ' + palindromo);


    let perPage = 9;
    let page = req.params.page || 1;
    const result = await Product
      .find(condition)
      .skip((perPage * page ) - perPage)
      .limit(perPage)
      .exec((err, productosIndex) => {
          if(err) return next(err);
          Product.countDocuments((err, count) => {
              res.render("index", {
                productosIndex,
                current: page,
                pages: Math.ceil(count/perPage),
                buscar: palabra,
                isPalindrome: palindromo
              })
          })
        });
  }
  else{
    let perPage = 9;
    let page = req.params.page || 1;
    const result = await Product
      .find({})
      .skip((perPage * page ) - perPage)
      .limit(perPage)
      .exec((err, productosIndex) => {
          if(err) return next(err);
          Product.countDocuments((err, count) => {
            res.render("index", {
              productosIndex,
              current: page,
              pages: Math.ceil(count/perPage),
              buscar: '',
              isPalindrome: false
            })
          })
      });
  }




});

function isPalindromo(str){
  var re = /[\W_]/g; // or var re = /[^A-Za-z0-9]/g;
  var lowRegStr = str.toLowerCase().replace(re, '');
  var reverseStr = lowRegStr.split('').reverse().join('');

  return reverseStr === lowRegStr; // "amanaplanacanalpanama" === "amanaplanacanalpanama"? => true
}


module.exports = router;
