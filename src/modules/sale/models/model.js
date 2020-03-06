'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SaleSchema = new Schema({
    orderno: {
        type: String
    },
    orderdate: {
        type: String
    },
    customerno: {
        type: String
    },
    customername: {
        type: String
    },
    precredit: {
        type: Number
    },
    items: {
        type: [
            {
                sku: {
                    type: String
                },
                name: {
                    type: String
                },
                description: {
                    type: String
                },
                priceuntax: {
                    type: Number
                },
                pricetax: {
                    type: Number
                },
                quantity: {
                    type: Number
                },
                taxrate: {
                    type: Number
                },
                tax: {
                    type: Number
                },
                subtotal: {
                    type: Number
                }
            }
        ]
    },
    untaxamount: {
        type: Number
    },
    taxamount: {
        type: Number
    },
    discountamount: {
        type: Number
    },
    totalamount: {
        type: Number
    },

    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});

mongoose.model("Sale", SaleSchema);