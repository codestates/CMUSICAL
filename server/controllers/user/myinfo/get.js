const { isVerify } = require('../../tokenfunction');
module.exports = {
  get: (req, res) => {
    if (!req.headers.authorization) {
      res.status(401).send({ message: 'unauthorized' });
    } else {
      const token = req.headers.authorization.split(' ')[1];
      try {
        const userInfo = isVerify(token);
        const { nickname, email } = userInfo;
        res.status(200).send({ data: { nickname, email } });
      } catch (err) {
        res.status(200).send({ message: 'invalid token', data: null });
      }
    }
    console.log(token);
    res.send();
  },
};
