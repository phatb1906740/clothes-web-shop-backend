const orderid = require('order-id')('key');

const Order = require('../models/order');
const Order_State = require('../models/order_state');
const Order_Status_Change_History = require('../models/order_status_change_history');

let create = async (req, res, next) => {
    let customer_name = req.body.customer_name;
    if (customer_name === undefined) return res.status(400).send('Trường tên customer_name không tồn tại');
    let email = req.body.email;
    if (email === undefined) return res.status(400).send('Trường tên email không tồn tại');
    let phone_number = req.body.phone_number;
    if (phone_number === undefined) return res.status(400).send('Trường tên phone_number không tồn tại');
    let address = req.body.address;
    if (address === undefined) return res.status(400).send('Trường tên address không tồn tại');

    const order_id = orderid.generate().replace(/-/g, "");
    let newOrder = await Order.create({
        order_id,
        customer_name,
        email,
        phone_number,
        address,
        total_product_value: 0,
        delivery_charges: 20000,
        total_oredr_value: 20000,
    });

    let state = await Order_State.findOne({ where: { state_id: 1, state_name: "Chờ Xác Nhận" } });
    await newOrder.addOrder_State(state);
    return res.send(newOrder)
}

module.exports = {
    create,
}
