'use strict';

/**
 * O middleware 'auth' é responsável por verificar a autenticidade
 * (login) do usuário que está fazendo a requisição. O middleware
 * faz a verificação baseado nos dados do cookie e o registro do
 * usuário (caso encontrado) é armazenado na requisição com o
 * nome de 'usuarioAtual'.
 */
module.exports = function authMiddleware(req, res, next) {
};
