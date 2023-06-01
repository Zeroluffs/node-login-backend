const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  //   const token = req.header("authorization");
  //   if (typeof token !== "undefined") {
  //     const bearerToken = token.split(" ")[1];
  //     req.token = bearerToken;
  //     next();
  //   } else {
  //     res.status(500).send({ error: "Invalid token" });
  //   }

  if (!req.headers.authorization) {
    console.log("jere");
    return res.status(401).json({ error: "Not Authorized" });
  }

  // Bearer <token>>
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token is valid
    const { user } = jwt.verify(
      token,
      "8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb"
    );
    next();
  } catch (error) {
    return res.status(401).json({ error: "Not Authorized" });
  }
};
module.exports = verifyToken;
