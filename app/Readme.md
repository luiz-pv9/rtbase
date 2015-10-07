Diretório /app
==============

O diretório /app contém 4 subdiretórios, sendo eles:

* assets - Todos os arquivos de estilo e javascript do sistema.

* data - Modelos dos dados que são persistidos em banco de dados.
        Esse diretório possui modelos para ambos MongoDB e MySQL.

* events - Handlers de todos os eventos da aplicação. Um evento
        pode se originar de um route, modelo, job, etc.

* jobs - Processamento em plano de fundo dos jobs ativos
        no sistema. Os jobs são buscados de uma fila no Redis.

* policies - Lógica de autorização/política de acesso do sistema.

* services - Serviços que suportam os routes do sistema. Os
        serviços são funcionalidades encapsuladas em módulos
        como, por exemplo, autenticação, autorização, 
        eventos, etc.

* routes - Todos as rotas do sistema e implementação.
        Os routes são o ponto de entrada das requisições dos
        clientes. Os routes utilizam serviços e modelos para
        processar alguma lógica e respondem com uma view
        (ou JSON) para o clinete.

* views - Views que os routes respondem para o cliente. As views
        devem mapear de 1 - 1 para routes, e se for necessário
        reutilizar código um widget deve ser criado.

* widgets - Componentes reutilizáveis que as views usam.
        Um widget possui um arquivo template e arquivos JS e CSS
        opcionais.
