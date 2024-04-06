## TESTE PRÁTICO - MoradaApp

## Como inicializar

O arquivo docker-compose.yml na raiz do projeto se encarrega de toda inicialização do projeto:

git clone https://github.com/micael-ortega/Desafio-MoradaApp

cd Desafio-MoradaApp

docker compose up -d

## Requisitos obrigatórios

Ao concluir o requisito, apenas substitua o status final para 'Ok' ao invés de 'Preterido':

| ID  |                                                                                                                                                  Descrição                                                                                                                                                  | Status final |
| --- | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------: |
| 001 | O sistema deve seguir o contrato elaborado em swagger/openapi.json, para ler o seu conteúdo basta entrar na pasta /swagger, instalar as dependências e executar o start:docs presente no package.json ou apenas copie o conteúdo do openapi e jogue no editor oficial do[swagger](https://editor.swagger.io/) |      ok      |
| 002 |                                          O candidato obrigatoriamente deve sugerir e aplicar no mínimo uma alteração no contrato com a intenção de corrigir determinadas vulnerabilidades. Este requisito não deve ser considerado no diferencial de número 4                                          |      ok      |
| 003 |                                                                                     O sistema deve seguir o ERD elaborado em database.dbml e disponível no[dbdocs](https://dbdocs.io/N%C3%ADcolas%20Cleiton/MoradaAppTest)                                                                                     |      ok      |
| 004 |                                                                                                                              O sistema deve conter no mínimo testes unitários                                                                                                                              |  Preterido  |
| 005 |                                                                                                                bcrypt implementado para criptografar senha criada pelo usuário, hash salvo no                                                                                                                |      ok      |

## Diferenciais adotados

Caso algum diferencial tenha sido adotado, substitua o enunciado pela resposta, caso contrário, apenas substitua para 'Preterido'. Não se preocupe caso alguns deles não tenha sido concluído:

| Relevância (peso) |                Nome                |                                                Descrição                                                |
| ------------------ | :---------------------------------: | :--------------------------------------------------------------------------------------------------------: |
| 1                  |  **Docker e Docker Compose**  | Imagem Docker criada para API e docker-compose.yml para execução do serviço junto ao container Postgres |
| 2                  |       **Organização**       |                                                  Prettier                                                  |
| 3                  |   **Sistema em português**   |                                                    Sim                                                    |
| 4                  | **Refatoração de contrato** |                                                 Preterido                                                 |
| 5                  |   **Refatoração do ERD**   |                                                 Preterido                                                 |
