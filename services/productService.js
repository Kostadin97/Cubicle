const uniqid = require('uniqid');
const Cube = require('../models/Cube');
const productsData = require('../config/products.json');
const fs = require('fs');
const path = require('path');

function getAll() {
    return productsData;
}

function create(data) {
    let cube = new Cube(
        uniqid(),
        data.name,
        data.description,
        data.imageUrl,
        data.difficultyLevel
    );
 
    productsData.push(cube);

    fs.writeFile(path.join(__dirname, '../config/products.json'), JSON.stringify(productsData), (err) => {
        if (err) {
            return console.log(err);
        }

    });
        
}
module.exports = {
    getAll,
    create
}