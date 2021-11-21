const express = require('express')
const request = require('request');

const app = express();
const port = 3000;
const databasePort = 3004;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.listen(port,() => {
    console.log(`Servidor rodando na porta ${port}`);
});

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/bairros', (req, res) => {
    res.render('bairros')
})

app.get('/cadastro', (req, res) => {
    res.render('cadastro')
})

app.get('/lista_produtos', (req, res) => {
    let url = `http://localhost:${databasePort}/produtos`;
    request(url, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        res.render('produtos', {produtos:body})
    });    
})