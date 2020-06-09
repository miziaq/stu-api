/* GET lookup couriers  */

const lookupCouriers = (req, res) => {
    const couriers = req.app.locals.db.getCollection('couriers');
    const capacityRequired = req.body.capacity_required;

    if( !capacityRequired ) {
      throw new Error('missing required argument: capacity_required')
    }

    const result = couriers
      .chain()
      .find({available_capacity:{$gte: capacityRequired}})
      .simplesort('available_capacity')
      .data()
      .reverse();

    return res.json(result);
};

module.exports = lookupCouriers;
