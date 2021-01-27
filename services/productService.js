const uniqid = require('uniqid');
const Cube = require('../models/Cube');
const productsArray = require('../config/products.json');
const fs = require('fs');
const path = require('path');

function create(data) {
    let cube = new Cube(
        uniqid(),
        data.name,
        data.description,
        data.imageUrl,
        data.difficultyLevel
    );
 
    productsArray.push(cube);

    fs.writeFile(path.join(__dirname, '../config/products.json'), JSON.stringify(productsArray), (err) => {
        if (err) {
            return console.log(err);
        }

    });
        
}
module.exports = {
    create
}