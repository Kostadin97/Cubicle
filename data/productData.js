const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname, '../config/products.json');
const productsDB = require('../config/products.json');

module.exports = {
    getAll() {
        return productsDB;
    },

    getOne(id) {
        return productsDB.find(x => x.id == id);
    },
    
    create(product) {
        productsDB.push(product);
        return fs.writeFile(filePath, JSON.stringify(productsDB));
    }
}