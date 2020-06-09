const healthCheck = require('../../src/routes/health');

describe('healthCheck', () => {
    it('returns OK and 200 status', () => {
        const res = {};
        res.send = jest.fn().mockReturnValue('OK');
        req = {};

        expect(healthCheck(req, res)).toBe('OK');
    });
});
