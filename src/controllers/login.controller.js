const passport = require("passport");
const jwt = require("jsonwebtoken");
require("../middlewares/passport");

module.exports = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) {
        // console.log(err);
        throw new Error(err);
      }
      if (!user) {
        // console.log("User couldn't be found for authentication.");
        throw new Error(info.message);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) {
          console.log("User couldn't be logged in.");
          throw new Error(error);
        }

        const body = { _id: user._id, email: user.email };

        let role = "student";

        if (user.email === "placements@iiitl.ac.in") {
          role = "tpo";
        }

        const token = jwt.sign({ user: body, role }, process.env.SECRET, {
          expiresIn: "1h",
        });

        return res.json({ token });
      });
    } catch (error) {
      error.status = 401;
      return next(error);
    }
  })(req, res, next);
};
