'use strict'

const { model, Schema, Types } = require("mongoose");
const slugify = require("slugify");
const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";

// Declare the Schema of the Mongo model
const productSchema = new Schema({
    product_name: {
        type: String,
        required: true,
    },
    product_thumb: {
        type: String,
        required: true,
    },
    product_description: String,
    product_slug: String,
    product_price: {
        type: Number,
        required: true,
    },
    product_quantity: {
        type: Number,
        required: true,
    },
    product_type: {
        type: String,
        required: true,
        enum: ['Electronics', 'Clothing', 'Furniture'],
    },
    product_shop: {
        type: Schema.Types.ObjectId,
        ref: "Shop",
    },
    product_attributes: {
        type: Schema.Types.Mixed,
        required: true,
    },
    product_rating_avg: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating must be at most 5'],
        set: (val) => Math.round(val * 10) / 10,
    },
    product_variations: {
        type: Array,
        default: [],
    },
    isDraft: {
        type: Boolean,
        default: true,
        index: true,
    },
    isPublished: {
        type: Boolean,
        default: false,
        index: true,
    },
}, {
    collection: COLLECTION_NAME,
    timestamps: true,
})
// Create index for search
productSchema.index({ product_name: 'text', product_description: 'text' });
// Middleware to create a slug for the product
productSchema.pre('save', function (next) {
    this.product_slug = slugify(this.product_name, { lower: true });
    next();
})

// Define the product type = clothing
const clothingSchema = new Schema({
    brand: {
        type: String,
        required: true,
    },
    size: String,
    material: String,
    product_shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
    }
}, {
    collection: 'clothes',
    timestamps: true,
})

// Define the product type = electronic
const electronicSchema = new Schema({
    manufacturer: {
        type: String,
        required: true,
    },
    model: String,
    color: String,
    product_shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
    }
}, {
    collection: 'electronics',
    timestamps: true,
})

// Define the product type = furnitures
const furinitureSchema = new Schema({
    brand: {
        type: String,
        required: true,
    },
    size: String,
    material: String,
    product_shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
    }
}, {
    collection: 'furnitures',
    timestamps: true,
})



//Export the model
module.exports = {
    product: model(DOCUMENT_NAME, productSchema),
    clothes: model('Clothing', clothingSchema),
    electronics: model('Electronics', electronicSchema),
    furnitures: model('Furnitures', furinitureSchema),
}