const handleRegister = (req, res, db, bcrypt) => {
  const crypticPassword = bcrypt.hashSync(req.body.password, 1);
  db.transaction(trx => {
    trx
      .insert({
        email: req.body.email,
        hash: crypticPassword
      })
      .into("login")
      .returning("email")
      .then(loginEmail => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name: req.body.name,
            joined: new Date()
          })
          .then(user => {
            return res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch(err => res.status(400).json("Unable to register!"));
};

module.exports = {
  handleRegister
};
