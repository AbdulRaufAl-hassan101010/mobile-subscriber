const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

const auth = (req, res, next) => {
  const token = req.cookies["session-token"];

  const verify = async () => {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const userid = payload["sub"];

    return { payload, userid };
  };

  verify()
    .then((result) => {
      res.cookie("session-token", token);
      req.user = result.payload;
      next();
    })
    .catch(() => {
      res.status(401).json({
        error: {
          message: "Please sign in",
        },
      });
    });
};

module.exports = auth;
