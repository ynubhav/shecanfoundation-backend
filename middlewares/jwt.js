import jwt from "jsonwebtoken";

export default async function jwtmiddleware(req, res, next) {
  const check = req.headers.authorization;
  if (check && check.startsWith("Bearer ")) {
    try {
      const auth = req.headers.authorization;
      const payload = auth.split(" ")[1];
      const verify = jwt.verify(payload, process.env.JWT_SECRET);
      req._id = verify._id;
      next();
    } catch (error) {
      res.status(403).json({ message: " invalid token1" });
    }
  } else {
    if (check) res.status(401).json({ message: "invalid token2" });
    else res.status(402).json({ message: "invalid token3" });
  }
}

//payload is the object id of user
// to check and return the id in req
