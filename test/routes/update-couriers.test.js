const updateCouriers = require('../../src/routes/update-couriers');
const {courier, requestNoData, reqWithData} = require('../fixtures/req-res')

describe('updateCouriers', () => {
  const res = {};
  
  it("returns error for empty req body", () => {
    expect(() => {
      updateCouriers(requestNoData, res);
    }).toThrowError('missing one or more required arguments: id or capacity_required');
  });
  
  it('responds with updated data', () => {
    res.json = jest.fn().mockReturnValue(courier);
    expect(updateCouriers(reqWithData, res)).toBe(courier);
  });
});
