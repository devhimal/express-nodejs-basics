const { expressjwt: expressJwt } = require('express-jwt');

// async function isRevoked(req, payload, done) {
//   if (!payload.isAdmin) {
//     done(null, true); // Revoke token if the user is not an admin
//   }
//   done(); // Allow token if the user is an admin
// }


function authJwt() {
  const secret = process.env.SECRET_KEY;
  return expressJwt({
    secret,
    algorithms: ['HS256'],
    // isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/api\/products(.*)/, methods: ['GET', 'OPTIONS'] }, // ✅ "method" (not "methods")
      { url: /\/api\/categories(.*)/, methods: ['GET', 'OPTIONS'] }, // ✅ Fixed here too
      '/api/users/login', // ✅ Login route doesn't need a method specification
    ],
  });
}

module.exports = authJwt;
