aloweb. v5rt
============

Projeto real-time experimental para versão 5.0 do aloweb. O objetivo do projeto é uma base de código genérica que facilite funcionalidades em tempo real com boa performance sem aumentar a complexidade de desenvolvimento e manutenção. 

Build
=====

Para gerar o build e testar a aplicação, basta rodar os seguintes comandos no diretório root (é necessário ter `docker` e `docker-compose` instalado):

+ `docker-compose build` - Faz download de todas as dependências e configura os containers.

+ `docker-compose up` - Inicia o sistema e todas as dependências. A aplicação vai estar disponível na porta 8080.