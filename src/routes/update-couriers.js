/* PUT update couriers  */
const updateCouriers = (req, res, next) => {
  const courier = req.body.courier;

  res.json(courier);
};

module.exports = updateCouriers;
