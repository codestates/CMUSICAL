const { items } = require('../../models');

module.exports = {
  get: async (req, res) => {
    const musical = await items.findOne({
      where: { id: req.query.id },
      raw: true,
    });
    res.status(200).send({ items: musical });
  },
};
