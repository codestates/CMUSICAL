const { isVerify } = require('../../tokenfunction');
const { users } = require('../../../models');
module.exports = {
  delete: async (req, res) => {
    if (!req.cookies.token) {
      res.status(401).send({ message: 'not found token' });
    } else {
      const token = req.cookies.token;
      try {
        const userInfo = isVerify(token);
        if (userInfo) {
          const { id } = userInfo;
          await users.destroy({ where: { id } });

          res.clearCookie('token');
          res.status(200).send({ message: 'success' });
        } else {
          res.status(406).send({ message: 'invalid token' });
        }
      } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'server error' });
      }
    }
  },
};
