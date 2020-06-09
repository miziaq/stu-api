const removeCouriers = require('../../src/routes/remove-couriers');
const {requestNoData, reqWithData} = require('../fixtures/req-res')

describe('removeCouriers', () => {
  const res = {};
  
  it("returns error for empty req body", () => {
    expect(() => {
      removeCouriers(requestNoData, res);
    }).toThrowError('missing required argument: id');
  });
  
  it('deletes the requested courier', () => {
    res.send = jest.fn().mockReturnValue('OK');
    expect(removeCouriers(reqWithData, res)).toBe('OK');
  });
});
