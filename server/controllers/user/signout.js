const { isVerify } = require('../tokenfunction');

module.exports = {
  post: (req, res) => {
    // 토큰이 담겨있지 않은 경우
    if (!req.cookies.token) {
      return res.status(401).send({ message: 'not found token' });
    }
    const token = req.cookies.token;

    try {
      const verifyToken = isVerify(token);
      // 유효한 토큰이 아닌 경우
      if (!verifyToken) {
        return res.status(406).send({ message: 'invalid token' });
      }

      res.clearCookie('token');
      return res.status(200).send({ message: 'success' });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: 'server error' });
    }
  },
};
