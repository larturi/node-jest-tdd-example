const { externalApiUrl } = require( "../constants" );

module.exports = ({axios}) => ({
   post: async (req, res) => {
      const { data: users } = await axios.get(`${externalApiUrl}/users`);

      const found = users.find(x => x.id === req.body.userId);

      if (found) {
         const { data } = await axios.post(`${externalApiUrl}/posts`, req.body);
         return res.status(201).send(data);
      }

      res.sendStatus(400);
   }
})