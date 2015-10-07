'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');

module.exports = function(config, ready) {
  return new Promise(function(resolve, reject) {

    /**
     * Instância do express que vai conter todos os routes
     * da aplicação. Essa variável é passada para todos os controllers
     * para registrarem seus routes.
     */
    let app = express();

    /**
     * O body-parser do express é o middleware responsável por
     * decodificar o corpo da requisição. Os formatos suportados são
     * urlencoded (formulários tradicionais) e Json (requisições AJAX)
     */
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    /**
     * Jade é um linguagem de template que compila para HTML. A
     * sintaxe é bem simples e funciona muito bem com o express.
     */
    app.set('view engine', 'jade');

    /**
     * O route 'status' sempre deve retornar 'OK' para todos
     * os usuários. O objetivo é ser usado para verificar o estado
     * do servidor. No futuro, mais informações podem ser adicionadas aqui,
     * como horário que foi iniciado o processo e número de nós no cluster.
     */
    app.get('/status', function(req, res) {
      res.json({status: 'OK'});
    });

    /**
     * Os routes da aplicação devem ser inicializados antes do servidor
     * ser inicializado. O arquivo de boot deve especificar uma função
     * 'ready' que passa a instância do express para os routes em app/routes.
     */
    if('function' === typeof ready) { ready(app); }

    /**
     * Inicia o servidor na porta especificada no objeto de
     * configuração.
     */
    app.server = app.listen(config.port, function() {
      console.log("===================================");
      console.log("[HTTP] - Server listening on port: " + config.port);
      resolve(app);
    })
    .on('error', function(err) {
      reject(err);
    });
  });
};
