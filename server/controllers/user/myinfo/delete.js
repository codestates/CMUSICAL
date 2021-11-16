const { isVerify } = require('../../tokenfunction');
const { users } = require('../../../models');
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
      await users.destroy({ where: { id } });

      res.clearCookie('token');
      return res.status(200).send({ message: 'success' });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: 'server error' });
    }
  },
};
