export function isAuthenticated(req, res, next) {
    if (req.session.user && req.session.user.status === "ready") {
      return next();
    }
  }
  