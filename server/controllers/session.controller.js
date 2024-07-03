// controllers/session.controller.js
export const userSession = async (req, res) => {
    if (req.session.user) {
      return res.status(200).json({ firstname: req.session.user.firstname });
    } else {
      return res.status(401).json({ error: "Vous n'êtes pas connecté" });
    }
  };
  