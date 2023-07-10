const { isAuthenticated } = require('./auth');

describe('MIDDLEWARES', () => {
   describe('Auth', () => {
      it('Admin should have id = 1', async () => {
         const req = {
            header: jest.fn().mockReturnValue("1")
         };
         const res = {
            sendStatus: jest.fn()
         };
         const next = jest.fn();

         isAuthenticated(req, res, next);

         expect(req.header.mock.calls).toEqual([['user_id']]);
         expect(res.sendStatus.mock.calls).toEqual([]);
         expect(next.mock.calls).toEqual([[]]);
      });

      it('Should fail if user id is not 1', () => {
        const req = {
            header: jest.fn().mockReturnValue("2")
         };
         const res = {
            sendStatus: jest.fn()
         };
         const next = jest.fn();

         isAuthenticated(req, res, next);

         expect(req.header.mock.calls).toEqual([['user_id']]);
         expect(res.sendStatus.mock.calls).toEqual([[403]]);
         expect(next.mock.calls).toEqual([]);
      });
   });
});
