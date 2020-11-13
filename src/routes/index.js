const express = require("express");
const router = express.Router();

const Product = require('../models/Product');

router.get("/", async (req, res, next) => {

  if(req.query.buscar){

    const palabra = req.query.buscar;

    var condition = {};
    if(isNaN(Number(palabra))){
      condition = {$or:[ {'brand':{$regex:'.*'+ palabra + '.*'}}, {'description':{$regex:'.*'+ palabra + '.*'}} ]};
    }
    else{
      condition = {'id':palabra};
    }

    const palindromo = isPalindromo(req.query.buscar);
    let perPage = 9;
    let page = req.params.page || 1;
    const countBusqueda = await Product.countDocuments(condition);
    const result = await Product
      .find(condition)
      .skip((perPage * page ) - perPage)
      .limit(perPage)
      .exec((err, productosIndex) => {
          if(err) return next(err);
              res.render("index", {
                productosIndex,
                current: page,
                pages: Math.ceil(countBusqueda/perPage),
                buscar: palabra,
                isPalindrome: palindromo
              })

        });
  }
  else{
    let perPage = 9;
    let page = req.params.page || 1;
    const countBusqueda = await Product.countDocuments();
    const result = await Product
      .find({})
      .skip((perPage * page ) - perPage)
      .limit(perPage)
      .exec((err, productosIndex) => {
          if(err) return next(err);
            res.render("index", {
              productosIndex,
              current: page,
              pages: Math.ceil(countBusqueda/perPage),
              buscar: '',
              isPalindrome: false
            })
      });
  }
});

router.get("/:page", async (req, res, next) => {
  if(req.query.buscar){
    const palabra = req.query.buscar;

    var condition = {};
    if(isNaN(Number(palabra))){
      condition = {$or:[ {'brand':{$regex:'.*'+ palabra + '.*'}}, {'description':{$regex:'.*'+ palabra + '.*'}} ]};
    }
    else{
      condition = {'id':palabra};
    }

    const palindromo = isPalindromo(req.query.buscar);
    let perPage = 9;
    let page = req.params.page || 1;
    const countBusqueda = await Product.countDocuments(condition);
    const result = await Product
      .find(condition)
      .skip((perPage * page ) - perPage)
      .limit(perPage)
      .exec((err, productosIndex) => {
          if(err) return next(err);
              res.render("index", {
                productosIndex,
                current: page,
                pages: Math.ceil(countBusqueda/perPage),
                buscar: palabra,
                isPalindrome: palindromo
              })

        });
  }
  else{
    let perPage = 9;
    let page = req.params.page || 1;
    const countBusqueda = await Product.countDocuments();
    const result = await Product
      .find({})
      .skip((perPage * page ) - perPage)
      .limit(perPage)
      .exec((err, productosIndex) => {
          if(err) return next(err);
            res.render("index", {
              productosIndex,
              current: page,
              pages: Math.ceil(countBusqueda/perPage),
              buscar: '',
              isPalindrome: false
            })
      });
  }
});

function isPalindromo(str){
  var re = /[\W_]/g;
  var lowRegStr = str.toLowerCase().replace(re, '');
  var reverseStr = lowRegStr.split('').reverse().join('');

  return reverseStr === lowRegStr;
}


module.exports = router;
