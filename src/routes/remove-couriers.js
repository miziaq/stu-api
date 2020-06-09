/* DELETE remove couriers  */

const removeCouriers = (req, res) => {
  const couriers = req.app.locals.db.getCollection('couriers');
  const courierId = req.body.id;
  
  if(! courierId ) {
    throw new Error('missing required argument: id')
  }

  couriers.findAndRemove({ id: courierId });

  return res.send('OK');
};

module.exports = removeCouriers;
