module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_message", "You need to log in to complete that action");
    res.redirect("/users/login");
  },
};
