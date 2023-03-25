
// import { getProducts } from '../controllers/product-api-controller';
import express from 'express';

const testData = [{
    productId: 1,
    productName: "Cat Food",
    productOwnerName: "Felix",
    developers: [
        "NAME_1",
        "NAME_2",
        "NAME_3",
        "NAME_4",
        "NAME_5"
    ],
    scrumMasterName: "Garfield",
    startDate: "2018-12-10T13:49:51.141Z",
    methodology: "Agile"
},
{
    productId: 2,
    productName: "Dog Food",
    productOwnerName: "Rover",
    developers: [
        "NAME_1",
        "NAME_2",
        "NAME_3",
        "NAME_4",
        "NAME_5"
    ],
    scrumMasterName: "Lassie",
    startDate: "2019-12-10T13:49:51.141Z",
    methodology: "Waterfall"
}];

const router = express.Router();

router.route('/health')
    .get((req, res) => res.status(200).send('API is up and running!'));

router.route('/products')
    .get((req, res) => {
        return res.status(200).json(testData);
    });

export default router;
