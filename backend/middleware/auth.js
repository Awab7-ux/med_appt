import jwt from 'jsonwebtoken';

export default function requireAuth(request, response, next) {
  const authorization = request.get('authorization') || '';
  const [scheme, token] = authorization.split(' ');
  if (scheme !== 'Bearer' || !token) return response.status(401).json({ message: 'Authentication required.' });

  try {
    request.userId = jwt.verify(token, process.env.JWT_SECRET).userId;
    return next();
  } catch {
    return response.status(401).json({ message: 'Your session is invalid or has expired.' });
  }
}