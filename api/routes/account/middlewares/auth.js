const {verify} = require('jsonwebtoken');

module.exports = {
    authMiddleware: async function (
        req,
        res,
        next
      ) {
        const { authorization } = req.headers;
      
        if (!authorization) {
          return res.status(404).json({ error: "Erro: Nescessário realizar o login para acessar a página, Token de autenticação não foi encontrado." });
        }
      
        const [, token] = authorization.split(" ");
      
        try {
          const decoded = verify(token, process.env.AUTH_SECRET_JWT);
          const { id } = decoded;
      
          req.loggedUserId = id;
          next();
        } catch (error) {
          return res.status(401).json({ error: "Token invalid" });
        }
      }
}