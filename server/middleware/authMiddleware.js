const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token not provided' });
  }

  const tokenWithoutBearer = token.replace('Bearer ', '');
  try {
    const [header, payload, signature] = tokenWithoutBearer.split('.');
    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'));
    req.user = decodedPayload;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = { verifyToken };
