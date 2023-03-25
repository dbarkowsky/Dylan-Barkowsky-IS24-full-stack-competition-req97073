import express from 'express';

const router = express.Router();

router.route('/health')
    .get((req, res) => res.status(200).send('API is up and running!'));

export default router;
