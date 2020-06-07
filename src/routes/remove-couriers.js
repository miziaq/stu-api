/* DELETE remove couriers  */
const removeCouriers = (req, res, next) => {
  const courierId = req.body.id;

  res.send(courierId);
};

module.exports = removeCouriers;
