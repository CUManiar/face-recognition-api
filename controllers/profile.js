const handleProfile = (req, res, db) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id })
    .then(user => {
      return user.length > 0
        ? res.json(user[0])
        : res.status(400).json("Not found!");
    })
    .catch(err => res.status(404).json("Error getting profile! "));
};

module.exports = {
  handleProfile
};
