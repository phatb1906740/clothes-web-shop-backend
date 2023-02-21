const Product_Variant = require('../models/product_variant');
const Product_Image = require('../models/product_image');
const Product_Variant_History = require('../models/product_variant_history');
const uploadImage = require('../midlewares/uploadImage');

let create = async (req, res, next) => {
    uploadImage(req, res, async (err) => {
        if(err) return res.status(400).send(err);
        let price = parseInt(req.body.price);
        if(price === undefined) return res.status(400).send('Trường price không tồn tại');
        let quantity = parseInt(req.body.quantity);
        if(quantity === undefined) return res.status(400).send('Trường quantity không tồn tại');
        let product_id = parseInt(req.body.product_id);
        if(product_id === undefined) return res.status(400).send('Trường product_id không tồn tại');
        let colour_id = parseInt(req.body.colour_id);
        if(colour_id === undefined) return res.status(400).send('Trường colour_id không tồn tại');
        let size_id = parseInt(req.body.size_id);
        if(size_id === undefined) return res.status(400).send('Trường size_id không tồn tại');
        let files = req.files;
        if(files === undefined) return res.status(400).send('Trường files không tồn tại');

        try {
            let newProductVariant = await Product_Variant.create({
                quantity,
                product_id,
                colour_id,
                size_id
            });
            let newProductVariantHistory = await Product_Variant_History.create({ 
                product_variant_id: newProductVariant.product_variant_id,
                price: price
            });
            for (let file of files) {
                let data = { 
                    path: 'http://localhost:8080\\static' + file.path.slice(10,60), 
                    product_variant_id: newProductVariant.product_variant_id 
                }
                let newProductImage = await Product_Image.create(data);
            }
            return res.send(newProductVariant)
        } catch(e) {
            console.log(e);
            return res.status(500).send(e);
        }
    })
}

let onState = async (req, res, next) => {
    let product_variant_ids = req.body.product_variant_ids;
    if(product_variant_ids === undefined) return res.status(400).send('Trường product_variant_ids không tồn tại');
    let numberProductVariantUpdated = await Product_Variant.update(
        { state: true },
        { where: { product_variant_id: product_variant_ids } }
    )
    return res.send(numberProductVariantUpdated)
}

let offState = async (req, res, next) => {
    let product_variant_ids = req.body.product_variant_ids;
    if(product_variant_ids === undefined) return res.status(400).send('Trường product_variant_ids không tồn tại');
    let numberProductVariantUpdated = await Product_Variant.update(
        { state: false },
        { where: { product_variant_id: product_variant_ids } }
    )
    return res.send(numberProductVariantUpdated)
}

let updatePrice = async (req, res, next) => {
    let product_variant_ids = req.body.product_variant_ids;
    if(product_variant_ids === undefined) return res.status(400).send('Trường product_variant_ids không tồn tại');
    let newPrice = req.body.price;
    if(newPrice === undefined) return res.status(400).send('Trường price không tồn tại');

    try {
        for(let product_variant_id of product_variant_ids) {
            let newProductVariantHistory = await Product_Variant_History.create({ 
                product_variant_id,
                price: newPrice
            });
        }
    } catch(e) {
        console.log(e)
        return res.state(500).send('Có lỗi khi cập nhật giá sản phẩm vui lòng thử lại!')
    }
    return res.send('updatePrice')
}

let updateQuantity = async (req, res, next) => {
    let product_variant_ids = req.body.product_variant_ids;
    if(product_variant_ids === undefined) return res.status(400).send('Trường product_variant_ids không tồn tại');
    let newQuantity = req.body.quantity;
    if(newQuantity === undefined) return res.status(400).send('Trường quantity không tồn tại');

    let numberProductVariantUpdated = await Product_Variant.update(
        { quantity: newQuantity },
        { where: { product_variant_id: product_variant_ids } }
    )
    return res.send(numberProductVariantUpdated)
}

let deleteProductVariant = async (req, res, next) => {
    let product_variant_ids = req.body.product_variant_ids;
    if(product_variant_ids === undefined) return res.status(400).send('Trường product_variant_ids không tồn tại');
    await Product_Variant.destroy(
        { where: { product_variant_id: product_variant_ids } }
    )
    return res.send('delete product variant success')
}

module.exports = {
    create,
    onState,
    offState,
    updatePrice,
    updateQuantity,
    deleteProductVariant
};
