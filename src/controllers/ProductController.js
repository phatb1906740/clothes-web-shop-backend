const Product_Variant = require('../models/product_variant');
const Product = require('../models/product');
const Colour = require('../models/colour');
const Size = require('../models/size');
const Product_Variant_History = require('../models/product_variant_history');
const Product_Image = require('../models/product_image');

let create = async (req, res, next) => {
    let product_name = req.body.product_name;
    if(product_name === undefined) return res.status(400).send('Trường product_name không tồn tại');
    let category_id = req.body.category_id;
    if(category_id === undefined) return res.status(400).send('Trường category_id không tồn tại');
    let description = req.body.description;
    if(description === undefined) return res.status(400).send('Trường description không tồn tại');

    try {
        let newProduct = await Product.create({ product_name, description, category_id });
        return res.send(newProduct);
    } catch(e) {
        console.log(e);
        return res.status(500).send(e);
    }
}

let listAdminSide = async (req, res, next) => {
    let listProductVariant = await Product_Variant.findAll({ 
        attributes: ['product_variant_id', 'quantity', 'state', 'created_at'],
        include: [
            { model: Product, attributes: ['product_id'] },
            { model: Colour, attributes: ['colour_name'] },
            { model: Size, attributes: ['size_name'] },
            { model: Product_Variant_History, attributes: ['price'], separate: true, order: [ ['createdAt', 'DESC'] ] },
            { model: Product_Image, attributes: ['path'] },
        ]
     });
    listProductVariant = listProductVariant.map((productVariant) => {
        let newProductVariant = {
            product_id: productVariant.Product.product_id,
            product_variant_id: productVariant.product_variant_id,
            product_name: productVariant.Product.product_name,
            colour_name: productVariant.Colour.colour_name,
            size_name: productVariant.Size.size_name,
            product_image: productVariant.Product_Images[0].path,
            price: productVariant.Product_Variant_Histories.price,
            quantity: productVariant.quantity,
            state: productVariant.state,
            created_at: productVariant.created_at
        }
        return newProductVariant;
    });
    return res.send(listProductVariant);
}

let listCustomerSide = async (req, res, next) => {
    return res.send('listCustomer');
}

module.exports = {
    create,
    listAdminSide,
    listCustomerSide
};
