const uniqid = require('uniqid');
const Cube = require('../models/Cube');
const productsData = require('../config/products.json');
const fs = require('fs');
const path = require('path');

function getAll() {
    return productsData;
}

function getOne(id) {
    return productsData.find(x => x.id == id);
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

    const filePath = path.join(__dirname, '/../config/products.json');

    fs.writeFile(filePath, JSON.stringify(productsData), (err) => {
        if (err) {
            return console.log(err);
        }

    });
        
}
module.exports = {
    getAll,
    getOne,
    create
}