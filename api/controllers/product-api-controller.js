import { testData } from "../testData.js";

let products = [...testData];

const getProducts = (req, res) => {
    return res.status(200).json(products);
}

const deleteProduct = (req, res) => {
    try {
        let { productId } = req.params;
        let location = products.findIndex((product) => product.productId == parseInt(productId));
        console.log(location)
        if (location >= 0) {
            products.splice(location, 1);
            return res.status(204).send(`Product ${productId} deleted.`);
        } else {
            return res.status(404).send('Product not found.');
        }
    } catch (e) {
        return res.sendStatus(500);
    }
}

export { getProducts, deleteProduct };
