const lookupCouriers = require("../../src/routes/lookup-couriers");
const {result, requestNoData, reqWithData} = require('../fixtures/req-res');

describe("lookupCouriers", () => {
  const res = {};

  it("returns error for empty req body", () => {
    expect(() => {
      lookupCouriers(requestNoData, res);
    }).toThrowError("missing required argument: capacity_required");
  });

  it("returns results for defined capacity_required inside request body", () => {
    res.json = jest.fn().mockReturnValue(result);

    expect(lookupCouriers(reqWithData, res)).toBe(result);
  });
});
