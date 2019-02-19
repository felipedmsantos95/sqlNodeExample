const fs = require('fs');

module.exports = {
    addPlayerPage: (req, res) => {
        res.render('add-usuario.ejs', {
           title: "Cadastrar Usuário",
           message: ''
        });
    },
    addPlayer: (req, res) => {

        let message = '';
        let nome = req.body.nome;
        let idade = req.body.idade;
        let endereco = req.body.endereco;
        let email = req.body.email;
        let telefone = req.body.telefone;       
        

        let usernameQuery = "SELECT * FROM `usuarios` WHERE email = '" + email + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Este email já foi cadastrado';
                res.render('add-usuario.ejs', {
                    message,
                    title: "Cadastrar Usuário"
                });
            } else {
                // check the filetype before uploading it
                
                let query = "INSERT INTO `usuarios` (nome, idade, endereco, email, telefone) VALUES ('" +
                nome + "', '" + idade + "', '" + endereco + "', '" + email + "', '" + telefone + "')";
                db.query(query, (err, result) => {
                    if (err) {
                       return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            }
        });
    },
    editPlayerPage: (req, res) => {
        let playerId = req.params.id;
        let query = "SELECT * FROM `usuarios` WHERE id = '" + playerId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-usuario.ejs', {
              title: "Edit  Player",
              usuario: result[0],
              message: ''
            });
        });
    },
    editPlayer: (req, res) => {
        let playerId = req.params.id;
        let nome = req.body.nome;
        let idade = req.body.idade;
        let endereco = req.body.endereco;
        let email = req.body.email;
        let telefone = req.body.telefone;

        let query = "UPDATE `usuarios` SET `nome` = '" + nome + "', `idade` = '" + idade + "', `endereco` = '" + endereco + "', `email` = '" + email + "', `telefone` = '" + telefone + "' WHERE `usuarios`.`id` = '" + playerId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deletePlayer: (req, res) => {
        let playerId = req.params.id;
        let deleteUserQuery = 'DELETE FROM usuarios WHERE id = "' + playerId + '"';

        db.query(deleteUserQuery, (err, result) => {
             if (err) {
                return res.status(500).send(err);
              }
             res.redirect('/');
        });

            

            
                
       
    }
};