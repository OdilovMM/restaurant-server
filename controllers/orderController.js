const assert = require("assert");
const Order = require("../models/Order");
const Definer = require("../lib/mistake");
let orderController = module.exports;

orderController.createOrder = async (req, res) => {
  try {
    assert.ok(req.member, Definer.auth_err5);

    const order = new Order();
    const result = await order.createOrderData(req.member, req.body);

    res.json({ state: "success", data: result });
  } catch (err) {
    res.json({ state: "fail", message: err.message });
  }
};

orderController.getMyOrders = async (req, res) => {
  try {
    assert.ok(req.member, Definer.auth_err5);

    const order = new Order();
    const result = await order.getMyOrdersData(req.member, req.query);
    res.json({ state: "success", data: result });
  } catch (err) {
    res.json({ state: "fail", message: err.message });
  }
};

orderController.editChosenOrder = async (req, res) => {
  try {
    assert.ok(req.member, Definer.auth_err5);

    const order = new Order();
    const result = await order.editChosenOrderData(req.member, req.body);

    res.json({ state: "success", data: result });
  } catch (err) {
    res.json({ state: "fail", message: err.message });
  }
};
