
//Modules utilises
const express = require('express')
const app = express()
const compression = require('compression')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mysql = require('mysql')
const http = require('http').createServer(app)
const path = require('path')
var expressValidator = require('express-validator');

const port = 4000



const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nourriture'
  });

    //APPLICATION
    db.connect((err) => {
        if (!err) {
           
            app.set('views', './views').set('view engine', 'ejs')
            
            app.use(compression())
                .use('/public', express.static('public'))
                .use(morgan('dev'))
                .use(bodyParser.json())
                .use(bodyParser.urlencoded({ extended : false }))
                  
                .get('/', function(req, res)
                {
                    res.render('index');
                })
                .get('/inscription', function(req, res)
                {
                    res.render('inscription', {result: null});
                })
                .get('/connexion', function(req, res)
                {
                    res.render('connexion');
                })
                .get('/marche', function(req, res)
                {
                    res.render('marche');
                })
                .get('/recette', function(req, res)
                {
                    res.render('recette');
                })
                .post('/inscription', (req, res) => {
                    console.log(req.body)
                    infos = req.body
                    let values = [infos.nom, infos.prenom, infos.numero, infos.mdp]
                    if (req.body.nom !='' && req.body.prenom !='' && req.body.numero !='' && req.body.mdp !='')
                    db.query('INSERT INTO users (nom, prenom, numero, mdp) VALUES (?, ?, ?, ?)', values, (err, results) => {
                        if (!err)
                            res.render('inscription', {result: 'Votre inscription a bien ete prise en compte'})
                        else
                            console.log(err.message)
                    })

                })
                .use(function(req, res) {
                    res.status(404).end('Error 404');
                });

        
        http.listen(port, () => console.log('started'));
} else {
    console.log(err.message)
}

});

    
    
