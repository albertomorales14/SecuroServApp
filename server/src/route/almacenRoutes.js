const { Router } = require('express');
const router = Router();

const { getAlmacenesByUserId, updateAlmacen } = require('../controller/almacenController');

router.route('/User/:id').get(getAlmacenesByUserId);
router.route('/:id').put(updateAlmacen);

module.exports = router;