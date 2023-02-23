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
            { model: Product, attributes: ['product_id', 'product_name'] },
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
            price: productVariant.Product_Variant_Histories[0].price,
            quantity: productVariant.quantity,
            state: productVariant.state,
            created_at: productVariant.created_at
        }
        return newProductVariant;
    });
    return res.send(listProductVariant);
}

let listCustomerSide = async (req, res, next) => {
    try {
        // Lấy danh sách tất cả sản phẩm ưu tiên sản phẩm mới nhất
        let listProduct = await Product.findAll({ 
            attributes: ['product_id'],
            order: [ ['created_at', 'DESC'] ],
            raw: true
        });

        let listProductVariant = [];

        // Duyệt qua danh sách sản phẩm
        for( let { product_id } of listProduct ) {
            // Lấy danh sách tất cả các màu của sản phẩm đó
            let listColor = await Product_Variant.findAll({
                attributes: ['colour_id'],
                where: { product_id },
                group: [ 'colour_id' ],
                raw: true
            });
            // Duyệt qua danh sách màu
            for( let { colour_id } of listColor ) {
                // Tìm tất cả biến thể sản phẩm có cùng màu với nhau
                let listProductVariantSameColour = await Product_Variant.findAll({
                    attributes: ['product_variant_id', 'colour_id'],
                    include: [
                        { model: Product, attributes: ['product_id', 'product_name', 'rating', 'sold', 'feedback_quantity'] },
                        { model: Colour, attributes: ['colour_name'] },
                        { model: Size, attributes: ['size_name'] },
                        { model: Product_Variant_History, attributes: ['price'], separate: true, order: [ ['createdAt', 'DESC'] ] },
                        { model: Product_Image, attributes: ['path'] },
                    ],
                    where: { colour_id },
                });
                // Convert dữ liệu
                let productVariant = {
                    product_id: listProductVariantSameColour[0].Product.product_id,
                    product_name: listProductVariantSameColour[0].Product.product_name,
                    rating: listProductVariantSameColour[0].Product.rating,
                    sold: listProductVariantSameColour[0].Product.sold,
                    feedback_quantity: listProductVariantSameColour[0].Product.feedback_quantity,
                    product_variant_id: listProductVariantSameColour[0].product_variant_id,
                    colour_id: listProductVariantSameColour[0].colour_id,
                    colour_name: listProductVariantSameColour[0].Colour.colour_name,
                    price: listProductVariantSameColour[0].Product_Variant_Histories[0].price,
                    product_image: listProductVariantSameColour[0].Product_Images[0].path,
                    sizes: []
                };
                // Duyệt qua danh sách biến thể sản phẩm có cùng màu để cộng dồn danh sách sizes
                for( let { Size } of listProductVariantSameColour )
                    productVariant.sizes.push(Size.size_name);
                listProductVariant.push(productVariant);
            }
        }
        return res.send(listProductVariant);
    } catch(err) {
        console.log(err);
        return res.status(500).send('Gặp lỗi khi tải dữ liệu vui lòng thử lại');
    }
}

module.exports = {
    create,
    listAdminSide,
    listCustomerSide
};
