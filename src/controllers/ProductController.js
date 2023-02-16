const Product = require('../models/product');

let create = async (req, res, next) => {
    let product_name = req.body.product_name;
    if(product_name === undefined) return res.status(400).send('Trường product_name không tồn tại');
    let category_id = req.body.category_id;
    if(category_id === undefined) return res.status(400).send('Trường category_id không tồn tại');
    let description = req.body.description;
    if(description === undefined) return res.status(400).send('Trường description không tồn tại');

    try {
        let newProduct = await Product.create({ product_name, description, category_id });
        console.log(newProduct);
        return res.send(newProduct);
    } catch(e) {
        console.log(e);
        return res.status(500).send(e);
    }
}

let listAdmin = async (req, res, next) => {
    return res.send('listAdmin');
}

let listCustomer = async (req, res, next) => {
    return res.send('listCustomer');
}

module.exports = {
    create,
    listAdmin,
    listCustomer
};
