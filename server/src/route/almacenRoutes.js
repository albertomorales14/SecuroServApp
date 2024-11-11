const { Router } = require('express');
const router = Router();

const { getAlmacenesByUserId } = require('../controller/almacenController');

router.route('/User/:id').get(getAlmacenesByUserId);

module.exports = router;