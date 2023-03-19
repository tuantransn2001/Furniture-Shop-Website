const checkExist = (Model) => {
  return async (req, res, next) => {
    const { id } = req.params;

    const foundedItem = Model.findOne({
      where: { id },
    });

    if (foundedItem) {
      return next();
    }

    res
      .status(404)
      .send(
        `We have been checked item with id: ${id} - There is no item found!`
      );
  };
};

module.exports = { checkExist };
