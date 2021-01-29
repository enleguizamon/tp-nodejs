function checkAuthAndAdmin(req, res, next) {
  const { user } = req;
  
  if (user) {
    if (user.isAdmin) {
      next();
    } else {
      return res.status(403).send("debes ser admin para realizar esta acción");
    }
  } else {
    return res.status(401).send("debes loguearte para realizar esta acción")
  }
}

module.exports = checkAuthAndAdmin;