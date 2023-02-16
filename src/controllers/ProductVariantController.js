const Product_Variant = require('../models/product_variant');
const Product_Image = require('../models/product_image');
const uploadImage = require('../midlewares/uploadImage');

let create = async (req, res, next) => {
    uploadImage(req, res, async (err) => {
        if(err) return res.status(400).send(err);
        let price = parseInt(req.body.price);
        if(price === undefined) return res.status(400).send('Trường price không tồn tại');
        let quantity = parseInt(req.body.quantity);
        if(quantity === undefined) return res.status(400).send('Trường quantity không tồn tại');
        let product_id = req.body.product_id;
        if(product_id === undefined) return res.status(400).send('Trường product_id không tồn tại');
        let colour_id = req.body.colour_id;
        if(colour_id === undefined) return res.status(400).send('Trường colour_id không tồn tại');
        let size_id = req.body.size_id;
        if(size_id === undefined) return res.status(400).send('Trường size_id không tồn tại');
        let files = req.files;
        if(files === undefined) return res.status(400).send('Trường files không tồn tại');

        try {
            let newProductVariant = await Product_Variant.create({
                price,
                quantity,
                product_id,
                colour_id,
                size_id
            });
            console.log(newProductVariant);
            for (let file of files) {
                let data = { path: file.path.slice(10,60), product_variant_id: newProductVariant.product_variant_id }
                let newProductImage = await Product_Image.create(data);
                console.log(newProductImage);
            }
            return res.send(newProductVariant)
        } catch(e) {
            console.log(e);
            return res.status(500).send(e);
        }
    })
}

module.exports = {
    create,
};
