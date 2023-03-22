# ReminderSystem - Decisões de desenvolvimento

O projeto foi gerado usando [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

Para armazenamento dos lembretes foi criado um json-server para simular o back-end/API

Optei por uma aplicação WEB, e por uso do Json Server para gerar uma API para consumi-lá

## Requisitos para Executar o projeto
Ter instalado o Angular e o Json-Server
Instalar as dependências das bibliotecas do Angular
Pacotes Instalados:
- Angular Material
- Angular animations

## Development server Angular e Json-Server

Para testar a aplicação execute `ng serve`. E vá para `http://localhost:4200/`.

Para executar o Json-Server para poder salvar e excluir lembretes, execute `json-server --watch db.json`

## Requisistos Atendidos
- Implementação do formulário para criação do lembrete
- Implementação da Listagem dos lembretes (em ordem cronológica), para cada data a um card com os lembretes para data
- Exclusão de Lembretes
- Uso do GitHub para hospedagem da aplicação
- Consumo de API pelo metodos e status HTTP

## Observações de desenvolvimento
A ideia inicial era poder além de criar e excluir poder atualizar os lembretes, a rota no service foi criada, porém por falta de experiência com o Json-Server o lembrete que era atualizado não era encontrado no server, apesar de existir.

Por questão de tempo e falta de experiência prévia não foi implementado os testes unitários, realizei a pesquisa para os testes, e tinha optado usar a Ferramenta Jasmine, mas pra implementar precisaria de um prazo maior.