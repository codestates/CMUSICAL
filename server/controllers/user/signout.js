module.exports = {
  post: (req, res) => {
    res.clearCookie('token');
    res.status(200).send({ message: 'success' });
  },
};
