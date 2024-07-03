"use strict";

const { inventory } = require("../inventory.model");
const { Types } = require("mongoose");

const insertInventory = async({
    productId, shopId, stock, location = 'unknown'
}) => {
    return await inventory.create({
        inventory_product_id: productId,
        inventory_location: location,
        inventory_stock: stock,
        inventory_shopId: shopId,
    })
}


module.exports = {
    insertInventory,
}