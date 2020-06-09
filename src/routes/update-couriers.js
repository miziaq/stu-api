/* PUT update couriers  */

const updateCouriers = (req, res) => {
  const couriers = req.app.locals.db.getCollection('couriers');
  const courierId = req.body.id;
  const reqCapacity = req.body.capacity_required;
  
  if(! courierId || !reqCapacity ) {
    throw new Error('missing one or more required arguments: id or capacity_required');
  }

  couriers.chain().find({ id: courierId }).update((el) => {
      el.available_capacity = el.available_capacity - reqCapacity
  });

  return res.json(couriers.find({ id: courierId }));
};

module.exports = updateCouriers;
