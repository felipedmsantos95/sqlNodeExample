Para rodar o app pela primeira vez:

1 - Acessar o MySql pelo terminal:
    
    mysql -u root -p

2 - Entrar com a senha root (o padrão é a senha em branco)
3 - Digitar o comando para criar o DB que vai ser usado no app:

    CREATE DATABASE dragonfly;

4 - Criar o usuário que terá acesso exclusivo ao banco recém criado:

    GRANT ALL PRIVILEGES ON dragonfly.*
    TO dragonfly_adm@"localhost"
    IDENTIFIED BY 'icts123' WITH GRANT OPTION;

5 - Feito isso, já poderá instalar as dependencias do app na pasta no diretório em que ele foi colocado:

    npm install

6 - Agora se pode rodar o app:

    npm start

    
