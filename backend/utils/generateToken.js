import jwt from 'jsonwebtoken';

/**
 * Signs a JWT for the given admin id and sets it as an httpOnly cookie
 * on the response. Cookie is secure + sameSite=none in production to
 * support cross-site requests between Vercel (frontend) and Render (backend).
 */
const generateToken = (res, adminId) => {
  const token = jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie('token', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
  });

  return token;
};

export default generateToken;
