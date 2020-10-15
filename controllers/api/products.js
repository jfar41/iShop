const Product = require('../../models/Product');

module.exports = {
    index,
    show,
    create,
    update,
    delete: deleteOne
};

async function index(req, res) {
    const products = await Product.find({});
    res.status(200).json(products);
}

async function show(req, res) {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
}

async function create(req, res) {
    const product = await Product.create(req.body);
    res.status(201).json(product);
}

async function update(req, res) {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedProduct);
}

async function deleteOne(req, res) {
    const deleteProduct = await Product.findByIdAndRemove(req.params.id);
    res.status(200).json(deleteProduct)
}