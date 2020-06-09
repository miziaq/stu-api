const addCouriers = require('../../src/routes/add-couriers');
const {newCourier, requestNoData, reqWithData} = require('../fixtures/req-res')

describe('addCouriers', () => {
  const res = {};
  res.json = jest.fn();

  it('returns error for empty req body', () => {
    expect(() => {
      addCouriers(requestNoData, res);
    }).toThrowError('missing required argument: max_capacity');
  });

  it('returns newly added courier data', () => {
    expect(addCouriers(reqWithData, res)).toBe(newCourier);
  });
});
