const productsDB = require('../config/products.json');

module.exports = {
    getAll() {
        return productsDB;
    },

    getOne(id) {
        return productsDB.find(x => x.id == id);
    },
    
    create(product) {
       
    }
}