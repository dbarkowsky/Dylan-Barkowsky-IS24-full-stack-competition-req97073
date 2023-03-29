import productSchema from '../models/product-schema.js';
import { testData } from '../testData.js';

let products = [...testData];
let highestID = products.reduce((acc, cur) => cur.productId > acc.productId ? cur : acc).productId;

const getProducts = (req, res) => {
    if (products) {
        return res.status(200).json(products);
    } else {
        return res.status(404).send('Products could not be found.');
    }
}

const getProduct = (req, res) => {
    // Get original
    let { productId } = req.params;
    let location = products.findIndex((product) => product.productId == parseInt(productId));
    const original = products.at(location);

    // If it exists
    if (location !== -1) {
        return res.status(200).json(original);
    } else {
        return res.status(404).send('Product not found.');
    }
}

const deleteProduct = (req, res) => {
    try {
        // Find product
        let { productId } = req.params;
        let location = products.findIndex((product) => product.productId == parseInt(productId));

        // Was product found? If not, 404
        if (location >= 0) {
            products.splice(location, 1);
            return res.status(204).send(`Product ${productId} deleted.`);
        } else {
            return res.status(404).send('Product not found.');
        }
    } catch (e) {
        return res.status(400)
            .send('Bad Request. The message in the body of the \
    Request is either missing or malformed.');
    }
}

const putProduct = async (req, res) => {
    try {
        // Does the body match the schema?
        let product = await productSchema.validate(req.body);

        // Get original
        let { productId } = req.params;
        let location = products.findIndex((product) => product.productId == parseInt(productId));
        const original = products.at(location);

        // Does original exist?
        if (location === -1) {
            return res.status(404).send('Product not found.');
        }

        // Check that date was not altered in some way.
        if (product.startDate != original.startDate) {
            return res.status(403).send('Start date may not be altered.');
        }

        // Update object
        products[location] = {
            productId,
            ...product
        }

        return res.status(200).json(product);
    } catch (e) {
        return res.status(400)
            .send('Bad Request. The message in the body of the \
    Request is either missing or malformed.');
    }
}

const postProduct = async (req, res) => {
    try {
        // Validate incoming product
        let product = await productSchema.validate(req.body);
        // Get new id and add to data
        product = { productId: ++highestID, ...product };
        products.push(product);

        return res.status(201).json(product);
    } catch (e) {
        return res.status(400)
            .send('Bad Request. The message in the body of the \
    Request is either missing or malformed.');
    }
}

export { getProducts, getProduct, deleteProduct, postProduct, putProduct };
