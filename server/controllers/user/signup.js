const { users } = require('../../models');

module.exports = {
  post: async (req, res) => {
    // console.log(users);
    const { username, password, nickname, email } = req.body;
    if (username && password && nickname && email) {
      await users.create({ username, password, nickname, email });
      res.status(200).send({ message: 'success' });
    } else {
      res.status(400).send({ message: 'invalid information' });
    }
  },
};
