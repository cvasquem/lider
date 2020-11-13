const express = require("express");
const router = express.Router();

const Product = require('../models/Product');

router.get("/", async (req, res, next) => {

  if(req.query.buscar){
    var condition = {};
    const palindromo = isPalindromo(req.query.buscar);
    console.log('checking: ' + req.query.buscar + ':' + palindromo);

    const palabra = req.query.buscar;
    console.log(Number(palabra));



    if(isNaN(Number(palabra))){
      condition = {$or:[ {'brand':{$regex:'.*'+ req.query.buscar + '.*'}}, {'description':{$regex:'.*'+ req.query.buscar + '.*'}} ]};
    }
    else{
      condition = {'id':req.query.buscar};
    }



    let perPage = 9;
    let page = req.params.page || 1;

    const totalproductos = await Product.countDocuments((err, count) => {
        if(err) return next(err);
    });
    console.log("total productos: " + totalproductos);

    const result = await Product
      .find(condition)
      //.find({$or:[ { 'id':{$eq: parseInt(palabra,10)}} , {'brand':{$regex:'.*'+ palabra + '.*'}}, {'description':{$regex:'.*'+ palabra + '.*'}} ]})
      //.find({$or:[  {"description":{$regex:'.*'+ req.query.buscar + '.*'}} ]})
      .skip((perPage * page ) - perPage)
      //.limit(perPage)
      .exec((err, productosIndex) => {

          if(err) return next(err);
          res.render("index", {
            productosIndex,
            current: page,
            pages: Math.ceil(totalproductos/perPage),
            buscar: req.query.buscar,
            isPalindrome: palindromo
          })
        });
  }
  else{
    let perPage = 9;
    let page = req.params.page || 1;
    const productosIndex = await Product
      .find({})
      .skip((perPage * page ) - perPage)
      .limit(perPage)
      .exec((err, productosIndex) => {
        Product.countDocuments((err, count) => {
          if(err) return next(err);
          res.render("index", {
            productosIndex,
            current: page,
            pages: Math.ceil(count/perPage),
            buscar: '',
            isPalindrome: false
          })
        })
      })
  }



});

router.get("/productos", async (req, res) => {
    const productos = await Product.find();
    res.render("productos", {productos})
});

router.get("/:page", (req, res, next) => {

  if(req.query.buscar){
    const palindromo = isPalindromo(req.query.buscar);
    console.log('checking: ' + req.query.buscar + ':' + palindromo);

    let perPage = 9;
    let page = req.params.page || 1;
    Product
      .find({brand:{$regex:'.*'+ req.query.buscar + '.*'}})
      .skip((perPage * page ) - perPage)
      .limit(perPage)
      .exec((err, productosIndex) => {
        Product.countDocuments((err, count) => {
          if(err) return next(err);
          res.render("index", {
            productosIndex,
            current: page,
            pages: Math.ceil(count/perPage),
            buscar: req.query.buscar,
            isPalindrome: palindromo
          })
        })
      })
  }
  else{
    let perPage = 9;
    let page = req.params.page || 1;
    Product
      .find({})
      .skip((perPage * page ) - perPage)
      .limit(perPage)
      .exec((err, productosIndex) => {
        Product.countDocuments((err, count) => {
          if(err) return next(err);
          res.render("index", {
            productosIndex,
            current: page,
            pages: Math.ceil(count/perPage),
            buscar: '',
            isPalindrome: false
          })
        })
      })
  }




});

function isPalindromo(str){
  var re = /[\W_]/g; // or var re = /[^A-Za-z0-9]/g;
  var lowRegStr = str.toLowerCase().replace(re, '');
  var reverseStr = lowRegStr.split('').reverse().join('');

  return reverseStr === lowRegStr; // "amanaplanacanalpanama" === "amanaplanacanalpanama"? => true
}

module.exports = router;
