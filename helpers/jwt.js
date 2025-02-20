const { expressjwt: expressJwt } = require('express-jwt')


function authJwt() {
  const secret = process.env.SECRET_KEY
  return expressJwt({
    secret,
    algorithms: ['HS256']
  }).unless({
    path: [
      {
        url: /\/api\/products(.*)/, method: ['GET', 'OPTIONS'] // here we are authorizing only GET method for /products without need of token.
      },
      {
        url: /\/api\/categories(.*)/, method: ['GET', 'OPTIONS'] // here we are authorizing only GET method for /products without need of token.
      },
      '/api/users/login',
    ]
  })
}


module.exports = authJwt
