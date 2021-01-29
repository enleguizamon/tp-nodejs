const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const UserService = require("./services/UserService");
const UserInstance = new UserService();
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(
    {
      usernameField: "name",
      passwordField: "password",
    },
    async (username, password, cb) => {
      try {
        const userData = await UserInstance.getByName(username);
        if (!userData) {
          return cb(null, false);
        }

        const compare = await bcrypt.compare(password, userData.password);
        if (!compare) {
          return cb(null, false);
        }
        return cb(null, userData);
      } catch (err) {
        console.log(err);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.name);
});

passport.deserializeUser(async (name, cb) => {
  const data = await UserInstance.getByName(name);

  cb(null, data);
});
