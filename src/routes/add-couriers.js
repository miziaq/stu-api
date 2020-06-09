/* POST add couriers  */

const addCouriers = (req, res, next) => {
  const couriers = req.app.locals.db.getCollection('couriers');
  const newCourierCapacity = req.body.max_capacity;

  if(! newCourierCapacity ) {
    throw new Error('missing required argument: max_capacity')
  }

  couriers.on('insert', (input) => {
    input.id = input.$loki;
    input.available_capacity = newCourierCapacity;
  });

  const newCourier = couriers.insert({max_capacity: newCourierCapacity});

  return res.json(newCourier);
};

module.exports = addCouriers;
