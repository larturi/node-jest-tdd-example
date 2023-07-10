const { externalApiUrl } = require( '../constants' );
const postHandlers = require('./index');

describe('POSTS', () => {
   describe('POST', () => {
      it('it should create a post', async () => {
         const mockPost = {
            userId: 1,
            title: 'Titulo del post',
            body: 'Body del post'
         };

         const mockUsers = [
            { id: 1 },
            { id: 2 },
         ]

         const req = {
            body: mockPost,
         };

         const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
         };

         const axios = {
            get: jest.fn().mockResolvedValue({ data: mockUsers }),
            post: jest.fn().mockResolvedValue({data: {id: 1001}}),
         };

         await postHandlers({axios}).post(req, res);

         expect(res.status.mock.calls).toEqual([[201]]);
         expect(res.send.mock.calls).toEqual([[{id: 1001}]]);
         expect(axios.get.mock.calls).toEqual([
            [`${externalApiUrl}/users`]
         ]);
         expect(axios.post.mock.calls).toEqual([
            [`${externalApiUrl}/posts`, mockPost]
         ]);
      });

      it('it should not create if userid is not exist', async () => {
         const mockPost = {
            userId: 3,
            title: 'Titulo del post',
            body: 'Body del post'
         };

         const mockUsers = [
            { id: 1 },
            { id: 2 },
         ]

         const req = {
            body: mockPost,
         };

         const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            sendStatus: jest.fn()
         };

         const axios = {
            get: jest.fn().mockResolvedValue({ data: mockUsers }),
            post: jest.fn().mockResolvedValue({data: {id: 1001}}),
         };

         await postHandlers({axios}).post(req, res);

         expect(axios.post.mock.calls).toEqual([]);
         expect(res.sendStatus.mock.calls).toEqual([
            [400]
         ]);
      });
   });
});
