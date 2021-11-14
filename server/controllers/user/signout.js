module.exports = {
  post: (req, res) => {
    try {
      res.clearCookie('token');
      res.status(200).send({ message: 'success' });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'server error' });
    }
  },
};
