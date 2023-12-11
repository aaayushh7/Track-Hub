import mongoose from "mongoose";
import { Monofett } from "next/font/google";

const productSchema = new mongoose.Schema({
    url: {type: String, required: true, unique: true },
    currency: {type: String, required: true},
    image: {type: String, required: true},
    title: {type: String, required: true},
    currentPrice: {type: Number, required: true},
    originalPrice: {type:Number, required: true},
    priceHistory: [
        {
            price: {type: Number, required: true},
            date: {type: Date, default: Date.now}
        },
    ],
    lowestPrice:{type:Number},
    highestPrice: {type: Number},
    averagePrice: {type: Number},
    discountRate: {type: Number},
    description: {type: String},
    category: {type: String},
    reviewsCount: {type: Number},
    isOutOfStock: {type: Boolean, default: false},
    users:[
        {email: {type: String, required: false}}
    ], default: [],
}, { timestamps: true});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;