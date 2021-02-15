module.exports = (req, res, next) => {
  if (req.url === '/logIn') {
    res.send({
      firstName: 'Alex',
      lastName: 'Huts',
      email: 'ree-45@retop.uo',
    });
  } else {
    next();
  }
}