const { isVerify } = require('../tokenfunction');

module.exports = {
  auth: (req, res) => {
    if (!req.cookies.token) {
      return res.status(401).send({ message: 'not found token' });
    }
    const token = req.cookies.token;
    try {
      const verifyToken = isVerify(token);
      if (!verifyToken) {
        return res.status(406).send({ message: 'invalid token' });
      }
      return res.status(200).send({ message: 'success' });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: 'server error' });
    }
  },
};
