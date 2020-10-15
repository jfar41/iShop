const Product = require('../../models/Product');

module.exports = {
    index,
    show,
    create
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