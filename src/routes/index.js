const express = require("express");
const router = express.Router();

const Product = require('../models/Product');

router.get("/", async (req, res) => {
  const productosIndex = await Product.find();
  res.render("index", {productosIndex});
});


router.get("/productos", async (req, res) => {
    const productos = await Product.find();
    res.render("productos", {productos})
});

router.get("/:page", (req, res, next) => {
  let perPage = 9;
  let page = req.params.page || 1;

  Product
    .find({})
    .skip((perPage * page ) - perPage)
    .limit(perPage)
    .exec((err, productosIndex) => {
      Product.count((err, count) => {
        if(err) return next(err);
        res.render("index", {productosIndex, current: page, pages: Math.ceil(count/perPage)})
      })
    })
});


module.exports = router;
