const orderid = require('order-id')('key');

const Order = require('../models/order');
const User = require('../models/user');
const Order_State = require('../models/order_state');
const Product_Variant = require('../models/product_variant');
const Product = require('../models/product');
const Product_Price_History = require('../models/product_price_history');
const Order_Item = require('../models/order_item');
const Order_Status_Change_History = require('../models/order_status_change_history');

let create = async (req, res, next) => {
    let user_id = req.body.user_id;
    if (user_id === undefined) return res.status(400).send('Trường user_id không tồn tại');
    try {
        let user = await User.findOne({ where: { user_id, role_id: 2 } });
        if (user == null) return res.status(400).send('User này không tồn tại');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Gặp lỗi khi tạo đơn hàng vui lòng thử lại');
    }
    let customer_name = req.body.customer_name;
    if (customer_name === undefined) return res.status(400).send('Trường customer_name không tồn tại');
    let email = req.body.email;
    if (email === undefined) return res.status(400).send('Trường email không tồn tại');
    let phone_number = req.body.phone_number;
    if (phone_number === undefined) return res.status(400).send('Trường phone_number không tồn tại');
    let address = req.body.address;
    if (address === undefined) return res.status(400).send('Trường address không tồn tại');
    let order_items = req.body.order_items;
    if (order_items === undefined) return res.status(400).send('Trường order_items không tồn tại');

    try {
        let order_id = orderid.generate().replace(/-/g, "");
        var newOrder = await Order.create({
            user_id,
            order_id,
            customer_name,
            email,
            phone_number,
            address,
            total_product_value: 0,
            delivery_charges: 0,
            total_order_value: 0,
        });

        let total_product_value = 0;
        for (let i = 0; i < order_items.length; i++) {
            let order_item = order_items[i];
            let product_variant = await Product_Variant.findOne({
                attributes: ['product_variant_id', 'quantity', 'state'],
                include: [
                    {
                        model: Product, attributes: ['product_id'],
                        include: { model: Product_Price_History, attributes: ['price'], separate: true, order: [['createdAt', 'DESC']] }
                    },
                ],
                where: { product_variant_id: order_item.product_variant_id }
            });
            if (product_variant == null)
                return res.status(400).send("Sản phẩm này không tồn tại");
            if (product_variant.state != true)
                return res.status(400).send("Sản phẩm này chưa được mở bán");
            if (order_item.quantity > product_variant.quantity)
                return res.status(400).send("Số lượng sản phẩm không hợp lệ");
            let productVariantPrice = product_variant.Product.Product_Price_Histories[0].price;
            let total_value = productVariantPrice * order_item.quantity;
            let newOrderItem = {
                order_id: newOrder.order_id,
                product_variant_id: product_variant.product_variant_id,
                order_item_index: i,
                price: productVariantPrice,
                quantity: order_item.quantity,
                total_value
            }
            await Order_Item.create(newOrderItem);
            newProductVariantQuantity = product_variant.quantity - order_item.quantity;
            product_variant.update({ quantity: newProductVariantQuantity });
            total_product_value += total_value;
        }

        let delivery_charges = 20000
        let total_order_value = total_product_value + delivery_charges;
        newOrder.update({ total_product_value, delivery_charges, total_order_value });
        let state = await Order_State.findOne({ where: { state_id: 1, state_name: "Chờ Xác Nhận" } });
        await newOrder.addOrder_State(state);
        return res.send(newOrder)
    } catch (err) {
        console.log(err);
        return res.status(500).send('Gặp lỗi khi tạo đơn hàng vui lòng thử lại');
    }
}

module.exports = {
    create,
}