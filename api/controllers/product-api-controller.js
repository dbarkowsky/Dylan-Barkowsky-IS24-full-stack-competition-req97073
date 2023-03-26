import productSchema from "../models/product-schema.js";
import { testData } from "../testData.js";

let products = [...testData];

const getProducts = (req, res) => {
    return res.status(200).json(products);
}

const deleteProduct = (req, res) => {
    try {
        let { productId } = req.params;
        let location = products.findIndex((product) => product.productId == parseInt(productId));

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

        // Delete original
        let { productId } = req.params;
        let location = products.findIndex((product) => product.productId == parseInt(productId));
        if (location >= 0) {
            products.splice(location, 1);
        } else {
            return res.status(404).send('Product not found.');
        }

        // Add new
        product = { productId: productId, ...product };
        products.push(product);
        return res.status(200).json(product);
    } catch (e) {
        return res.status(400)
            .send('Bad Request. The message in the body of the \
    Request is either missing or malformed.');
    }
}

const postProduct = async (req, res) => {
    try {
        let product = await productSchema.validate(req.body);
        product = { productId: products.length, ...product };
        products.push(product);
        return res.status(201).json(product);
    } catch (e) {
        return res.status(400)
            .send('Bad Request. The message in the body of the \
    Request is either missing or malformed.');
    }
}

export { getProducts, deleteProduct, postProduct, putProduct };
