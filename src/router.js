const express = require('express');
const router = express.Router();

const healthCheck = require('./routes/health');
const addCouriers = require('./routes/add-couriers');
const lookupCouriers = require('./routes/lookup-couriers');
const updateCouriers = require('./routes/update-couriers');
const removeCouriers = require('./routes/remove-couriers');

router.get('/health', healthCheck);
router.post('/couriers/add', addCouriers);
router.get('/couriers/lookup', lookupCouriers);
router.put('/couriers', updateCouriers);
router.delete('/couriers/remove', removeCouriers);

module.exports = router;
