import testData from "../testData";

const getProducts = (req, res) => {
    return res.status(200).json(testData);
}

export { getProducts };
