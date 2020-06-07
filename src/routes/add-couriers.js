/* POST add couriers  */
const addCouriers = (req, res, next) => {
  const courier = req.body.courier;

  res.json(courier);
};

module.exports = addCouriers;
