const express = require("express");
const router = express.Router();

const Product = require('../models/Product');

router.get("/", async (req, res, next) => {

  if(req.query.buscar){
    let perPage = 9;
    let page = req.params.page || 1;
    const productosIndex = await Product
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
            buscar: req.query.buscar
          })
        })
      })
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
            buscar: ''
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
            buscar: req.query.buscar
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
            buscar: ''
          })
        })
      })
  }




});


module.exports = router;
