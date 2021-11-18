const { isVerify } = require('../../tokenfunction');
const { users } = require('../../../models');
const bcrypt = require('bcryptjs');

module.exports = {
  delete: async (req, res) => {
    if (!req.cookies.token) {
      return res.status(401).send({ message: 'not found token' });
    }
    const token = req.cookies.token;
    try {
      const userInfo = isVerify(token);
      if (!userInfo) {
        return res.status(406).send({ message: 'invalid token' });
      }
      const { id } = userInfo;

      if (!req.body.oldPassword) {
        return res.status(400).send({ message: 'empty oldPassword' });
      }
      const { oldPassword } = req.body;

      const validUser = await users.findOne({ where: id, raw: true });

      if (!validUser) {
        return res.status(406).send({ message: 'invalid user' });
      }
      if (!bcrypt.compareSync(oldPassword, validUser.password)) {
        return res.status(400).send({ message: 'invalid password' });
      }
      await users.destroy({ where: { id } });

      res.clearCookie('token');
      return res.status(200).send({ message: 'success' });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: 'server error' });
    }
  },
};
