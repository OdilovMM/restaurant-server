const Product = require("../models/Product");
const assert = require("assert");
const Definer = require("../lib/mistake");
const { Script } = require("vm");
let productController = module.exports;

productController.getAllProducts = async (req, res) => {
  try {
    const product = new Product();
    const result = await product.getAllProductsData(req.member, req.body); 
    res.json({state: "success", data: result});
  } catch (err) {
    res.json({ state: "fail", message: err.message });
  }
};

productController.getChosenProduct = async (req, res) => {
  try {
    const product = new Product();
    const id = req.params.id;
    const result = await product.getChosenProductData(req.member, id);
    res.json({state: "success", data: result});
  } catch (err) {
    res.json({ state: "fail", message: err.message });
  }
}

/******************************************
 *      BSSR related methods              *
 ******************************************/

productController.addNewProduct = async (req, res) => {
  try {
    assert(req.files, Definer.general_err3);

    const product = new Product();
    let data = req.body;
    data.product_images = req.files.map((ele) => {
      return ele.path;
    });

    const result = await product.addNewProductData(data, req.member); 

    const html = `<script>
                   alert('new product added succesfully');
                   window.location.replace('/resto/products/menu');
                   </script>`;
    res.end(html);      
  } catch (err) {
    console.log(`ERROR, cont/addNewProduct, ${err.message}`);
  }
}; 

productController.updateChosenProduct = async (req, res) => {
  try {
    const product = new Product();
    const id = req.params.id;
    const result = await product.updateChosenProductData(
      id, 
      req.body, 
      req.member._id
      );
    await res.json({state: "success", data: result})
  } catch (err) {
    res.json({ state: "fail", message: err.message });
  }
};


  