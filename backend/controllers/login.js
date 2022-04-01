const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

const login = async (req, res) => {
  const { token } = req.body;

  const verify = async () => {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    // If request specified a G Suite domain:
    // const domain = payload['hd'];

    return { payload, userid };
  };
  verify()
    .then((result) => {
      res.cookie("session-token", token, { httpOnly: false });
      console.log(res.cookie);
      res.status(200).json("success");
    })
    .catch(console.error);
};

module.exports = login;
