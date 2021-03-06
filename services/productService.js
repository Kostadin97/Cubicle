const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');

async function getAll(query) {
    let products = await Cube.find({}).lean();

    if (query.search) {
        products = products.filter(x => x.name.toLowerCase().includes(query.search));
    }

    if (query.from) {
        products = products.filter(x => Number(x.difficultyLevel) >= query.from);
    }

    if (query.to) {
        products = products.filter(x => Number(x.difficultyLevel) <= query.to);
    }

    return products;
}

function getOne(id) {
    return Cube.findById(id).lean();
}

function create(data) {
    return new Cube(data).save();
}

function edit(id, data) {
    return Cube.findByIdAndUpdate(id, data, {new: true});
}

function deleteProduct(id) {
    return Cube.findByIdAndDelete(id);
}

async function attachAccessory(productId, accessoryId) {
    let product = await Cube.findById(productId);
    let accessory = await Accessory.findById(accessoryId);
    product.accessories.push(accessory);
    return product.save();
}

function getOneWithAccessories(id) {
    return Cube.findById(id).populate('accessories').lean();
}

module.exports = {
    getAll,
    getOne,
    create,
    edit,
    deleteProduct,
    attachAccessory,
    getOneWithAccessories
}