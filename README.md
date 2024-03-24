## TESTE PRÁTICO - MoradaApp
### Objetivo principal
Desevolver um CRUD básico de usuários com um processo simples de autenticação utilizando as tecnologias citadas na vaga:
- Postgres
- NestJs
- Typescript
- TypeOrm

### Cronograma
- Período de entrega do teste: 23/03 às 16:00 até 6/04 às 16:00
- Disponibilidade de agenda para apresentação final: 29/03 até 13/04

### Requisitos obrigatórios
| ID | Descrição |
| ----- |:-------:|
| 001 | O sistema deve seguir o contrato elaborado em swagger/openapi.json, para ler o seu conteúdo basta entrar na pasta /swagger, instalar as dependências e executar o start:docs presente no package.json ou apenas copie o conteúdo do openapi e jogue no editor oficial do [swagger](https://editor.swagger.io/) |
| 002 | O candidato obrigatoriamente deve sugerir e aplicar no mínimo uma alteração no contrato com a intenção de corrigir determinadas vulnerabilidades. Este requisito não deve ser considerado no diferencial de número 4 |
| 003 | O sistema deve seguir o ERD elaborado em database.dbml e disponível no [dbdocs](https://dbdocs.io/N%C3%ADcolas%20Cleiton/MoradaAppTest) |
| 004 | O sistema deve conter no mínimo testes unitários |
| 005 | O candidato deve, de maneira obrigatória, implementar o algoritmo de criptografia bcrypt nos pontos em que o mesmo achar critíco |

Após a conclusão do teste, o candidato deve renomear o arquivo template.md para README.md e preencher o seu conteúdo.

### Diferenciais (NÃO É OBRIGATÓRIO)
Caso o candidato deseja se destacar no processo seletivo, recomenda-se realizar algumas das seguintes implementações, ordenadas pela relevância:
1. **Docker**: é preferivel que o candidato opte por utilizar o docker e o docker compose para facilitar a execução em diferentes ambientes;
2. **Organização**: quanto mais o fluxo de trabalho que o dev usar for organizado, mais ele estará próximo de sua admissão, ou seja, implementações como o eslint, prettier, husky e outras ferramentas são extremamente bem vistas;
3. **Sistema em português**: sistemas com responses totalmente em português são muito bem aceitos;
4. **Refatoração de contrato**: além das sugestões de possíveis alterações que são obrigatorias, o candidato pode refatorar o contrato elaborado da API e armazenar em /swagger/openapi-new.json, sugerindo novos fluxos para serem implementados tanto no processo de autenticação, quanto no próprio CRUD do usuário e indicar o tempo que levaria de implementação, dentro do novo README.md, caso esse novo contrato fosse admitido e autorizado a sua devida implementação;
5. **Refatoração do ERD**: se no processo de refatoração do contrato, o candidato sentir a necessidade de alterar algum conteúdo do ERD, o mesmo deve realizar as alterações usando a linguagem DBML, copiando o arquivo /database.dbml para /database-new.dbml.

ATENÇÃO: estas implementações não são obrigatórias, servindo apenas como um guia para o candidato que deseja se destacar.
